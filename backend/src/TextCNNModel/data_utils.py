import jieba
import torchtext
import torch

# 停用词文件路径
stop_path = '.\\resource\\stopwords.txt'


# 获取停用词列表
def stopwordslist(filepath):
    stopwords = [line.strip() for line in open(filepath, 'rb').readlines()]
    return stopwords


stopwords = stopwordslist(stop_path)  # 停用词列表


# 分词处理
def cut(sentence):
    return [token for token in jieba.lcut(sentence) if token not in stopwords]


# 声明一个Field对象，对象里面填的就是需要对文本进行哪些操作，比如这里lower=True英文大写转小写
# tokenize=cut对于文本分词采用之前定义好的cut函数，sequence=True表示输入的是一个sequence类型的数据
TEXT = torchtext.data.Field(sequential=True, lower=True, tokenize=cut)

# 声明一个标签的LabelField对象，sequential=False表示标签不是sequence，dtype=torch.int64标签转化成整形
LABEL = torchtext.data.LabelField(sequential=False, dtype=torch.int64)

# 这里主要是告诉torchtext需要处理哪些数据，这些数据存放在哪里，TabularDataset是一个处理scv/tsv的常用类
# Defines a Dataset of columns stored in CSV, TSV, or JSON format.
train_dataset, dev_dataset, test_dataset = torchtext.data.TabularDataset.splits(
    path='.\\resource\\dataset\\',  # 文件存放路径
    format='csv',  # 文件格式
    skip_header=False,  # 是否跳过表头，我这里数据集中没有表头，所以不跳过
    train='train_data.csv',
    validation='dev_data.csv',
    test='test_data.csv',
    fields=[('label', LABEL), ('content', TEXT)]  # 定义数据对应的表头
)

pretrained_name = 'sgns.wiki.word'  # 预训练词向量文件名
pretrained_path = '.\\resource\\'
vectors = torchtext.vocab.Vectors(name=pretrained_name, cache=pretrained_path)

# 建立语料库
TEXT.build_vocab(train_dataset, dev_dataset, test_dataset,
                 vectors=vectors)
LABEL.build_vocab(train_dataset, dev_dataset, test_dataset)

# torchtext.data.BucketIterator.splits 使用BucketIterator生成迭代器的主要是因为BucketIterator能够将样本长度接近的句子尽量放在同一个batch
# 里面，这样假如这里我们每128个样本为一个batch，句子长度差距过大，就会给短句加入过多的无意义的<pad>，但是句子长度相近的在一个batch里面的话，就能够避免这个问题
train_iter, dev_iter, test_iter = torchtext.data.BucketIterator.splits(
    (train_dataset, dev_dataset, test_dataset),  # 需要生成迭代器的数据集
    batch_sizes=(64, 64, 64),  # 每个迭代器分别以多少样本为一个batch
    sort_key=lambda x: len(x.content)  # 按什么顺序来排列batch，这里是以句子的长度，就是上面说的把句子长度相近的放在同一个batch里面
)


# 将序列映射成向量
def seq_to_vec(sequence):
    vector = []
    words = cut(sequence)
    for word in words:
        vector.append(TEXT.vocab.stoi[word])
    return vector


if __name__ == '__main__':
    print(seq_to_vec("最近葡萄糖含量偏高"))

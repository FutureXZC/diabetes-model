import sys
import json
import jieba
import configure as config


def stopwords_list(filepath):
    """
    # 获取停用词列表
    :param filepath:
    :return:
    """
    stopwords = [line.strip() for line in open(filepath, 'rb').readlines()]
    return stopwords


def cut(sentence):
    """
    分词处理
    :param sentence:
    :return:
    """
    stopwords = stopwords_list(config.stop_path)  # 停用词列表
    return [token for token in jieba.lcut(sentence) if token not in stopwords]


def load_vocab(path):
    """
    加载语料库文件
    :param path: 语料库文件地址
    :return: 语料库字典
    """
    with open(path, encoding="utf-8") as f:
        vocab = json.load(f)
    return vocab


def seq_to_vec(sequence, path):
    """
    根据已有的语料库将序列映射成向量
    :param sequence:
    :param path: 语料库文件地址
    :return:
    """
    vector = []
    vocab = load_vocab(path)
    words = cut(sequence)
    for word in words:
        if word in vocab.keys():
            vector.append(vocab[word])
        else:
            vector.append(vocab["<unk>"])  # 该词未在语料库中出现
    #  保证转换后的向量维度不小于5
    if len(vector) < 5:
        for i in range(len(vector), 5):
            vector.append(vocab['<pad>'])
    return vector


if __name__ == '__main__':
    seq = "中年哈哈"
    print(seq_to_vec(seq, config.vocab_path))

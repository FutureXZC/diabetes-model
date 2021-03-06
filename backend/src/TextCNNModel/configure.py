from data_utils import TEXT, LABEL

class_num = len(LABEL.vocab)  # 类别数目
filter_size = [3, 4, 5]  # 卷积核种类数
filter_num = 16  # 卷积核数量
vocab_size = len(TEXT.vocab)  # 词表大小
embedding_dim = TEXT.vocab.vectors.size()[-1]  # 词向量维度
vectors = TEXT.vocab.vectors  # 词向量
dropout = 0.5
learning_rate = 0.001  # 学习率
epochs = 5  # 迭代次数
save_dir = './drive/My Drive/TextCNN/model'  # 模型保存路径
steps_show = 10  # 每10步查看一次训练集loss和mini batch里的准确率
steps_eval = 100  # 每100步测试一下验证集的准确率
early_stopping = 1000  # 若发现当前验证集的准确率在1000步训练之后不再提高 一直小于best_acc,则提前停止训练

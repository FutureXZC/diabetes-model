import torch
import torch.nn.functional as F
import configure as config
from model import TextCNN
from data_utils import seq_to_vec


def predict(sequence, path):
    """
    根据症状描述预测患糖尿病概率
    :param sequence: 症状描述
    :param path: 预测模型的路径
    :return: 患糖尿病的概率
    """
    model = TextCNN(class_num=config.class_num,
                    filter_sizes=config.filter_size,
                    filter_num=config.filter_num,
                    vocabulary_size=config.vocab_size,
                    embedding_dimension=config.embedding_dim,
                    vectors=config.vectors,
                    dropout=config.dropout)
    model.load_state_dict(torch.load(path))
    model.eval()
    vec = seq_to_vec(sequence)  # 将序列映射成向量
    input = torch.LongTensor(vec).view(-1, 1)  # 转化成指定输入格式
    target = model(input)
    predict = F.softmax(target.view(-1), dim=0)  # 使用softmax函数得到概率
    return predict[1].item()


if __name__ == '__main__':
    path = r'D:\Resource\PycharmProjects\TextCNN\drive\My Drive\TextCNN\model\bestmodel_steps100.pt'
    seq = "肌酸激酶超标直接胆红素超标总胆红素超标男性，青年我妈前两年确诊的，但是最近喝水的次数和量都多，然而刚喝完几分钟～十几分钟就有小便，这种情况，会不会不正常啊"
    print(predict(seq, path))

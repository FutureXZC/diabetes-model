import sys
import torch
import torch.nn.functional as F
from utils import seq_to_vec
from model import TextCNN
import configure as config


def predict(sequence):
    """
    根据症状描述预测患糖尿病概率
    :param sequence: 症状描述
    :param path: 预测模型的路径
    :return: 患糖尿病的概率
    """
    model = torch.load(config.model_path)
    model.eval()
    vec = seq_to_vec(sequence, config.vocab_path)  # 将序列映射成向量
    input = torch.LongTensor(vec).view(-1, 1)  # 转化成指定输入格式
    target = model(input)
    predict = F.softmax(target.view(-1), dim=0)  # 使用softmax函数得到概率
    return predict[1].item()


if __name__ == '__main__':
    # seq = "肌酸激酶超标直接胆红素超标总胆红素超标男性，青年我妈前两年确诊的，但是最近喝水的次数和量都多，然而刚喝完几分钟～十几分钟就有小便，这种情况，会不会不正常啊"
    # print(predict(seq))
    probability = predict(sys.argv[1])
    print(probability)

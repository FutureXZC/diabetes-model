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
        vector.append(vocab[word])
    return vector


def generate_text(content, age, sex, path):
    age = int(age)
    with open(path, encoding="utf-8") as f:
        indicators = json.load(f)
    # 年龄段
    age_group = {"婴幼儿": 6, "少儿": 12, "青少年": 17, "青年": 45, "中年": 69, "老年": 1e7}
    # 体检指标阈值
    metrics = {"糖化血红蛋白": [0.04, 0.06],
               "γ-谷氨酰转肽酶": [10, 60],
               "乳酸脱氢酶": [120, 220],
               "低密度脂蛋白": [0.00, 3.37],
               "前白蛋白": [0.20, 0.40],
               "尿素": [2.0, 7.1],
               "尿酸": [208, 428],
               "总胆固醇": [2.86, 6.10],
               "总胆汁酸": [0.0, 10.0],
               "总胆红素": [2.0, 20.0],
               "总蛋白": [65.0, 85.0],
               "球蛋白": [20.0, 40.0],
               "甘油三脂": [0.45, 1.81],
               "白球比": [1.2, 2.4],
               "白蛋白": [40.0, 55.0],
               "直接胆红素": [0.0, 6.0],
               "碱性磷酸酶": [35, 100],
               "肌酐": [41, 81],
               "肌酸激酶": [0, 171],
               "胆碱脂酶": [5000, 12000],
               "脂蛋白(a)": [0, 300],
               "葡萄糖": [3.90, 6.10],
               "载脂蛋白A1": [1.00, 1.60],
               "载脂蛋白B": [0.60, 1.10],
               "间接胆红素": [2, 18],
               "高密度脂蛋白": [1.29, 1.55]}
    d = {
        '糖化血红蛋白': 'thxhdb',
        'γ-谷氨酰转肽酶': 'gaxztm',
        '乳酸脱氢酶': 'rstqm',
        '低密度脂蛋白': 'dmdzdb',
        '前白蛋白': 'qbdb',
        '尿素': 'ns1',
        '尿酸': 'ns2',
        '总胆固醇': 'zdgc',
        '总胆汁酸': 'zdzs',
        '总胆红素': 'zdhs',
        '总蛋白': 'zdb',
        '球蛋白': 'qdb',
        '甘油三脂': 'gysz',
        '白球比': 'bqb',
        '白蛋白': 'bdb',
        '直接胆红素': 'zjdhs',
        '碱性磷酸酶': 'jxlsm',
        '肌酐': 'jg',
        '肌酸激酶': 'jsjm',
        '胆碱脂酶': 'djzm',
        '脂蛋白(a)': 'zdba',
        '葡萄糖': 'ptt',
        '载脂蛋白A1': 'zzdba1',
        '载脂蛋白B': 'zzdbb',
        '间接胆红素': 'jjdhs',
        '高密度脂蛋白': 'gmdzdb'
    }
    # 判断年龄段
    for key, value in age_group.items():
        if age < value:
            content = key + "，" + content
            break
    # 判断性别
    if sex == '男':
        content = "男性" + content
    else:
        content = "女性" + content
    # 判断各项指标
    for key, value in metrics.items():
        if indicators[d[key]] < value[0]:
            content = key + "偏低" + content
        elif indicators[d[key]] > value[1]:
            content = key + "超标" + content
    return content


if __name__ == '__main__':
    # path = r".\indicators.json"
    # text = generate_text("身体不舒服", 40, '男', path)
    text = generate_text(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    print(text)

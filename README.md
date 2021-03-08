# 智慧医疗-糖尿病检测系统

## 开发指导

```
# frontend serve with hot reload at localhost:8080
cd frontend
npm install
npm run dev

# backend serve with hot reload at localhost:3000
cd backend
npm install
npm run dev

# model is based on anaconda3 environment
# if used base env, you need to use root access
# Install pytorch 1.6.0
conda install pytorch=1.6.0
# Install jieba
pip3 install jieba
# Install torchtext 0.6.0
# Download installation package from: https://github.com/pytorch/text/archive/0.6.0.zip
# Unzip the compressed package, then run the tow commands followed:
cd text-0.6.0
python setup.py install
```

更多详情，请参考官方文档:  
- [Vue.js](https://cn.vuejs.org/)
- [ElementUI](https://element.eleme.cn/#/zh-CN)
- [Express](https://www.expressjs.com.cn/)

## 提交格式

- \[+\]: 添加新功能  
- \[!\]: 修复bug  
- \[*\]: 常规调整与更改
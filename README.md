# 智慧医疗-糖尿病检测系统

## 项目目录结构

```
diabetes-model.
├─backend  // 后端根目录
│  ├─bin  // 存放可执行文件
│  ├─node_modules  // 存放 package.json 中安装的模块，若不存在请执行npm i
│  ├─public  // 存放 image、css、js 等资源文件
│  │  ├─images
│  │  ├─javascripts
│  │  └─stylesheets
│  ├─routes  // 路由文件
│  ├─src  // 各种资源文件
│  │  ├─Dao  // Dao层资源文件
│  │  ├─DhCNNModel  // 基于DhCNN的糖尿病模型的所有资源文件
│  │  │  ├─resource  // 分析需要的模型文件、分词文件和语料库
│  │  ├─graph  // 知识图谱静态页面文件
│  │  ├─model  // Model层资源文件
│  │  ├─sqlite3Tool  // 数据库文件
│  │  └─utils  // 通用工具函数
│  ├─views  // 存放视图文件或者说模版文件
│  ├─app.js  // 后端入口文件
│  ├─package-lock.json  // 锁定安装时的包的版本号
│  └─package.json  // 存放后端工程信息及模块依赖
└─frontend  // 前端根目录
│  ├─build  // 构建脚本目录
│  ├─config  // 项目配置
│  ├─node_modules  // 存放 package.json 中安装的模块，若不存在请执行npm i
│  ├─src  // 各种资源文件
│  │  ├─api  // 封装好的所有http请求
│  │  ├─assets  // 会被webpack打包的公共资源
│  │  ├─layout  // 基础布局组件
│  │  │  └─components  // 基础布局的子组件
│  │  ├─router  // 路由文件
│  │  └─views  // 根据路由加载的主视图组件
│  │      ├─graph  // 知识图谱组件
│  │      ├─history  // 历史记录组件
│  │      └─predict  // 病情预测组件
│  ├─static  // 静态资源目录
│  │   ├─css
│  │   └─js
│  ├─index.html  // 首页入口文件
│  ├─package-lock.json  // 锁定安装时的包的版本号
│  └─package.json  // 存放前端工程信息及模块依赖
├─.gitignore  // 不参与版本控制的文件列表
└─README.md
```

## 开发指导

### Web前端项目热启动于http://127.0.0.1:8080

```
cd frontend
npm install
npm run dev
```

### Web后端项目热启动于http://127.0.0.1:3000

```
cd backend
npm install
npm run dev
```

### 糖尿病预测模型运行环境配置

基于anaconda3环境，如果在base环境下运行本项目，需先使用管理员权限运行cmd，执行如下命令：  

- 安装 pytorch 1.6.0：

```
conda install pytorch=1.6.0
```

- 安装 jieba：

```
pip3 install jieba
```

- 安装 torchtext 0.6.0：从[官方Github仓库](https://github.com/pytorch/text/archive/0.6.0.zip)下载zip压缩包，解压后，进入text-0.6.0文件夹内，执行

```
python setup.py install
```

更多详情，请参考官方文档:  
- [Vue.js](https://cn.vuejs.org/)
- [ElementUI](https://element.eleme.cn/#/zh-CN)
- [Express](https://www.expressjs.com.cn/)
- [PyTorch](https://pytorch.org/)
- [jieba](https://pypi.org/project/jieba/)
- [torchtext](https://github.com/pytorch/text/releases)

## 提交格式

- \[+\]: 添加新功能  
- \[!\]: 修复bug  
- \[*\]: 常规调整与更改
var express = require('express')
var router = express.Router()
var child_process = require('child_process')
var fs = require('fs')
  
// 调用本地模型，使用当前时间戳作为文档的标题作为数据文件夹名称
router.get('/', (req, res) => {
  res.sendFile(process.cwd() + '\\src\\map.html')
})

router.get('/getGraph', (req, res) => {
  res.sendFile(process.cwd() + '\\src\\graph.js')
})

router.get('/getConvertPinyin', (req, res) => {
    res.sendFile(process.cwd() + '\\src\\Convert_Pinyin.js')
})

router.get('/getCss', (req, res) => {
    res.sendFile(process.cwd() + '\\src\\style.css')
})

router.get('/getJson', (req, res) => {
    res.sendFile(process.cwd() + '\\src\\raw.json')
})

module.exports = router
var express = require('express')
var router = express.Router()
var child_process = require('child_process')
var fs = require('fs')
  
// 调用本地模型，使用当前时间戳作为文档的标题作为数据文件夹名称
router.post('/analysis', (req, res) => {
  console.log(req.body.formData)
  // let filename = req.query['filename']
  // let timeCur = req.query['timeCur']
  // let command = ['bash app_transcoding.sh ', 
  //               timeCur,
  //               ' upload/',
  //               filename].join('')
  // console.log(command)
  // child_process.exec(command, function(error, stdout, stderr){
  //   if(error) {
  //       console.error('error: ' + error)
  //       res.status(501).send('音频转码出错！')
  //       return
  //   }
  //   res.status(200).send('音频转码完成！')
  // })
  res.send('123')
})

module.exports = router
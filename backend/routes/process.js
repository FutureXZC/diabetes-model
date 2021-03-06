var express = require('express')
var router = express.Router()
var child_process = require('child_process')
var fs = require('fs')

age_group = {"婴幼儿": 6, "少儿": 12, "青少年": 17, "青年": 45, "中年": 69, "老年": 1e7}


router.post('/analysisDouble', (req, res) => {
  let formData = req.body
  let exam = JSON.stringify(formData['exam'])
  fs.writeFile('./src/TextCNNModel/temp.json', exam, (err) => {
    if (err) throw err
    console.log("JSON data is saved.");
  });
  // let testCommand = ['python ./src/TextCNNModel/trans.py ',
  //                   formData['desc'], ' ',
  //                   formData['age'], ' ',
  //                   formData['sex'], ' ',
  //                   './src/TextCNNModel/temp.json'].join('')
  // console.log(testCommand)
  // child_process.exec(testCommand, function(error, stdout, stderr){
  //   if(error) {
  //       console.error('error: ' + error)
  //       res.status(501).send('content提取出错！')
  //       return
  //   }
  //   res.send(stdout)
  // })
  res.send('111')
})

router.post('/analysisExam', (req, res) => {
  res.send('exam')
})

router.post('/analysisDesc', (req, res) => {
  let formData = req.body
  let desc = formData['desc']
  if (formData['sex'] == '男') {
    desc = '男性' + desc
  } else {
    desc = '女性' + desc
  }
  for (x in age_group) {
    if (age_group[x] > formData['age']) {
      desc = x + '，' + desc
      break
    }
  }
  let testCommand = ['python ./src/TextCNNModel/test.py ', desc].join('')
  console.log(testCommand)
  child_process.exec(testCommand, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error)
        res.status(501).send('content提取出错！')
        return
    }
    res.send(stdout)
  })
})

module.exports = router
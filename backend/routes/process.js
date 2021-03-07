var express = require('express')
var router = express.Router()
var child_process = require('child_process')
var fs = require('fs')

router.post('/saveExam', (req, res) => {
  let exam = JSON.stringify(req.body.exam)
   fs.writeFile('./src/TextCNNModel/temp.json', exam, (err) => {
    if (err) throw err
    console.log('JSON saved complete.')
  })
  res.status(200).send('JSON saved complete.')
})

router.post('/analysis', (req, res) => {
  let formData = req.body
  let testCommand = ''
  let flag = 0
  if (formData['isExam'] == '是' && formData['isDesc'] == '是') {
    flag = 2
    testCommand = ['python ./src/TextCNNModel/test.py ',
                      formData['age'], ' ',
                      formData['sex'], ' ',
                      formData['desc'], ' ',
                      './src/TextCNNModel/temp.json'].join('')
  } else if (formData['isExam'] == '是') {
    flag = 1
    testCommand = ['python ./src/TextCNNModel/test.py ',
                      formData['age'], ' ',
                      formData['sex'], ' ',
                      '""', ' ',
                      './src/TextCNNModel/temp.json'].join('')
  } else {
    testCommand = ['python ./src/TextCNNModel/test.py ',
                      formData['age'], ' ',
                      formData['sex'], ' ',
                      formData['desc'], ' ',
                      '""'].join('')
  }
  console.log(testCommand)
  child_process.exec(testCommand, function(error, stdout, stderr){
    if(error) {
      console.error('error: ' + error)
      res.status(501).send('后台提取数据出错，请将表单填写完整！')
      return
    }
    var data = fs.readFileSync('./src/TextCNNModel/probability.txt', 'utf8');
    prob = (data * 1).toFixed(4) * 100 + '%'
    console.log(prob)
    if (flag == 2) {
      res.send('根据体检数据和症状描述分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。')
    } else if (flag == 1) {
      res.send('根据体检数据分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。')
    } else {
      res.send('根据症状描述分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。')
    }
  })
})

module.exports = router
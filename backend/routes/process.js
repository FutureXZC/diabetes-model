var express = require('express')
var router = express.Router()
var child_process = require('child_process')
var fs = require('fs');
const sqlTools = require('../src/utils/sqlTools')
 
router.post('/saveExam', (req, res) => {
  let exam = JSON.stringify(req.body.exam)
   fs.writeFile('./src/DhCNNModel/temp.json', exam, (err) => {
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
    testCommand = ['python ./src/DhCNNModel/test.py ',
                      formData['age'], ' ',
                      formData['sex'], ' ',
                      formData['desc'], ' ',
                      './src/DhCNNModel/temp.json'].join('')
  } else if (formData['isExam'] == '是') {
    flag = 1
    testCommand = ['python ./src/DhCNNModel/test.py ',
                      formData['age'], ' ',
                      formData['sex'], ' ',
                      '""', ' ',
                      './src/DhCNNModel/temp.json'].join('')
  } else {
    testCommand = ['python ./src/DhCNNModel/test.py ',
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
    // 导出判定结果到临时文件
    var data = fs.readFileSync('./src/DhCNNModel/probability.txt', 'utf8');
    prob = data.substring(2, 4) + '.' + data.substring(4, 6) + '%'
    console.log(prob)
    // 将本次判定记录到数据库
    if (!sqlTools.sqlInsert(formData, data, flag)) {
      console.log('数据库存储失败！')
    }
    // 返回判定结果
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
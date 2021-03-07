var express = require('express')
var router = express.Router()
var child_process = require('child_process')
var fs = require('fs')
var PythonShell = require('python-shell');

function combined(desc, sex, age) {
  let age_group = {"婴幼儿": 6, "少儿": 12, "青少年": 17, "青年": 45, "中年": 69, "老年": 1e7}
  if (sex == '男') {
    desc = '男性' + desc
  } else {
    desc = '女性' + desc
  }
  for (x in age_group) {
    if (age_group[x] > age) {
      desc = x + '，' + desc
      break
    }
  }
  return desc
}

router.post('/analysisDouble', (req, res) => {
  let formData = req.body
  let exam = JSON.stringify(formData['exam'])
  // fs.writeFile('./src/TextCNNModel/temp.json', exam, (err) => {
  //   if (err) throw err
  // });
  let testCommand = ['python ./src/TextCNNModel/test.py ',
                    formData['age'], ' ',
                    formData['sex'], ' ',
                    formData['desc'], ' ',
                    './src/TextCNNModel/temp.json'].join('')
  // console.log(testCommand)
  // child_process.exec('python ./src/TextCNNModel/mock.py', function(error, stdout, stderr){
  //   if(error) {
  //       console.error('error: ' + error)
  //       res.status(501).send('content提取出错！')
  //       return
  //   }
  //   let tempData = ''
  //   // fs.readFile('./src/TextCNNModel/res.txt', (data, err) => {
  //   //   if (err) throw err
  //   //   // console.log(data)
  //   //   tempData = data
  //   // });
  //   res.send(tempData)
  // })
  // var spawn = require('child_process').spawn,
  // ls = spawn('python', ['./src/TextCNNModel/test.py', formData['age'], formData['sex'], formData['desc'], './src/TextCNNModel/temp.json']);

  // ls.stdout.on('data', function(data) {
  //     console.log('stdout: ' + data);
  // });

  // ls.stderr.on('data', function(data) {
  //     console.log('stderr: ' + data);
  // });

  // ls.on('close', function(code) {
  //     console.log('child process exited with code ' + code);
  // });
  res.send('111')
})

router.post('/analysisExam', (req, res) => {
  res.send('exam')
})

router.post('/analysisDesc', (req, res) => {
  let formData = req.body
  let testCommand = ['python ./src/TextCNNModel/test.py ',
                    formData['age'], ' ',
                    formData['sex'], ' ',
                    formData['desc'], ' ',
                    '""'].join('')
  console.log(testCommand)
  child_process.exec(testCommand, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error)
        res.status(501).send('content提取出错！')
        return
    }    
    var data = fs.readFileSync('./src/TextCNNModel/probability.txt', 'utf8');
    console.log(data);
    res.send(data)
  })
})

module.exports = router
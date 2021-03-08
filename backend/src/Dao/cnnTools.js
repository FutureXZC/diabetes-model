var fs = require('fs');
var child_process = require('child_process')
const sqlTools = require('./sqlTools')

function saveJson(examData) {
/**
 * 将体检数据临时保存为temp.json文件，用于模型读取并分析
 * @param {examData} 体检数据，JSON
 */
    fs.writeFile('./src/DhCNNModel/temp.json', examData, (err) => {
        if (err) {
            console.log('JSON保存失败！')
            throw err
        }
        console.log('JSON保存成功！')
    })
}

function getTestCommand(formData) {
/**
 * 调用模型分析症状描述和体检数据，并输出分析结果
 * @param {formData} 包含患者个人信息、症状描述和体检数据，JSON
 */
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
    return testCommand
    // try {
    //     child_process.exec(testCommand, {stdio: 'inherit'})
    // } catch (error) {
    //     return {
    //         'code':501,
    //         'msg': '后台提取数据出错，请将表单填写完整！'
    //     }
    // }

    // // 导出判定结果到临时文件
    // try {
    //     var data = fs.readFileSync('./src/DhCNNModel/probability.txt', 'utf8');
    // } catch (error) {
    //     return {
    //         'code':501,
    //         'msg': '后台提取数据出错，请重新提交！'
    //     }
    // }
    // let prob = data.substring(2, 4) + '.' + data.substring(4, 6) + '%'
    // console.log(prob)

    // // 将本次判定记录到数据库
    // if (!sqlTools.sqlInsert(formData, data, flag)) {
    //     console.log('数据库存储失败！')
    //     return {
    //         'code':501,
    //         'msg': '数据库存储失败！'
    //     }
    // }
    
    // // 返回判定结果
    // if (flag == 2) {
    //     return {
    //         'code': 200,
    //         'msg': '根据体检数据和症状描述分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。'
    //     }
    // } else if (flag == 1) {
    //     return {
    //         'code': 200,
    //         'msg': '根据体检数据分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。'
    //     }
    // } else {
    //     return {
    //         'code': 200,
    //         'msg': '根据症状描述分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。'
    //     }
    // }
}

function exceQuery(formData) {
/**
 * 执行sql语句
 * @param {formData} 包含患者个人信息、症状描述和体检数据，JSON
 */
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
    return new Promise(function(resolve, reject) {
        child_process.exec(testCommand, function(error, stdout, stderr){
            if (error) {
                reject("Read error: " + err.message)
                //   console.error('error: ' + error)
                //   res.status(501).send('后台提取数据出错，请将表单填写完整！')
                //   return
            }else {
                // resolve(rows)
                // 导出判定结果到临时文件
                var data = fs.readFileSync('./src/DhCNNModel/probability.txt', 'utf8');
                prob = data.substring(2, 4) + '.' + data.substring(4, 6) + '%'
                console.log(prob)
                // 将本次判定记录到数据库
                if (!sqlTools.sqlInsert(formData, data, flag)) {
                    console.log('数据库存储失败！')
                    resolve('数据库存储失败！')
                }
                // 返回判定结果
                if (flag == 2) {
                    resolve('根据体检数据和症状描述分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。')
                } else if (flag == 1) {
                    resolve('根据体检数据分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。')
                } else {
                    resolve('根据症状描述分析，患者患糖尿病的概率为<strong><i>' + prob + '<i></strong>。')
                }
            }
        })
    })
}
    
async function analysis(formData, res){
/**
 * 调用sqlRun函数执行sql语句，并通过res将执行结果返回给前端
 * @param {formData} 包含患者个人信息、症状描述和体检数据，JSON
 */
    let n = await exceQuery(formData)
    res.send(n)
}

module.exports = {
    saveJson,
    getTestCommand,
    analysis
}
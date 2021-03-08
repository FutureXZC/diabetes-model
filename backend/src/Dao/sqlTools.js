const timeTools = require('../utils/timeTools');
const sqlModel = require('../model/sql')
let db = sqlModel.db

function sqlInsert(formData, data, flag) {
/**
 * 将用户输入的所有数据保存到数据库中
 * @param {formData} 包含患者个人信息、症状描述和体检数据，JSON
 * @param {data} 患者患病概率，float
 * @param {flag} 是否输入体检数据，boolean
 * @returns {isSuccess} 是否插入成功的标志，boolean
 */
    let isSuccess = true
    let timeCur = timeTools.getCurDate()
    let sql = "INSERT INTO `history`(`name`, `time`, `desc`, `isDesc`, `isExam`, `prob`) VALUES (?, ?, ?, ?, ?, ?);"
    let obj = [
        formData['name'],
        timeCur, 
        formData['desc'], 
        formData['isDesc'] == '是' ? 1 : 0, 
        formData['isExam'] == '是' ? 1 : 0, 
        parseFloat(data)
    ]
    db.run(sql, obj, (err) => {
        if (err) {
            isSuccess = false
            console.log(err)
            console.log('判定记录存储失败！请重试！')
        } else {
            console.log('判定记录存储成功！')
        }
    })
    if (flag) {
        sql = "INSERT INTO `exam`(`name`, `time`, `age`, `sex`, \
        `thxhdb`, `gaxztm`, `rstqm`, `dmdzdb`, `qbdb`, `ns1`, `ns2`, `zdgc`, `zdzs`, `zdhs`, `zdb`, `qdb`, `gysz`, `bqb`, `bdb`, `zjdhs`, `jxlsm`, `jg`, `jsjm`, `djzm`, `zdba`, `ptt`, `zzdba1`, `zzdbb`, `jjdhs`, `gmdzdb`) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        obj = [formData['name'], 
            timeCur,  
            formData['age'],
            formData['sex']].concat(Object.values(formData['exam']))
        db.run(sql, obj, (err) => {
            if (err) {
                flag = false
                console.log(err)
                console.log('体检信息存储失败！请重试！')
            } else {
                console.log('体检信息存储成功！')
            }
        })
    }
    return isSuccess
}

function sqlDelete(examDate, isExam) {
/**
 * 删除指定日期的历史记录和体检数据
 * @param {examDate} 体检日期，string
 * @param {isExam} 是否输入了体检数据，string
 * @returns {isSuccess} 是否删除成功的标志，boolean
 */
    let isSuccess = true
    let sql = 'delete from history where time = "' + examDate + '";'
    console.log(sql)
    db.run(sql, (err) => {
        if (err) {
            isSuccess = false
            console.log(err)
            console.log('删除历史记录失败')
        } else {
            console.log('删除历史记录成功！')
        }
    })
    if (isExam == '是') {
        sql = 'delete from exam where time = "' + examDate + '";'
        console.log(sql)
        db.run(sql, (err) => {
            if (err) {
                isSuccess = false
                console.log(err)
                console.log('删除体检记录失败')
            } else {
                console.log('删除体检记录成功！')
            }
        })
    }
    return isSuccess
}

function sqlRun(sql) {
/**
 * 执行sql语句
 * @param {sql} 将要执行的sql语句，string
 */
    return new Promise(function(resolve, reject) {
        db.all(sql, [], function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(rows)
            }
        })
    })
}

async function sqlGetAll(sql, res){
/**
 * 解析sqlRun函数执行sql语句的结果，并通过res将执行结果返回给前端
 * @param {sql} 将要执行的sql语句，string
 * @param {res} 响应体对象，object
 */
    let n = await sqlRun(sql)
    res.send(n)
}

module.exports = {
    sqlInsert,
    sqlDelete,
    sqlGetAll
}
var express = require('express')
var router = express.Router()
var sqlite3 = require("sqlite3").verbose();

router.post('/getList', (req, res) => {
    let db = new sqlite3.Database("./src/sqlite3Tool/diabetes.db", function(err){
        if (err) throw err
    })
    let sql = 'select * from history;'
    db.all(sql, (err, row) => {
        res.send(row)
    })
})

router.post('/getExam', (req, res) => {
    let examDate = req.body.time
    let db = new sqlite3.Database("./src/sqlite3Tool/diabetes.db", function(err){
        if (err) throw err
    })
    let sql = 'select * from exam where time = "' + examDate + '";'
    console.log(sql)
    db.all(sql, (err, row) => {
        console.log(row[0])
        res.send(row)
    })
})

router.post('/deleteHis', (req, res) => {
    let examDate = req.body.time
    let isExam = req.body.isExam
    let db = new sqlite3.Database("./src/sqlite3Tool/diabetes.db", function(err){
        if (err) throw err
    })
    let flag = true
    let sql = 'delete from history where time = "' + examDate + '";'
    console.log(sql)
    db.run(sql, (err) => {
        if (err) {
            flag = false
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
                flag = false
                console.log(err)
                console.log('删除体检记录失败')
            } else {
                console.log('删除体检记录成功！')
            }
        })
    }
    if (flag) {
        res.send({
            'msg': '记录删除完成！',
            'code': 200
        })
    } else {
        res.send({
            'msg': '记录删除失败！',
            'code': 500
        })
    }
})

module.exports = router
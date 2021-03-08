var express = require('express')
var router = express.Router()
const sqlTools = require('../src/Dao/sqlTools')

router.post('/getList', (req, res) => {
    let sql = 'select * from history;'
    sqlTools.sqlGetAll(sql, res)
    // res.send(list)
})

router.post('/getExam', (req, res) => {
    let examDate = req.body.time
    let sql = 'select * from exam where time = "' + examDate + '";'
    sqlTools.sqlGetAll(sql, res)
    // res.send(list)
})

router.post('/deleteHis', (req, res) => {
    let examDate = req.body.time
    let isExam = req.body.isExam
    if (sqlTools.sqlDelete(examDate, isExam)) {
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
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
    // console.log(examDate)
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

module.exports = router
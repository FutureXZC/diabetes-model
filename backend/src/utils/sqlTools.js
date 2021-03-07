var sqlite3 = require("sqlite3").verbose();
const timeTools = require('./timeTools');

function sqlInsert(formData, data, flag) {
    let isSuccess = true
    let db = new sqlite3.Database("./src/sqlite3Tool/diabetes.db", function(err){
        if (err) throw err
    })
    let timeCur = timeTools.getCurDate()
    let sql = "INSERT INTO `history`(`time`, `desc`, `isDesc`, `isExam`, `prob`) VALUES (?, ?, ?, ?, ?);"
    let obj = [timeCur, formData['desc'], formData['isExam'] == '是' ? 1 : 0, formData['isExam'], parseFloat(data)]
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

module.exports = {
    sqlInsert
}
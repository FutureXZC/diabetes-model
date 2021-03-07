function getCurDate() {
    let cur = new Date()
    let year = cur.getFullYear()
    let month = cur.getMonth() + 1
    let day = cur.getDate()
    let hour = cur.getHours()
    let min = cur.getMinutes()
    let sec = cur.getSeconds()
    let timeCur = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
    return timeCur
}

module.exports = {
    getCurDate
}
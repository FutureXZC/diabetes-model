var express = require('express')
var router = express.Router()
const cnnTools = require('../src/Dao/cnnTools')
 
router.post('/saveExam', (req, res) => {
  let examData = JSON.stringify(req.body.exam)
  cnnTools.saveJson(examData)
  res.status(200).send('JSON saved complete.')
})

router.post('/analysis', (req, res) => {
  let formData = req.body
  cnnTools.analysis(formData, res)
  // res.send(result)
})

module.exports = router
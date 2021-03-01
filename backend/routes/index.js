var express = require('express')
var router = express.Router()

const multer = require('multer')
const fs = require('fs')
const { url } = require('inspector')
const { query } = require('express')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router

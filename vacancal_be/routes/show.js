const express = require('express')
const router = express.Router()
const path = require('path')

const fs = require('fs')
router.get('/', function(req, res) {
  try {
    const data = fs.readFileSync(
      path.parse(__dirname).dir + '/data/calendar.json'
    )
    res.send(JSON.parse(data))
  } catch (error) {
    console.log(error)
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const JSON_CALENDAR = path.join(
  path.parse(__dirname).dir + '/data/calendar.json'
)
const MAX_DAY_VACANTION = 20

let calendar = {}

router.post('/:username/', function(req, res, next){
  res.json({message: 'Введіть дату'})
})

router.post('/:username/:date', function(req, res, next) {
  readFileCalendar()
  var newDate = new Date(req.params.date)
  let formatDate = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
  let year = newDate.getFullYear()
  var userName = req.params.username
  var arrBuffer = []
  
  if (Object.keys(calendar).length === 0) {
    calendar[userName] = {}
  }
  if (calendar[userName][year] !== undefined) {
    arrBuffer = calendar[userName][year]
  }

  let set = new Set(arrBuffer) // Використовуєтся для перевірки на вже існуючі записи

  if (arrBuffer.length >= MAX_DAY_VACANTION){
    res.json({ message: `Відпустки року ${year} використані` })
  } else 
  if (set.has(formatDate.toString())) {
    console.log(`Дата ${formatDate} вже використовується`)
    res.json({ message: 'Ця дата відпустки вже використовується' })
  } else 
  {
    arrBuffer[arrBuffer.length] = formatDate
    calendar[userName][year] = arrBuffer

    var newObjectJSON = JSON.stringify(calendar, null, 2)
    fs.writeFile(JSON_CALENDAR, newObjectJSON, finished)

    res.status(201).send({ message: 'Відпустка успішно додана' })
  } 

  res.end()
})

module.exports = router

function finished() {
  console.log('success write to file ')
}

function readFileCalendar(){
  try {
    calendar = JSON.parse(fs.readFileSync(JSON_CALENDAR))
  } catch (error) {
    console.error(error.code)
  }
}
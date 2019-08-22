import React from 'react'
import '../css/table.css'

const Table = props => {
  const { dataFromServer } = props
  const listTableTitle = [
    'Name',
    'Entitlement / Days Remaining',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const formatedData = formatedDataFromServer(dataFromServer)

  return (
    <div className='table'>
      {listTableTitle.map((name, index) => {
        return (
          <div className='column' key={index}>
            <div className='title-table'>{name}</div>

            {formatedData.length !== 0 ? (
              formatedData.map((value, ind, formatedData) => {
                return (
                    (index === 1) ?
                    <div className="row">
                      <span>{value[index].split('/')[0]}</span>/
                      <span>{value[index].split('/')[1]}</span>
                    </div>
                    :
                    <div className='row' key={ind}>
                      {value[index]}
                    </div>
                )
              })
            ) : (
              <div className='row' />
            )}
          </div>
        )
      })}
    </div>
  )

  // Переносить усі данні з сервера у двомірний масив типу arr[[],[],[],[]]
  // Кожний наступий масив зберігає у собі данні на кожного працівника + рік 
  // [0] - ім'я та рік; [1] - max кількість відпусток/скільки вже є
  // [2-13] - зберігаються дні відпустки відповідно по місяцям року
  function formatedDataFromServer(data) {
    let arrDataFromServer = []
    let i = 0
    if (data !== null) {
      arrDataFromServer = createMultyArray()

      for (const userName of Object.keys(data)) {
        for (const year of Object.keys(data[userName])) {
          arrDataFromServer[i][0] = `${userName} y ${year}`
          arrDataFromServer[i][1] = `20/${data[userName][year].length}`

          for (const iterator of Object.keys(data[userName][year])) {
            const mounth = new Date(data[userName][year][iterator])

            arrDataFromServer[i][mounth.getMonth() + 2] === undefined ?
              arrDataFromServer[i][mounth.getMonth() + 2] = `${mounth.getDate()},` :
              arrDataFromServer[i][mounth.getMonth() + 2] += `${mounth.getDate()},`
            
          }
          i++
        }
      }
    }
    return arrDataFromServer
  }

  // Створює пустий масив потрібного розміру (в залежності від кількості працівників та років відпусток)
  function createMultyArray() {
    let arr = new Array(0)
    let lengthNamePlusYear = 0
    for (let userName of Object.keys(dataFromServer)) {
      for (let year of Object.keys(dataFromServer[userName])) {
        lengthNamePlusYear++
        arr.push(new Array(0))
      }
    }
    for (let i = 0; i < lengthNamePlusYear.length; i++) {
      for (let j = 0; j < 13; j++) {
        arr[i][j] = ''
      }
    }
    return arr
  }
}

export default Table

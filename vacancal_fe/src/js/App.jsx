import React, { Component } from 'react'
import '../css/app.css'
import Form from './Form'
import Table from './Table'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      myDate: null,
      formatDate: '',
      currentUser: 'user1',
      dataFromServer: null,
      message: ''
    }
  }

  render() {
    return (
      <div className='App'>

        <Table dataFromServer={this.state.dataFromServer}/>
        <Form
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          myDate={this.state.myDate}
        />
        {
          (this.state.message !== '') 
            &&  setTimeout(()=> {this.setState({message: ''})}, 2500)
            &&  <div className='message'>{this.state.message}</div>           
        }
      </div>
    )
  }

  handleChange = date => {
    if (date !== null){
      let formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` //Приводжу дату до текстового формат "YYYY-MM-DD"
      this.setState({ myDate: date, formatDate: formatDate })
    }
  }

  handleClick = () => {
    fetch(
      `http://localhost:4200/add/${this.state.currentUser}/${this.state.formatDate}`,
      {
        method: 'POST'
      }
    )
      .then(
        response => {
          response.json().then(
            result => {

              if (result['message'] !== undefined) {
                this.setState({message: result['message']})
                console.log(result['message'])
                this.requestGetAllDatas() //Отримую усі данні з серверу щоб оновити данні у таблиці
              } else {
                this.setState({dataFromServer: result})
              }
            },
            reject => console.error(reject)
          )
        },
        reject => {
          console.error(reject)
        }
      )
      .catch(err => console.error(err))
  }

  requestGetAllDatas = () => {
    fetch(`http://localhost:4200/show`,{
      method: 'GET',
    }).then(response => {
      response.json().then(
        result => {
          this.setState({dataFromServer: result})
        }
      )  
    })
  }

  clearMessage = () => {
    this.setState({message: ''})
  }
    
}


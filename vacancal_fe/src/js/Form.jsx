import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../css/form.css'
import imgFloppy from '../img/Save_icon-icons.com_73702.svg'

const Form = props => {
  const {
    handleChange,
    handleClick,
    myDate,
  } = props

  return (
    <div className='form'>
      <div id='title' className="item-form">Vacantion Date</div>
        <DatePicker
          className='item-form'
          selected={myDate}
          onChange={handleChange}
        />
        <div id='button' className="item-form" onClick={handleClick} >
          <img src={imgFloppy} alt=""/>
          <p>add 1 vacantion day</p>
        </div>
    </div>
  )
}

export default Form
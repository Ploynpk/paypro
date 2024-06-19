import React, { useState } from 'react'
import './Expense.css'
import logo from '../img/logo3.png'
import des3 from '../img/des3.png'
import dollar from '../img/dollar-sign.jpeg'
import { v4 as uuidv4 } from 'uuid'
// import { useNavigate } from 'react-router-dom';
// import Transaction from './Transaction';

// send onConfirm to the App to render with ONCONFIRM WAS CLICKED!!!
const Expense = (props) => {
  // onConfirm
  console.log('this is the props-->', props)
  //  enter a description input element --> onchange value as title
  const [title, setTitle] = useState('')

  // enter amout input element --> onchange value as amount
  const [amount, setAmount] = useState('') // State เพื่อเก็บค่าของ input สำหรับจำนวนเงิน

  // state for options in the option box
  const [selectedOption, setSelectedOption] = useState('')

  // use navigate to change the route to transaction and report page
  // const navigate = useNavigate(); // Hook เพื่อทำการนำทาง

  // set the state to be an empty array to store the data expense that was passed in
  // when the confirm button was clicked
  const [expenseData, setExpenseData] = useState([])

  // function to handle input from description
  const inputTitle = (input) => {
    // pass in event
    setTitle(input.target.value)
  }

  // handle the data?
  function handleExpenseData(data) {
    setExpenseData([data, ...expenseData])
  }

  // function to handle amount input // pass in event from button
  function inputAmount(input) {
    // the value that was passed
    const value = input.target.value
    if (isNaN(value) || value < 0) {
      alert('Please enter a valid positive number')
    } else {
      setAmount(value)
    }
  }

  // NOT DONE YET!!
  // function for handling options
  // incase of manually option
  // percentage
  // manually value
  // be able to add more details and comment?
  function options(event) {
    setSelectedOption(event.target.value)
  }

  //when the confirm button was clicked!
  function handleConfirm() {
    // use .trim() for the while space
    // check if amout and select option was choose
    if (title.trim() && amount && selectedOption !== '') {
      // if yes, set the value {} as expenseData in the state
      const expenseData = {
        // id: id for that transaction
        id: uuidv4(),
        // description from the input box as title value
        description: title,
        // amout: set to number make sure they are all number that was passed in
        amount: Number(amount),
        // manully option
        // by percentage?
        option: selectedOption,
      }
      // when the confirm button was clicked // send to expenseData passing to the transaction fuction to render them
      // use onConfirm
      props.onConfirm(expenseData)
      // set input of description and amount back to empty string agiain after the data has been sent!
      setTitle('')
      setAmount('')
    }
  }

  // function to handle cancel button
  // can i do use dispatch instead??
  function handleCancel() {
    // reset the description input element to be empty
    setTitle('')
    // reset the amout input element to be an empty
    setAmount('')
  }

  //RENDER
  // user profile // username,email,password
  // send to another components as userProfile to be able to CRUD

  // logo
  // description input box
  // catagories // food // shopping
  // amout input box
  // options toggle box
  // confirm
  // cancel

  // i paid for us // we split in half // I lent in half
  // i pay for you // you pay back in full amouny // I lent in full amout
  // you paid for us // we split in half // I borrowed you in half
  // you paid for me in full // i have to pay back in full amont // I borrowed you in full amount
  // more options // more manually share
  // then give them the key-value pairs // send them to transaction to calculate the amount


  return (
    <div className="container">
      <img src={logo} id="main-logo" alt="logo" />
      <div className="addExpense">
        <section className="description">
          <img src={des3} id="img-description" alt="description" />
          <input
            type="text"
            placeholder="Enter a description"
            value={title}
            onChange={inputTitle}
          />
        </section>
        <section className="amount">
          <img src={dollar} id="img-dollar" alt="dollar" />
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={inputAmount}
          />
        </section>
      </div>
      <div className="menu-container">
        <div className="dropdown">
          <select className="dropdown-content" onChange={options}>
            <option value="">Click to see options</option>
            <option value="iPaidSplit">Paid by you, split equally</option>
            <option value="youPayMe">You are owed the full amount</option>
            <option value="youPaidSplit">
              Your partner paid, split equally
            </option>
            <option value="iPayBack">
              Your partner is owed the full amount
            </option>
            <option value="moreOptions">More options</option>
          </select>
        </div>
        <button id="confirmButton" onClick={handleConfirm}>
          Confirm
        </button>
        <button id="cancelButton" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Expense

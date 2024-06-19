import React, { useState } from 'react'
import logo from '../img/logo3.png'
// use Link ans useNavaigate to chain the routes
import { Link, useNavigate } from 'react-router-dom'


// function for new user to signup
// it will render on the webpage
// 1. img/logo
// 2. form that could pass in username and password //   <form method='POST' action='/signup'>
// 3. make sure to store them into database that can access later in json?
// 4. button that will be triggle the page to redirect to the main page
// 5. add log in option

// need a function for onSubmitting (commit signup button)
// check if the username has been existed in the database?
// pass to userController to check user from the database
// has to be unique name

// then onSubmit={}  pass into form // button <button type="submit" className="btn">Sign Up</button>
// fetch req POST method to this endpoint http://localhost:3001/signup/

// state handle
// post req to mongoDB

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email , setEmail] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      // endpoint /signup
      const response = await fetch('http://localhost:3001/api/signup', {
        // send headers
        headers: {
          'Content-Type': 'application/json',
        },
        // post method req
        method: 'POST',
        // body will be json? passing in username and password
        body: JSON.stringify({ username, password }),
      })

        // if the status is ok
        if (response.status === 200) {
            response.json()
            // usenavigate to change or redirect the route
            navigate('/expense')
        } else {
            // give an alert
            alert('Signup Failed. Please Try again with different username.')
        }
      // 'user created successfully is not json'
      // await res.json()
      //response.json()
      //console.log('res.json() --> ', response.json())
      // dispatch(login(data)) // info , token

      // handle some other error 
    } catch (err) {
      console.error('Error fetching username and password', err)
    }
  }



  //1. pass in useState to setUsername and setPassword 
  // 2. connect them to backend middleware userController that received req from POST method
    // make a function to handle them 
  // 3. use fetch to the the endpoint 
  return (
    <div className="signup-container">
      <img src={logo} alt="logo" id="main-logo2" />
      <form onSubmit={handleSignup} className="signup-form">
      <input
          name="email"
          type="email"
          placeholder="e-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // use .target.value works!
        ></input>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // use .target.value works!
        ></input>
        <input
          name="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)} // have to passed it as function // use .target.value works!
        ></input>
        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>  
      </p>
    </div>
  )
}

export default Signup

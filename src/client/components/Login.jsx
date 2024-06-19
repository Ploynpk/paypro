import React, { useState } from 'react';
import logo from '../img/logo3.png';
//./client/img/logo3.png
//import axios from 'axios';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


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

const Login = () => {

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('')
    const [error , setError] = useState(false);
    // const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST', // เปลี่ยนจาก GET เป็น POST
                body: JSON.stringify({ username, password })
            });
            // if username or password dosen't match (!200)
            if (response.status !== 200) { 
                // alert incorrent username or password. please try again
                alert('Incorrect username or password. please try again')
            } else if (response.status === 400) {
                alert('Password is invalid, please try again')
            } else {
                response.json();
                navigate('/expense'); // เปลี่ยนเส้นทางไปยัง /expense หลังจากเข้าสู่ระบบสำเร็จ
            }

        } catch (err) {
            console.error('Error fetching username and password', err);
            setError(true);
        }
    };

// same with signup 
// change button te login
// passing in useState 

  return (
      <div className='signup-container'>
          <img src={logo} alt='logo' id='main-logo2' />
          <form method='POST' onSubmit={handleLogin} action='/' className='signup-form'>
              <input name='username' type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
              <input name='password' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
              <button type="submit" className="btn">Log In</button>
          </form>
          {
            error && <div className='error'>
                Wrong username or password! Please try again.
                </div>
          }
      </div>
  );
};

export default Login;
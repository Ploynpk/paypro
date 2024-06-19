import React, { useState } from 'react'
import './App.css'
import Expense from './components/Expense'
import Transaction from './components/Transaction'
import DataContext from './data/DataContext'
import Signup from './components/Signup'
import Login from './components/Login'
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from 'react-router-dom';
  
const App = () => {
    // move all the useState into the app component
  const [expenseData, setExpenseData] = useState([])
  const [lent, setLent] = useState(0)
  const [borrowed, setBorrowed] = useState(0)
  const [isSignedUp, setIsSignedUp] = useState(false)


  const handleExpenseData = (data) => {
    setExpenseData([data, ...expenseData])
  }


// NOT WORK!
  // check if it signup yet? 
  // if yes change the value to be true
  const handleSignUp = () => {
    setIsSignedUp(true)
    // if it's true // switch to the next path
  }


//   <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}> 
//           <Route index element={<Home />} />
//           <Route path="blogs" element={<Blogs />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>

// path and  to the components you want
  return (
    <Router>
      <DataContext.Provider value={{ lent, borrowed, setLent, setBorrowed }}>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={!isSignedUp ? (<Signup onSignUp={handleSignUp} />) : (<Expense onConfirm={handleExpenseData} />)} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/expense"
              element={<ExpenseWrapper expenseData={expenseData} onConfirm={handleExpenseData} />}
            />
          </Routes>
        </div>
      </DataContext.Provider>
    </Router>
  )
}

// sepearte function for transaction
// want to render them in the same page with expense
function ExpenseWrapper({ expenseData, onConfirm }) {

    // Expense props = onconfirm
    // Transaction props = expenseData from input

  return (
    <div>
      <Expense onConfirm={onConfirm} />
      <Transaction expenseData={expenseData} />
    </div>
  )
}


export default App

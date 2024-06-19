const express = require('express');
//const path = require('path');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const userController = require('./controllers/userController.js');
//const authController = require('./controllers/authController.js');
// server/controllers/userController.js

// nodemon server.js 

const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URL;

console.log('mongoURI --> ', mongoURI)

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

  // routes and middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// signup
app.post('/api/signup', userController.signup, (req, res) => {
  // send created successful back
  res.status(200).send({ user: res.locals.user, token: res.locals.token });
});

// login // come back and change again!!
app.post('/api/login', userController.verifyUser, (req, res) => {
  // send created successful back
  res.status(200).send({ message: "Welcome Back" });
});

// app.get('/expense', authController.auth , (req, res) => {
//   res.status(200).send('Expense data here');
// });

// 404 
app.use('*', (req , res) => {
  res.status(404).send('Not Found');
});


//Global error handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}...`); 
});

module.exports = app;

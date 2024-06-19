const User = require('../models/userModel.js');
//server/models/userModel.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// signup
// post method from req.body
const userController = {};

userController.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next({
        log: 'Error in userController.signup: This username is already existed, please try again or change your username.',
        status: 400,
        message: {
          error: 'Username already exists'
        }
      });
    }
   
    const hashedPassword = await bcrypt.hash(String(password), 12);
    // Create a new user
    const newUser = await User.create({ username, password: hashedPassword });
   // const newUser = await User.create({ username, password});
    console.log('newUser -->' , newUser)
    // Generate a JWT token
   const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

    // Send the created user data and token back to the client
    //const { password: removedPassword, ...userWithoutPassword } = newUser.toObject();
    //res.locals.createdUser = newUser;
    //console.log('newUser -->' , newUser);
    // newUser --> {
    //   username: 'a6',
    //   password: 123,
    //   _id: new ObjectId('666a0f56ccdaba6d2448fdd3'),
    //   __v: 0
    // }
    // return back 
  //   {
  //     "user": {
  //         "username": "a6",
  //         "_id": "666a0f56ccdaba6d2448fdd3",
  //         "__v": 0
  //     },
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmEwZjU2Y2NkYWJhNmQyNDQ4ZmRkMyIsImlhdCI6MTcxODIyNjc3NCwiZXhwIjoxNzE4MjQ4Mzc0fQ.SN2HDVykc04svrjTNSfRYaMhVSOU7ltOekrReRUsmog"
  // }
  // store in the local // respond in server.js
    res.locals.user = newUser;
    res.locals.token = token;
    // Call the next middleware
    console.log('res.local.user -->', res.locals.user)
   // res.status(201).json({ user: newUser, token });
    return next();
// global handler
  } catch (err) {
    return next({
      log: `Error in userController.signup: ${err.message}`,
      status: 500,
      message: {
        error: 'Internal server error'
      }
    });
  }
};

// login 
userController.verifyUser = async (req , res , next) => {

  try {
    // username and password that was passed in to the req.body
    const { username, password } = req.body;
    const user = await User.findOne({username});
// findOne()
// get req on the server
// check if not found then send back 'user not found'

    if (!user) {
      return next({
        log: 'Error in userController.verifyUser: User not found',
        status: 404,
        message: {
          err: 'Username is invalid, please try again'
        },
      });
    }

  console.log('user -->', user)
  console.log('password -->' , password)
  console.log('user.password -->' , user.password)
  console.log(password === user.password)

  // add async await in to the chain and it works~!
  const isPasswordValid = await bcrypt.compare(String(password), String(user.password));
    console.log('isPasswordValid -->' , isPasswordValid)
    //isPasswordValid --> Promise { <pending> }
  if (!isPasswordValid) {
    return next({
      log: 'Error in userController.verifyUser: Invalid password',
      status: 400,
      message: {
        err: 'Password is invalid, please try again'
      },
    });
  } else {
    res.locals.verifyUser = user;
    return next();
  }
    //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
   // res.status(200).json({ user, token });
    //res.send('Welcome Back!');
    
    // global handler
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser: ${err.message}`,
      status: 500,
      message: {
        error: 'Internal server error'
      }
    });
  }
};

module.exports = userController;

// get method 

// userController.createUser = async(req, res, next) => {
//   // write code here
//   const { username, password } = req.body;
//   //bcrypting password before saving:
//   const workFactor = 12;
//   bcrypt
//   .hash(password, workFactor)
//   .then((hash) => {
//     //save to database;
//     User.create({username, password: hash}, (err, users) => {
//       //if success, redirect to /secret route
//       if (err) {
//         return next({
//           log: `Error in userController.createUser ${err.message}`,
//           status: 400,
//           message: {
//             err: 'This username is alredy existed, please try again or change your username.'
//           },
//         });
//       }
//       res.locals.createdUsers = users;
//       //console.log('create ->', users);
//       return next();
//     }) 
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// };



// login
// userController.verifyUser = (req, res, next) => {
//   // write code here
//   try {
//     const { username, password } = req.body;
//     // console.log('password ->' , password);
//     //check whether the hashed(password) == password in the database:
//     //bcrypt.compare(password, hash)
    
//     User.findOne({username} , (err , users) => {
//       //console.log(same);
//       if (!users) {
//         return res.redirect('/signup');
//       } else if (!bcrypt.compare(password, users.password)){
//         return res.redirect('/signup');
//       }
      
//       res.locals.verifyUser = users; 
//       return next();
//     })
//   } catch(err) {
//     return next({
//       log : 'Error in userController.verifyUser: ' + JSON.stringify(err),
//       message: {
//         err: 'ERROR'
//       }
//     });
//   }
// };



// userController.getAllUsers = (req, res, next) => {
//     User.find({}, (err, users) => {
//       // if a database error occurs, call next with the error message passed in
//       // for the express global error handler to catch
//       if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
      
//       // store retrieved users into res.locals and move on to next middleware
//       res.locals.users = users;
//       return next();
//     });
//   };
  
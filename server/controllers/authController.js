// const User = require('../models/userModel.js');
// //server/models/userModel.js
// //const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const authController = {};


// authController.auth = async (req , res , next) => {
//     const token = req.headers.authorization;
//     console.log('req.body -->' , req.headers.authorization)
// }



// = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }
//     console.log('req.headers.authorization -->' , req.headers.authorization);
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.userId = decoded.id;
//       console.log('req.userId -->' ,  req.userId);
//       return next();
//     } catch (err) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }
// };

//module.exports = authController;
// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler');

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Email id does not exist", 401));
  }

  if (!await bcrypt.compare(password, user.password)) {
    return next(new ErrorHandler("Incorrect Password", 401))
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  user.password = undefined;
  res.status(200).json({ message: 'Logged in successfully', user, token });

});

exports.register = catchAsyncErrors(async (req, res, next) => {

  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    
    next(new ErrorHandler("User already exist with this email id", 400))
  }
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });

});


exports.logInByToken = catchAsyncErrors(async (req, res, next) => {

  
  const user = await User.findOne({ _id: req.user });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  user.password = undefined;

  res.status(200).json({ message: "Successfull", user });

});

// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler');
const errCodes = require('../errCodes')

// controller for user login

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, username } = req.body;

  const user = await User.findOne({ email }); 

  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", errCodes.BAD_REQUEST));
  }

  if (!await bcrypt.compare(password, user.password)) {
    return next(new ErrorHandler("Incorrect Password", 401))
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token,
    {
      httpOnly: true,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }
  );
  user.password = undefined;
  res.status(errCodes.SUCCESS).json({ message: 'Logged in successfully', user, token });

});

// controller for new user registration

exports.register = catchAsyncErrors(async (req, res, next) => {

  const { username, email, password } = req.body;

  // const userExist = await User.findOne({ email });
  // if (userExist) {

  //   next(new ErrorHandler("User already exist with this email id", errCodes.BAD_REQUEST))
  // }
  // const user = new User({ username, email, password });
  // await user.save();
  res.status(errCodes.SUCCESS_ALL_DONE).json({ message: 'User registered successfully' });

});


// controller for fetching user profile using token

exports.logInByToken = catchAsyncErrors(async (req, res) => {


  const user = await User.findOne({ _id: req.user });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  user.password = undefined;

  res.status(errCodes.SUCCESS).json({ message: "Successfull", user });

});


// controller for user sign out

exports.logOut = catchAsyncErrors(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(errCodes.SUCCESS).json({ message: "User logged out successfully" });
})

// controller for forgot pasword

exports.newPassword = catchAsyncErrors( async(req, res, next)=>{
    const {  email, password } = req.body;

     let user = await User.findOne({ email});

     if(!user){
      next(new ErrorHandler("User credential is invalid", errCodes.BAD_REQUEST));
     }

     user.password = password;

     user.save();

     res.status(errCodes.SUCCESS).json({message:"password change Successfully"});
   

})

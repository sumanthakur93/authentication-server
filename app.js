// app.js

const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const { connectDB }  = require('./config/connectDB')
const errorMiddleware = require('./middleware/error');
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser())

// To Secure the header
app.use(helmet());


// Data Sanitization against No SQL Query injection

app.use(mongoSanitize())

// Data Sanitization against the site script XSS
app.use(xss());

// cors option 
const {corsOptions } = require('./utils/corsOptions')


// Use CORS middleware with options
app.use(cors(corsOptions));


// connecting mongo database
connectDB();



// fetch all routes

const authRoute = require('./routes/authRoute');
// const errorHandler = require('./utils/errorHandler');


app.use('/api/v1/auth', authRoute);


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET PUT PATCH POST DELETE');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

// app.use(errorHandler);
app.use(errorMiddleware);
module.exports = app;
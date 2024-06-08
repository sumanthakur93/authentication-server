// app.js

const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const { connectDB }  = require('./config/connectDB')
const errorMiddleware = require('./middleware/error');
const cors = require('cors')

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser())
app.use(helmet());
app.use(xss());
app.use(cors());


// connecting mongo database
connectDB();



// fetch all routes

const authRoute = require('./routes/authRoute');
// const errorHandler = require('./utils/errorHandler');


app.use('/api/v1/auth', authRoute);

// app.use(errorHandler);
app.use(errorMiddleware);
module.exports = app;
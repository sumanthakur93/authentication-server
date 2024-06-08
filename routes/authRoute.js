// routes/auth.js
const express = require('express');
const { login, register, logInByToken}  = require('../controllers/authController')
const authValidate = require('../middleware/validator-middleware')
const verifyUser = require('../middleware/verifyUser');
const {registerSchema, loginSchema}  = require('../utils/auth-validator')

const router = express.Router();


router.post('/register', authValidate(registerSchema), register);


router.post('/login', authValidate(loginSchema), login);

router.get('/token', verifyUser, logInByToken);

module.exports = router;

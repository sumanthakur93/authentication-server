// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.headers.token;
  // console.log(req.headers.token);
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyUser; 

const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = "I can't believe this key is so secret!";
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    // console.log(req)
  jwt.verify(req.cookies.usertoken, process.env.FIRST_SECRET_KEY, (err, payload) => {
    if (err) { 
        console.log(err)
      return res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}


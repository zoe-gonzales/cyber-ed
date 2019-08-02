require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    console.log(req.cookies['connect.sid']);
    let token = req.cookies['connect.sid'];
    req.authenticated = false;
    if (token){
      jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err){
          console.log(err);
          req.authenticated = false;
          req.decoded = null;
          next();
        } else {
          req.decoded = decoded;
          req.authenticated = true;
          next();
        }
      });
    }
}
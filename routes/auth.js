const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    console.log(req.cookies['connect.sid']);
    let token = req.cookies['connect.sid'];
    req.authenticated = false;
    if (token){
      console.log("11111");
      jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        console.log("22222");
        if (err){
          console.log(err);
          req.authenticated = false;
          req.decoded = null;
          next();
        } else {
          console.log("33333");
          req.decoded = decoded;
          req.authenticated = true;
          next();
        }
      });
    }
}
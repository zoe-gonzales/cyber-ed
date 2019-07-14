const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  const bearerHeader = req.headers['authorization'];
    let token;
    console.log(bearerHeader);
    req.authenticated = false;
    if (bearerHeader){
      console.log("11111");
      var bearer = bearerHeader.split(" ");
      token = bearer[1];
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
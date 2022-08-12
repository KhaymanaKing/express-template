const { verify } = require('../utils/jwtToken.js');
//this verifies that the user is signed in  by checking 
// the cookie and if they're aren't 
// it responds with a message "You must be signed in to continue"
module.exports = async (req, res, next) => {
  try{
    const cookie = req.cookies[process.env.COOKIE_NAME];

    if(!cookie) throw new Error('You must be signed in to continue');

    const user = verify(cookie);

    req.user = user;
    
    next();
  } catch(err) {
    err.status = 401;
    next(err);
  }
};

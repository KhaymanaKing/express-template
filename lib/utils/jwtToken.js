const jwt = require('jsonwebtoken');
//no idea what this actually does tbh. I'm guessing
// its verification of the webtoken when users sign in
// or attempt to make any changes to the database?
function sign(payload){
  return jwt.sign(payload, process.env.JWT_SECRET, {});
}

function verify(cookie) {
  return jwt.verify(cookie, process.env.JWT_SECRET);
}

module.exports = {
  sign,
  verify
};

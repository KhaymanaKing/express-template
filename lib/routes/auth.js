const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { sign } = require ('../utils/jwtToken');
const User = require('../models/User');
// const HttpError = require('../utils/HttpError.js');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const isSecure = process.env.SECURE_COOKIES === 'true';
const COOKIE_NAME = process.env.COOKIE_NAME;
const cookieOptions = { 
  http: true,
  secure: isSecure,
  sameSite: isSecure ? 'none' : 'strict',
  maxAge: ONE_DAY_IN_MS
};

module.exports = Router()
  .get('verify', authenticate, (req, res) => {
    res.json(req.user);
  })

  .post('/signup', async ({ body }, res, next) => {
    try {
      const user = await User.insert(body);

      const token = sign({ ...user });

      res.cookie(COOKIE_NAME, token, cookieOptions).json(user);
    }catch (error){
      next(error);
    }
  });

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const auth = require('./routes/auth');
const notFound = require('./middleware/not-found');
const error = require('./middleware/error');
const authenticate = require('./middleware/authenticate');
const invItems = require('./routes/invItems');
const app = express();

if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/inventory', authenticate, invItems);

app.use(notFound);
app.use(error);

module.exports = app;

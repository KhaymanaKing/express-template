const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authenticate = require('./middleware/authenticate');
const auth = require('./routes/auth');
const inventory = require('./routes/inventory');
const notFound = require('./middleware/not-found');
const error = require('./middleware/error');

if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use('/api/v1/auth', auth);
app.use('/api/v1/inventory', authenticate, inventory);

app.use(notFound);
app.use(error);

module.exports = app;
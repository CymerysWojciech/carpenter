const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const ordersRouter = require('./routes/orders');
 const registerRouter = require('./routes/register');
 const loginRouter = require('./routes/login');
 const adminRouter = require('./routes/admin');

dotenv.config();
require("./db/bdConnect");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/orders', ordersRouter);
 app.use('/admin', adminRouter);
 app.use('/register', registerRouter);
 app.use('/login', loginRouter);

module.exports = app;

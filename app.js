const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');
const pageNotFound = require('./routes/pageNotFound');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const auth = require('./routes/auth');
const { checkAuthorizedUser } = require('./middlewares/auth');
const handleServerError = require('./middlewares/handleServerError');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(celebrateErrors());
app.use(handleServerError);
app.use('/cards', checkAuthorizedUser, cards);
app.use('/users', checkAuthorizedUser, users);
app.use('*', pageNotFound);
app.use('/', auth);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT);

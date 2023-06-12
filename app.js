const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');
const pageNotFound = require('./routes/pageNotFound');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '6484bd69169e9392e28f5b15',
  };
  next();
});

app.use('/cards', cards);
app.use('/users', users);
app.use('*', pageNotFound);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT);

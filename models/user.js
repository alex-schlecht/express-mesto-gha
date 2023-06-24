const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Unauthorized = require('../errors/Unauthorized');
const { URI_REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email не может быть пустым'],
    unique: [true, 'Email занят другим пользователем'],
    minlength: [2, 'Email должен быть не короче 2 символов'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный email адрес',
    },
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Имя пользователя должно быть не короче 2 символов'],
    maxlength: [30, 'Имя пользователя должно быть не длиннее 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, '`О себе` должно быть не короче 2 символов'],
    maxlength: [30, '`О себе` должно быть не длиннее 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => URI_REGEX.test(value),
      message: (props) => `Ссылка '${props.value}' некорректна`,
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Пароль не может быть пустым'],
    minlength: [2, 'Пароль должен быть не короче 2 символов'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }
          console.log(user);
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

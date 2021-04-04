const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя не может быть короче 2-х символов'],
    maxlength: [30, 'Имя не может быть длинее 30-ти символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Описание не может быть короче 2-х символов'],
    maxlength: [30, 'Описание не может быть длинее 30-ти символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email должен быть валидным',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен для заполнения'],
    minlength: 8,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);

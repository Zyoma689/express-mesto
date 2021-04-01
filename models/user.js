const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно для заполнения'],
    minlength: [2, 'Имя не может быть короче 2-х символов'],
    maxlength: [30, 'Имя не может быть длинее 30-ти символов'],
  },
  about: {
    type: String,
    required: [true, 'Описание обязательно для заполнения'],
    minlength: [2, 'Описание не может быть короче 2-х символов'],
    maxlength: [30, 'Описание не может быть длинее 30-ти символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка на изображение обязательна'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email должен быть валидным',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);

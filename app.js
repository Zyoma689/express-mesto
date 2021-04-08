require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const router = require('./routes/index');

const { errorsHandler } = require('./middlewares/errors-handler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', router);

// app.use((err, req, res, next) => {
//   res.send(err.name);
//   const { statusCode = 500, message } = err;
//   // // if (err.name === 'CastError') {
//   // //
//   // // }
//   res
//     .status(statusCode)
//     .send({
//       message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
//     });
// });

app.use(errorsHandler);

app.listen(PORT, () => {});

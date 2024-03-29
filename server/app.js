const express = require('express');
require('./database/db');
require('express-async-errors');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const signinRouter = require('./controllers/signin');

const { morgan, accessLogStream } = require('./utils/logger');
const {
  unknownEndpoint,
  errorHandler,
  getToken,
} = require('./utils/middleware');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(
  morgan(
    `:method :url :status :res[content-length] :response-time ms \n :req \n :time\n`,
    { stream: accessLogStream }
  )
);

app.use(getToken);
app.use('/api/signin', signinRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testRouter = require('./controllers/test');
  app.use('/api/test', testRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

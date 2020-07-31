const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const signinRouter = require('express').Router();
const User = require('../models/user');
const { SECRET } = require('../utils/config');

signinRouter.post('/', async (req, res) => {
  const { body } = req;
  if (body.password == null || body.password.length < 3) {
    return res.status(400).send({ error: 'weak password' });
  }

  const saltRounds = 10;
  const password = await bcrypt.hash(body.password, saltRounds);
  const user = new User({ ...body, password });
  const savedUser = await user.save();

  const userForToken = {
    id: savedUser.id,
    username: savedUser.username,
  };

  const token = jwt.sign(userForToken, SECRET);
  res
    .status(201)
    .send({ token, username: savedUser.username, name: savedUser.name });
});

module.exports = signinRouter;

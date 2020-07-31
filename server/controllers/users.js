const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
  });
  res.status(200).send(users);
});

module.exports = userRouter;

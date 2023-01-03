const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userToken, config.SECRET, { expiresIn: 3600 })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter

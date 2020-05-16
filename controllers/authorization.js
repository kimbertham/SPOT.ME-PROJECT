const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = 'secret'


async function login (req, res) {
  console.log('logging in')
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error('Unauthorized')
    }
    console.log(user)
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({
      message: `Welcome back ${user.username}`,
      token
    })
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid Credentials' })
  }
}

async function register(req, res) {
  console.log('registering new user')
  try {
    const user = await User.create(req.body)
    console.log('user created!')
    res.status(201).json({ message: ` Welcome ${user.username}` })
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid Credentials' })
  }
}

module.exports = {
  login,
  register
}
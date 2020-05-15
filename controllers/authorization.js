const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = 'secret'


async function login (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error('Unauthorized')
    }
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({ 
      message: `Welcome back ${user.username}`,
      token
    })

  } catch (err) {
    next(err)
  }
}

async function register(req, res) {
  console.log('registering new user')
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: ` Welcome ${user.username}` })
  } catch (err) {
    console.log(err)
    res.json({ message: 'invalid credentials' })
  }
}


module.exports = {
  login,
  register
}
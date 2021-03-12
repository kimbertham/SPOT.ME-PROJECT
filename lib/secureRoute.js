const jwt = require('jsonwebtoken') // * to decode the token
const secret = process.env.SECRET
const User = require('../models/user')

async function secureRoute(req, res, next) {
  try {
    if (!req.headers.authorization) throw new Error('Unauthorized')
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = await jwt.verify(token, secret)
    const user = await User.findById(payload.sub)

    if (!user) throw new Error('Unauthorized')
    req.currentUser = user
    console.log('through secure')
    next() 
  } catch (err) {
    next(err)
  }
}

module.exports = secureRoute


//find user and check if they exist
//check if token is valid & not expired

// if none of this is true, send 422 response
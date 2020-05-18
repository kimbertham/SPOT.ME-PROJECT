const User = require('../models/user')

async function profileShow(req, res) {
  const userId = req.params.userId
  try {
    const user = await User.findById(userId)
    console.log(userId)
    res.status(200).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function userUpdate(req, res) {
  try {
    console.log('got')
    const userId = req.params.userId
    const user = await User.findById(userId)
    console.log(req.body)
    Object.assign(user, req.body) 
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    console.log(err)
    res.status(422).json(err)
  }
}


module.exports = {
  show: profileShow,
  userUpdate
}
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

async function followUser(req,res) {

  const getUser = req.params.userId
  const userToFollow = await User.findById(getUser)
  const currentUser = req.currentUser 
  userToFollow.following.push(currentUser)
  res.json(200).json('Followed confirm')

}

module.exports = {
  show: profileShow,
  follow: followUser
}
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


module.exports = {
  show: profileShow
}
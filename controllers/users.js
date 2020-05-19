const User = require('../models/user')
const Group = require('../models/Group')

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
    Object.assign(user, req.body) 
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    console.log(err)
    res.status(422).json(err)
  }
}


// -------- GET USERS GROUPS ---------------
// ------ GET request to /groups
// --- valid token required of user



async function getUsersGroups(req,res,next){
  console.log('GET FEED')
  try {
    // get user
    const user = await User.findById(req.currentUser._id)
    if (!user) {
      throw new Error('Not Found')
    }
    // get all groups joined by the user
    const groups = await Group.find()
    const usersGroups = groups.filter(group => {
      let userInGroup = false
      group.members.forEach(member => {
        if (user._id.equals(member)){
          userInGroup = true
        }
      })
      return userInGroup
    })

    res.status(200).json(usersGroups)
  } catch (err){
    next(err)
  }
}



module.exports = {
  show: profileShow,
  getUsersGroups,
  userUpdate
}
const User = require('../models/user')
const Group = require('../models/Group')

async function profileShow(req, res) {
  try {
    console.log('helloooo')
    const user = await User.findById(req.params.userId)
      // .populate('posts.comments.user')
      // .populate('posts.likes')
      .populate('followers')
      .populate('posts.owner')
      // .populate('comments.user')
    res.status(200).json(user)
  } catch (err) {
    res.json(err)
  }
}

async function userUpdate(req, res) {
  try {
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

// async function getDataById(req,res, next) {
//     const ownerId = req.params.ownerId
// }


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

    // console.log('got groups')
    // console.log(usersGroups)
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
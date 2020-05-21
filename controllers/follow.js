const User = require('../models/user')


// ------------ FOLLOW USER ----------------
// PUT request /profile/:userId/follow
// The :userId is of the user who will be followed. The user who will follow has their details in the token
// no body required
// any Valid token required

async function toggleFollow(req,res,next){
  let message = ''
  // console.log(req.currentUser)
  try {
    const userToFollow = await User.findById(req.params.userId)
    const followingUser = await User.findById(req.currentUser._id)
    // const infoCurrentUser = {
    //   _id: followingUser.id, 
    //   name: followingUser.name, 
    //   image: followingUser.image
    // }

    // const infoToFollow = {
    //   _id: userToFollow.id, 
    //   name: userToFollow.name, 
    //   image: userToFollow.image
    // }

    // console.log(userToFollow)
    // console.log(followingUser)
    
    if (!userToFollow || !followingUser){
      throw new Error('Not Found')
    }
    if (userToFollow._id.equals(req.currentUser._id)){
      throw new Error('You cannot follow yourself hehe!')
    } 
    if (userToFollow.followers.includes(req.currentUser._id)){
      userToFollow.followers.pull(req.currentUser._id)
      followingUser.following.pull(userToFollow._id)
      message = 'Unfollowed User'
    } else {
      userToFollow.followers.push(req.currentUser._id)
      followingUser.following.push(userToFollow._id)
      message = 'Followed User'
    }
    console.log('followed')
    await userToFollow.save()
    await followingUser.save()
    res.status(202).json(message)
  } catch (err){
    next(err)
  }
}

// get User from profile id
// check if user exists
// check if user is already following 
// push/pull where needed


module.exports = {
  toggleFollow: toggleFollow
}
const User = require('../models/user')
const Group = require('../models/Group')


// -------------- Get News Feed ----------------------
// GET request: /news
// no body required
// valid token required
// Will return an array of ALL posts from joined groups and followed users

async function getNewsFeed(req,res,next){
  console.log('GET FEED')
  const postArray = []
  try {
    // get user and populate following field
    const user = await (await User.findById(req.currentUser._id).populate('following'))
    if (!user) {
      throw new Error('Not Found')
    }
    // get posts from each of the followed users
    user.following.forEach(followedUser => {
      followedUser.posts.forEach(posts => {
        postArray.push(posts)
      })
    })
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
    // get all posts from each group the user is in
    usersGroups.forEach(group => {
      group.posts.forEach(groupPost => {
        postArray.push(groupPost)
      })
    })
    console.log(postArray)

    postArray.sort(function(a, b){
      return b.updatedAt - a.updatedAt
    })
    console.log(postArray)
    res.status(200).json(postArray)
  } catch (err){
    next(err)
  }
 
}




module.exports = {
  getNewsFeed: getNewsFeed
}


// get User's followers
// get followers posts?
// add to array
// get user's groups
// get group's posts
// add to array
// sort by date

// Post a comment on the newsFeed 

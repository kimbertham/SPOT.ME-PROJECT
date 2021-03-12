const User = require('../models/user')


// ----- CREATE POST  - NOT FOR GROUP POSTS!, REFER TO GROUP CONTROLLER FOR THIS  ---------
// post request - /profile/:userId/post
// require body = {
// content: String
// }
// REQUIRES VALID TOKEN
async function createNewPost(req,res,next) {
  // console.log('post submitted')
  // console.log(req.currentUser)
  // console.log(req.params.userId)
  try {
    const user = await User.findById(req.params.userId)
    // if (!user.equals(req.currentUser._id)){
    //   throw new Error('Not authorized to do this')
    // }
    req.body.owner = req.currentUser
    user.posts.push(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (err){
    next(err)
  }
}

// ----- DELETE REQUEST TO REMOVE POST  - NOT FOR GROUP POSTS!, REFER TO GROUP CONTROLLER FOR THIS  ---------
// http delete request - /profile/:userId/post/:postId
// no body required
// owner token required to delete

async function deletePost(req,res,next) {
  try {
    const user = await User.findById(req.params.userId)
    const postToDelete = user.posts.id(req.params.postId)
    if (!user || !postToDelete) {
      throw new Error('Not Found')
    }
    if (!postToDelete.owner.equals(req.currentUser._id)){
      throw new Error('Not authorized to do this')
    }
    await postToDelete.remove()
    await user.save()
    res.status(201).json('post deleted successfully')

  } catch (err){
    next(err)
  }
}

// ------- TOGGLE A LIKE ON A POST CONTROLLER - NOT FOR GROUP POSTS!, REFER TO GROUP CONTROLLER FOR THIS  ------------
// Will like the post or unlike the post if the user already liked it
// put request - /profile/:ownerId/post/:postId
// userId is the Id of the OWNER of the post, Not the id of the user who is signed in
// no body required
// valid token required to delete

async function toggleLike(req,res,next){
  try {
    const user = await User.findById(req.currentUser._id)
    const owner = await User.findById(req.params.userId)
    const post = owner.posts.id(req.params.postId)
    if (!owner || !post) {
      throw new Error('Not Found')
    }
    
    if (post.likes.includes(req.currentUser._id)) {
      post.likes.pull(req.currentUser)
      user.likes.pull(post)
    } else {
      post.likes.push(req.currentUser)
      user.likes.push(post)
    }
    
    await owner.save()
    await user.save()
    res.status(201).json('Liked')

  } catch (err){
    next(err)
  }
}


// ------------------------------ ADD COMMENT TO A POST SECTION  - NOT FOR GROUP POSTS!, REFER TO GROUP CONTROLLER FOR THIS  -------------------------------------
// PUT Request to /profile/:ownerId/post/:postId/comment
// body required = {content: String }
// valid token required

async function addComment(req,res,next){
  try {
    console.log('received')
    const owner = await User.findById(req.params.ownerId)
    const post = owner.posts.id(req.params.postId)
    if (!owner || !post) {
      throw new Error('Not Found')
    }
    
    req.body.user = req.currentUser
    post.comments.push(req.body)
    await owner.save()

    res.status(201).json('comment added')
  } catch (err){
    next(err)
  }
}


// ------------------------------ DELETE COMMENT TO A POST SECTION  - NOT FOR GROUP POSTS!, REFER TO GROUP CONTROLLER FOR THIS  -------------------------------------
// DELETE Request to /profile/:ownerId/post/:postId/comment/:commentId
// NO body required 
// valid token required - either the comment owner or the owner of the post

async function removeComment(req,res,next){
  try {
    const owner = await User.findById(req.params.ownerId)
    const post = owner.posts.id(req.params.postId)
    const commentToDelete = post.comments.id(req.params.commentId)
    if ( !owner || !post || !commentToDelete) {
      throw new Error('Not Found')
    }
    
    post.comments.pull(commentToDelete)
    await owner.save()
    res.status(201).json('comment removed successfully')
  } catch (err){
    next(err)
  }
}



module.exports = {
  newPost: createNewPost,
  deletePost,
  addLike: toggleLike,
  addComment,
  removeComment
}



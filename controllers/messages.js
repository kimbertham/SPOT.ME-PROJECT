const User = require('../models/user')

// -------------- GET MESSAGES ----------------------
// GET request: /messages
// no body required
// valid token required
// Will return an array of ALL messages

async function getAllMessages(req,res,next){
  console.log('GET ALL MESSAGES')
  try {
    const user = await User.findById(req.currentUser._id)

    if (!user) throw new Error('Not Found')
    res.status(200).json(user.messages)
  } catch (err) {
    next(err)
  }
}

// ----- CREATE MESSAGE ---------
// post request - /messages/:userId/post/:recipentId
// require body = {
// content: String,
// image: String(optional)
// }
// token required

async function createMessage(req,res,next) {
  console.log('message sent!')

  try {
    const user = await User.findById(req.params.userId)
    const otherUser = await User.findById(req.params.recipentId)
    if (!user.equals(req.currentUser._id)) throw new Error('Not authorized to do this')

    // * push new message to user
    req.body.sender = req.params.userId
    req.body.otherUserId = req.params.recipentId
    user.messages.push(req.body)

    // * push new message to recipent
    req.body.otherUserId = req.params.userId
    otherUser.messages.push(req.body)

    await user.save()
    await otherUser.save()
    res.status(201).json('message sent!')
  } catch (err){
    next(err)
  }
}

// ----- DELETE MESSAGE  ----------
// http delete request - /messages/:userId/delete/:postId
// no body required
// owner token required to delete
// only the requestees message will be deleted, the other user will still be able to see the message

async function deleteMessage(req,res,next) {
  console.log('deleting')
  try {
    const user = await User.findById(req.params.userId)
    const messageToDelete = user.messages.id(req.params.postId)
    console.log(messageToDelete)

    if (!user || !messageToDelete) throw new Error('Not Found')
    await messageToDelete.remove()
    await user.save()
    res.status(201).json('message deleted successfully')

  } catch (err){
    next(err)
  }
}

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage
}
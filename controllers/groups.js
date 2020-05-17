const Group = require('../models/Group')
const User = require('../models/user')

// --------------- CREATE NEW GROUP ---------------
// post request: /groups/new/:userId
// body required = {
// name: string,
// description: String,
// }
async function createGroup(req,res,next) {
  try {
    const user = await User.findById(req.params.userId)
    if ( !user.equals(req.currentUser._id)){
      throw new Error('Not authorized to do this')
    }
    req.body.owner = req.currentUser
    const newGroup = await Group.create(req.body)
    res.status(201).json(newGroup)
  } catch (err){
    next(err)
  }

}

module.exports = {
  new: createGroup
}
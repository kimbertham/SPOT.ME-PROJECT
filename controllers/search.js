const User = require('../models/user')
const Group = require('../models/Group')


// ---- RETURNS SEARCH RESULTS FOR THE SEARCHBAR -------
// GET request to /search/:inputText
// no body required
// no token required

async function returnResults(req,res,next) {
  const searchText = req.params.inputText
  
  try {
    const UserList = await User.find()
    const usersFiltered = UserList.filter(user => {
      const regex = new RegExp(searchText, 'i')
      return user.firstName.match(regex) || user.username.match(regex)
    })

    const groupList = await Group.find()
    const groupFiltered = groupList.filter(group => {
      const regex = new RegExp(searchText, 'i')
      return group.name.match(regex)
    })

    const results = {
      users: usersFiltered.slice(0,4),
      groups: groupFiltered.slice(0,4)
    }

    res.json(results)
  } catch (err){
    next(err)
  }
}

module.exports = {
  results: returnResults
}

const dog = 2

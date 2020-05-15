const mongoose = require('mongoose')
const userSchema = require('./user')

const groupPostSchema = 0



const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectIdebugger, ref: 'User', required: true },
  posts: [ groupPostSchema ],
  followers: [ userSchema ]
}, {
  timestamps: true
})

GroupSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Group', GroupSchema)
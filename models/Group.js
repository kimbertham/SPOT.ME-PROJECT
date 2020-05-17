const mongoose = require('mongoose')


const groupPostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }]
}, {
  timestamps: true
})


const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  posts: [ groupPostSchema ],
  members: [ { type: mongoose.Schema.ObjectId, ref: 'User', required: true } ]
}, {
  timestamps: true
})

GroupSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Group', GroupSchema)
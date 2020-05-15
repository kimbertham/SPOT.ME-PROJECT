const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('post', PostSchema)
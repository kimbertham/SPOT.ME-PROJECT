const mongoose = require('mongoose')



const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})


const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  images: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('post', PostSchema)
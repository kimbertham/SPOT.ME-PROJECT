const mongoose = require('mongoose')
const commentSchema = require('./commentSchema')

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  comments: [commentSchema]
}, {
  timestamps: true
})


module.exports = postSchema
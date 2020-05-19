const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }]
}, {
  timestamps: true
})

module.exports = commentSchema
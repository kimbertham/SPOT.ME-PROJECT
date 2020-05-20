const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  otherUserId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String },
  image: { type: String }
}, {
  timestamps: true
})

module.exports = messageSchema
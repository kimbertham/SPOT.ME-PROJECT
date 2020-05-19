const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const Group = require('./Group') //* not in use yet

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  comments: [commentSchema]
}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  username: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  level: { type: String, required: true },
  // following: [ userSchema ], // * We need the id of the users
  gyms: [],
  posts: [postSchema],
  description: { type: String, maxlength: 50 },
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }]
}, {
  timestamps: true
})

// * gives a virtual key of groups that user is following based on whether the group has their ID
userSchema.virtual('groupsJoined', {
  ref: 'Group',
  localField: '_id',
  foreignField: 'user'
})

userSchema
  .set('toJSON', {
    virtuals: true, 
    transform(doc, json) {
      delete json.password
      return json
    }
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)
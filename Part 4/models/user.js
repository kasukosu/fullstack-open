const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min:[3, 'Too short username'],
    unique: true
  },
  name: String,
  passwordHash: {
    type:String,
    min:[3, 'Too short password'],
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
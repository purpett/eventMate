const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const mongooseHidden = require('mongoose-hidden')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attending: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  // add created events?
  // add liked/saved events?
  // add profile image?
})
userSchema.pre("save", function hashPassword() {
  if (this.isModified("password")){
    this.password = bcrypt.hashSync(this.password, 10)
  }
})
userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseHidden({defaultHidden: {password: true}}))
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
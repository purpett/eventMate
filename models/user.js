const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  attending: { type: Schema.Types.ObjectId, ref: 'Event' },
  // add created events?
  // add liked/saved events?
  // add profile image?
})

const User = mongoose.model('User', userSchema)

module.exports = User
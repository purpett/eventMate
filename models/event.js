const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { commentSchema } = require('./comment')

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  organiser: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
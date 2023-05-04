const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: [{ type: Schema.type.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  organiser: { type: Schema.type.ObjectId, ref: 'User' }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
const mongoose = require('mongoose')
const Event = require('./models/event')
const User = require('./models/user')
const { Comment } = require('./models/comment')
const dbConfig = require('./config/db');

mongoose.connect(dbConfig)

const firstEvent = new Event({
  title: 'Beatles in Concert',
  description: 'A group of people making music together for a crowd!',
  location: 'London',
  date: '2023-05-30',
  comments: [],
  attendees: [],
})

const secondEvent = new Event({
  title: 'House Party',
  description: 'Just a house party hehe',
  location: 'London',
  date: '2023-06-22',
  comments: [],
  attendees: [],
})

const firstUser = new User({
  username: 'michelabicocchi',
  password: 'youshouldnotseethis',
  attending: []
})

const secondUser = new User({
  username: 'pennythelab',
  password: 'woofwoof',
  attending: []
})


const firstComment = new Comment({
  text: 'This is a comment under the first event',
})

const secondComment = new Comment({
  text: 'This is a comment under the second event',
})


firstComment.author = firstUser
firstEvent.comments.push(firstComment)
firstEvent.comments.push(secondComment)
firstEvent.attendees.push(firstUser)
firstEvent.attendees.push(secondUser)
firstEvent.organiser = secondUser
firstUser.attending.push(firstEvent)
firstUser.attending.push(secondEvent)

firstUser.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

secondUser.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

firstEvent.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

secondEvent.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

firstComment.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

secondComment.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

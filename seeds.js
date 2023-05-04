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
})

const secondEvent = new Event({
  title: 'House Party',
  description: 'Just a house party hehe',
  location: 'London',
  date: '2023-06-22',
})

const firstUser = new User({
  username: 'michelabicocchi',
  password: 'youshouldnotseethis',
})

const secondUser = new User({
  username: 'pennythelab',
  password: 'woofwoof',
})


const firstComment = new Comment({
  text: 'This is a comment under the first event'
})

const secondComment = new Comment({
  text: 'This is a comment under the second event'
})

firstEvent.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

secondEvent.save()
  .then(() => console.log('event saved'))
  .catch(() => console.log('event not saved'))

firstComment.save()
  .then(() => console.log('comment saved'))
  .catch(() => console.log('comment not saved'))

secondComment.save()
  .then(() => console.log('comment saved'))
  .catch(() => console.log('comment not saved'))

firstUser.save()
  .then(() => console.log('user saved'))
  .catch(() => console.log('user not saved'))

secondUser.save()
  .then(() => console.log('user saved'))
  .catch(() => console.log('user not saved'))

// event.comments.push(comment)
// event.organiser.push(user)
// event.attendees.push([user, user])
// comment.author.push(user)
// user.attending.push([event, event])
// user.likes.push([event, event])

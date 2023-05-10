const mongoose = require('mongoose')
const Event = require('./models/event')
const User = require('./models/user')
// const dbConfig = require('./config/db');

const db = require('./config/db');

// Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

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


const firstComment = {
  text: 'This is a comment under the first event',
}

const secondComment = {
  text: 'This is a comment under the second event',
}


firstComment.author = firstUser.username
firstEvent.comments.push(firstComment)
firstEvent.comments.push(secondComment)
firstEvent.attendees.push(firstUser)
firstEvent.attendees.push(secondUser)
firstEvent.organiser = secondUser.username
firstUser.attending.push(firstEvent)
firstUser.attending.push(secondEvent)

const seedDatabase = async () => {
  try {
  mongoose.connect(db)
  await firstUser.save()
  await secondUser.save()
  await firstEvent.save()
  await secondEvent.save()
  }
  catch(error){
    console.log(error)
  }
}
seedDatabase()

// .then(() => console.log('event saved'))
// .catch(() => console.log('event not saved'))


// .then(() => console.log('event saved'))
// .catch(() => console.log('event not saved'))


// .then(() => console.log('event saved'))
// .catch(() => console.log('event not saved'))


  // .then(() => console.log('event saved'))
  // .catch(() => console.log('event not saved'))

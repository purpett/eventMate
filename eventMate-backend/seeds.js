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
  location: 'London, England',
  date: '2023-05-30',
  comments: [],
  attendees: [],
})

const secondEvent = new Event({
  title: 'House Party',
  description: 'Just a house party hehe',
  location: 'London, England',
  date: '2023-06-22',
  comments: [],
  attendees: [],
})

const thirdEvent = new Event({
  title: 'Eurovision 2023',
  description: 'European singing competition that is judged based on political preference rather than performance.',
  location: 'Liverpool, England',
  date: '2023-05-23',
  comments: [],
  attendees: [],
  organiser: "European Broadcasting Union"
})

const fourthEvent = new Event({
  title: 'World Cup 2022 Final',
  description: 'Pinacle of Football',
  location: 'Lusail, Quatar',
  date: '2022-12-18',
  comments: [],
  attendees: [],
  organiser: "Fifa"
})

const fifthEvent = new Event({
  title: 'Silverstone Grand Prix 2023',
  description: 'Fast cars amazing innovation, probably redbull 1-2',
  location: 'Silverstone, England',
  date: '2023-07-09',
  comments: [],
  attendees: [],
  organiser: "Home of British Motor Racing"
})

const sixthEvent = new Event({
  title: 'Edinburgh Art Festival',
  description: 'Pretty Pictures',
  location: 'Edinburgh, Scotland',
  date: '2023-07-27',
  comments: [],
  attendees: [],
  organiser: "Scottish National Gallery and Royal Scottish Academy"
})

const seventhEvent = new Event({ 
  title: 'Brighton Pride',
  description: 'Annual Pride Community Parade',
  location: 'Brighton, England',
  date: '2023-08-04',
  comments: [],
  attendees: [],
  organiser: "Brighton Pride CIC"
})

const eighthEvent = new Event({
  title: 'Reading Festival',
  description: 'Music festival, drinks probably overpriced but good fun',
  location: 'Reading, England',
  date: '2023-08-25',
  comments: [],
  attendees: [],
  organiser: "Festival Republic"
})

const ninthEvent = new Event({
  title: 'British Science Festival',
  description: "Shines a light on Britain's top scientists",
  location: 'Chelmsford, England',
  date: '2023-10-18',
  comments: [],
  attendees: [],
  organiser: "The British Science Association"
})

const tenthEvent = new Event({
  title: 'London Fashion Week',
  description: 'Fancy dresses paraded on catwalk',
  location: 'London, England',
  date: '2023-09-15',
  comments: [],
  attendees: [],
  organiser: "The British Fashion Council"
})

const eleventhEvent = new Event({
  title: 'Winter Wonderland',
  description: 'Open-air Christmas market with ice skating, shows roller coaster rides and street food',
  location: 'Hyde Park, England',
  date: '2023-12-01',
  comments: [],
  attendees: [],
  organiser: "PWR Events Royal Parks of London"
})

const twelfthEvent = new Event({
  title: 'Surprise Party',
  description: 'Bit of drinking',
  location: 'Cambridge, England',
  date: '2023-05-18',
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

const thirdUser = new User({
  username: 'miles',
  password: 'morris',
  attending: []
})

const fourthUser = new User({
  username: 'catherine',
  password: 'nevin',
  attending: []
})

const fifthUser = new User({
  username: 'K-B',
  password: 'K-B',
  attending: []
})

// const sixthUser = 

const firstComment = {
  text: 'This is a comment under the first event',
}

const secondComment = {
  text: 'This is a comment under the second event',
}
const thirdComment = {
  author: 'K-B',
  text: 'First'
}
const fourthComment = {
  author: 'miles',
  text: 'Vroom'
}


firstComment.author = firstUser.username
firstEvent.comments.push(firstComment)
firstEvent.comments.push(secondComment)
firstEvent.attendees.push(firstUser)
firstEvent.attendees.push(secondUser)
firstEvent.organiser = secondUser.username
firstUser.attending.push(firstEvent)
firstUser.attending.push(secondEvent)
twelfthEvent.comments.push(thirdComment)
twelfthEvent.organiser = fifthUser.username
fifthEvent.comments.push(fourthComment)
fifthUser.attending.push(fourthEvent)
fifthUser.attending.push(fifthEvent)


const seedDatabase = async () => {
  try {
    console.log("DB", db)
  await mongoose.connect(db)
  console.log("db connected")
  // await mongoose.connection.db.dropDatabase()
  await firstUser.save()
  await secondUser.save()
  await thirdUser.save()
  await fourthUser.save()
  await fifthUser.save()
  await firstEvent.save()
  await secondEvent.save()
  await thirdEvent.save()
  await fourthEvent.save()
  await fifthEvent.save()
  await sixthEvent.save()
  await seventhEvent.save()
  await eighthEvent.save()
  await ninthEvent.save()
  await tenthEvent.save()
  await eleventhEvent.save()
  await twelfthEvent.save()
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

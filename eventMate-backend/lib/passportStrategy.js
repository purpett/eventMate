// Passport Strategy Package
const passportJWT = require('passport-jwt')
const User = require('../models/user')

// Passport Options
const jwtOptions = require('./passportOptions')

// JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy

// This `strategy` function will be called every time a user makes a request to our API with a JSON Web Token
// This function to see if the requesting user has a valid jWT.
// and if the token has expired.
const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log('Payload Received!')
  console.log('User ID:', jwtPayload.userId)
  console.log('Token Expires On:', jwtPayload.exp)

  User.findById(jwtPayload.userId)
    .then(user => next(null, user))
    .catch(() => next(null, false))
})

module.exports = strategy
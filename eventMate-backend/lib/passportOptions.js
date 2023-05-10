const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

jwtOptions.secretOrKey = 'The_Full_Stack_Squad' //if we can get this env probably better process.env

module.exports = jwtOptions
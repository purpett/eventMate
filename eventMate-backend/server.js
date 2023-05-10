const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./config/db');
const eventRouter = require('./routes/eventRoutes')
const userRouter = require('./routes/userRoutes')
const commentRouter = require('./routes/commentRoutes')
const User = require('./models/user')

// Require Auth Related Packages
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Require Passport Strategy and Options
const strategy = require('./lib/passportStrategy')
const jwtOptions = require('./lib/passportOptions')


const app = express();

mongoose.connect(dbConfig);
const db = mongoose.connection;

const port = process.env.PORT || 5002;

db.on('error', (error) => console.log(`ERROR: ${error.message}`));
db.on('connected', () => console.log(`MondoDB Connected: ${dbConfig}`));
db.on('disconnected', () => console.log('MongoDB Disconnected'))

app.use(express.json());

// Set CORS headers on response from this API using 'cors' npm package
app.use(cors({
  origin: 'http://localhost:3000'
}))

// Middleware for auth
passport.use(strategy)

// Mount the imported Routes
app.use(eventRouter)
app.use(userRouter)
app.use(commentRouter)

app.post('/api/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username, password: req.body.password })
      .then((user) => {
        const payload = {
          userId: user._id,
          username: user.username
        }
        const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 600 })

        res.json({ success: true, token: token })
      })
      .catch((error) => console.log(error, 'Invalid Username or Password'))
  }
})

app.listen(port, () => console.log(`listening on port ${port}`));



const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const Event = require('../models/event')

/* 
Action: SHOW
Method: Get
URI: /api/users/
Description: Get a User by User ID
*/

router.get('/api/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.params.id)
    .populate("attending")
    .then(user => {
      if (user) {
        res.json({ user: user })
      } else {
        res.status(404).json('Provided id does not match any documents')
      }
    })
    .catch(error => res.status(500).json(error.message))
})


/*
Action: CREATE
Method: Post
URI: /api/users/
Description: Create a new User
*/

router.post('/api/users', (req, res) => {
  User.create(req.body)
    .then(newUser => res.status(201).json({ user: newUser }))
    .catch(error => res.status(500).json(error.message))
})

/*
Action: DESTROY
Method: Delete
URI: /api/users/6454c695fad21cb899116e53
Description: Delete an Users by its User ID
 */

router.delete('/api/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (user) {
        res.json({ user: user })
      } else {
        res.status(404).json('Provided id does not match any documents')
      }
    })
    .catch(error => res.status(500).json(error.message))
})

/*
Action: UPDATE
Method: Put/Patch
URI: /api/users/e585b9q283u49
Description: Update an Users by its User ID
*/

router.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (user) {
        res.json({ user: user })
      } else {
        res.status(404).json('Provided id does not match any documents')
      }
    })
    .catch(error => res.status(500).json(error.message))
})


/* 
Action: INDEX
Method: Get
URI: /api/users/anoifIHE2n12/events
Description: Get all Events that contain a given User ID
*/
router.get('/api/users/:id/events', (req, res) => {
  Event.find({ attendees: req.params.id })
    .then((userEvents) => {
      res.json({ events: userEvents })
    })
    .catch(error => res.status(500).json(error.message))
})



module.exports = router


const express = require('express')

const Event = require('../models/event')

const router = express.Router()

/* 
Action: INDEX
Method: Get
URI: /api/event
Description: Get all Events
*/

router.get('/api/events', (req, res) => {
  Event.find({}).sort({ attendees: -1 })
    .then((allEvents) => {
      res.json({ events: allEvents })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
})

/* 
Action: SHOW
Method: Get
URI: /api/event/e585b9q283u49
Description: Get an Event by Event ID
*/

router.get('/api/events/:id', (req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (event) {
        res.json({ event: event })
        // If we cannot find an Event with the ID
      } else {
        res.status(404).json("The provided ID does not match any documents")
      }
    })
    .catch((error) => res.status(500).json(error.message))
})

/*
Action: CREATE
Method: Post
URI: /api/event
Description: Create a new Event
*/

router.post('/api/events', (req, res) => {
  Event.create(req.body)
    // On a successful creation respond with 201 http status
    // and the content of the new Event
    .then((newEvent) => res.status(201).json({ event: newEvent }))
    // Catch any error that may occur
    .catch((error) => res.status(500).json(error.message))
})

/*
Action: DESTROY
Method: Delete
URI: /api/event/e585b9q283u49
Description: Delete an Event by its Event ID
 */

router.delete('/api/events/:id', (req, res) => {
  Event.findByIdAndRemove(req.params.id)
    .then((event) => {
      if (event) {
        res.json({ event: event })
        // If we cannot find an Event with the ID
      } else {
        res.status(404).json("The provided ID does not match any documents")
      }
    })
    // Catch an error
    .catch((error) => res.status(500).json(error.message))
})

/*
Action: UPDATE
Method: Put/Patch
URI: /api/event/e585b9q283u49
Description: Update an Event by its ID
*/

router.put('/api/events/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(event => {
      if (event) {
        res.json({ event: event })
        // if we cannot find an Event matching the ID
      } else {
        res.status(404).json("The provided ID does not match any documents")
      }
    })
    // Catch any error
    .catch(error => res.status(500).json(error.message))
})

module.exports = router
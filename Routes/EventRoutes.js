const express = require('express')

const Event = require('../models/event')

const router = express.Router()

/* 
Action: INDEX
Method: Get
URI: /api/event
Description: Get all Events
*/

router.get('/api/event'), (req, res) => {
  Event.find()
  .then((allEvents) => {
    res.json( { events: allEvents })
  } )
  .catch((error) => res.status(500).json( {error: error.message}))
}

/* 
Action: SHOW
Method: Get
URI: /api/event/e585b9q283u49
Description: Get an Event by Event ID
*/

router.get('/api/event/:id', (req, res) => {
  Event.findById(req.params.id)
  .then((event) => {
    if (event) {
      res.json({event: event})
      // If we cannot find an Event with the ID
    } else {
      res.status(404).json("The provided ID does not match any documents")
    }
  })
  .catch((error) => res.status(500).json(error.message))
})


module.exports = router
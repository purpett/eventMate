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


module.exports = router
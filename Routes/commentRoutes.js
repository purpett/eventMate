const express = require('express')

const Event = require('../models/event')
const { Comment } = require('../models/comment')

const router = express.Router()

/*
Action: CREATE
Method: Post
URI: /api/events/:id/comment
Description: Create a new Comment
*/

router.post('/api/events/:id/comments', (req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      const comment = req.body
      event.comments.push(comment);
      event.save()
        .then((event) => {
          res.status(201).json(event)
        })
    })
})

module.exports = router
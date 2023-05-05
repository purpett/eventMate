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

/*
Action: DESTROY
Method: Delete
URI: /api/comment/e585b9q283u49
Description: Delete an Comment by its Comment ID
 */

/*
Action: UPDATE
Method: Put/Patch
URI: /api/comment/e585b9q283u49
Description: Update an Comment by its ID
*/

module.exports = router
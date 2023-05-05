const express = require('express')

const Event = require('../models/event')


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






// event.comments.push(comment)
// event.save()

/*
Action: DESTROY
Method: Delete
URI: /api/events/:id/comments/:id
Description: Delete an Comment by its Comment ID
 */

router.delete('/api/events/:id/comments/:commentId', (req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            const commentId = req.params.commentId
            event.comments.id(commentId).deleteOne();
            event.save()
                .then((event) => {
                    res.status(201).json(event)
                })
        })
})





module.exports = router
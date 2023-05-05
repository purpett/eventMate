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
            // https://mongoosejs.com/docs/subdocs.html#removing-subdocs
            event.comments.id(commentId).deleteOne();
            event.save()
                .then((event) => {
                    res.status(201).json(event)
                })
        })
})

/*
Action: UPDATE
Method: Put/Patch
URI: /api/comment/e585b9q283u49
Description: Update an Comment by its ID
*/

router.put('/api/events/:id/comments/:commentId', (req, res) => {
    Event.findById(req.params.id)
        .then((event) => {
            const commentId = req.params.commentId

            // https://mongoosejs.com/docs/subdocs.html#removing-subdocs
            const comment = event.comments.id(req.params.commentId)
            console.log(comment);
            comment.text = req.body.text;
            event.save()
                .then((event) => {
                    res.status(201).json(event)
                })
        })
})

module.exports = router
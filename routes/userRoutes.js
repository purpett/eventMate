const express = require('express')

const router = express.Router()

const User = require('../models/user')

/* 
Action: SHOW
Method: Get
URI: /api/users/
Description: Get a User by User ID
*/

router.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json({ user: user })
            } else {
                res.status(404).json('Provided id does not match any documents')
            }
        })
        .catch(error => res.status(500).json(error.message))
})

module.exports = router
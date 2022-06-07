const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.status(500).json({
      message: "error retrieving users"
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
   
      res.json(user)
    }
  )
  .catch(err => {
    res.json({
      message: 'error retrieving user',
      err: err.stack

    })
  })
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res) => {
  
    Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: 'error creating user'
      })
    })
  
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Users.update(req.params.id, req.body)
  .then(newUser => {
    res.json(newUser)
  })
  .catch(err => {
    res.status(500).json({
      message: 'error making new user'
    })
  })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    
    Users.remove(req.params.id)
    .then(deletedUser => {
      res.json(user)
    })
  }
  )
 
  .catch(err => {
    res.status(500).json({
      message: 'error deleting user'
    })
  })
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.json(posts)
  })
  .catch(err => {
    res.status(500).json({
      message: 'error retrieving posts'
    })
  })
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const result = Posts.insert({
    user_id: req.params.id,
    text: req.body.text
  })
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({
      message: 'error making post'
    })
  })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router
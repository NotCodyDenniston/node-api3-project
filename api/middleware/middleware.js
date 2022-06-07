const User = require('../users/users-model')
const Post = require('../posts/posts-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
  [${new Date().toISOString()}] ${req.method} to ${req.url} `)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  User.getById(req.params.id)
  .then(user => {
    if(!user) {
      res.status(404).json({
        message: "user not found"
      })
    } else {
      req.user = user
      next()
    }
  }) .catch(err => {
    res.status(500).json({
      message: 'problem finding user'
  })
})
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body
  if(!name) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {

    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body
  if(!text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {

    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validatePost,
  validateUser
}

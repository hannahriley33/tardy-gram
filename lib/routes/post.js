const { Router } = require('express');
const User = require('../models/User');
const Post = require('../models/Post')
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post
      .create({ ...req.body, user: req.user._id })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Post
      .findById(req.params.id)
      .populate('user')
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  });
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photoUrl: {
    type: String
  },
  caption: {
    type: String
  },
  tags: [{
    type: String
  }]
});

module.exports = mongoose.model('Post', schema);

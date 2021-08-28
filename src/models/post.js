const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  attach: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Post', PostSchema);
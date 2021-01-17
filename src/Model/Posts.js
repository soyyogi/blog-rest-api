const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  authorName: {
    type: String,
    required: true
  },
  authorEmail: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  modifiedAt: {
    type: String
  }
})

const Post = new mongoose.model('Post', PostSchema);

module.exports = Post;
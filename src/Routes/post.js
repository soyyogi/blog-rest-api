const express = require('express');
const route = new express.Router();
const Post = require('../Model/Posts');
const Auth = require('../middleware/Auth');


route.post('/posts', Auth, async (req,res) => {
  try {
    const posts = await  Post.find();
    res.render('home', {posts})
    // res.send(req.user.posts)
  } catch (error) {
    res.status(500).send(error)
  }
})

route.get('/post/create', (req, res) => {
  res.render('create-post');
})

route.post('/post/create', Auth, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.user._id,
    authorName: req.user.name,
    authorEmail: req.user.email,
    createdAt: new Date().toDateString()
  })
  await post.save();
  const posts = await  Post.find();
  res.render('home', {posts})
})

route.post('/post/delete', Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    const isValid = post.author.toString() == req.user._id.toString();
    if (!isValid) {
      const posts = await  Post.find();
      return res.status(400).render('error-home', { Error: 'You are not the author', posts });
    }
    await post.remove();
    const posts = await  Post.find();
    res.render('home', {posts})
  } catch (error) {
    const posts = await  Post.find();
    res.status(500).render('error-home', { Error: error.message, posts });
  }
})

route.post('/post/edit', Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    const isValid = post.author.toString() == req.user._id.toString();
    if (!isValid) {
      const posts = await  Post.find();
      return res.status(400).render('error-home', { Error: 'You are not the author', posts });
    }
    res.render('edit-post', {post});
  } catch (error) {
    const posts = await  Post.find();
    res.status(500).render('error-home', { Error: error.message, posts });
  }
})

route.post('/post-edit', Auth, async (req, res) => {
  const post = await Post.findById(req.body.id);
  post.title = req.body.title;
  post.body = req.body.body;
  post.modifiedAt = new Date().toDateString()
  await post.save();
  const posts = await  Post.find();
  res.render('home', {posts})
})

module.exports = route;
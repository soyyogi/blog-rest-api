const express = require('express');
const route = new express.Router();
const Post = require('../Model/Posts');

route.post('/post', async (req, res) => {
  const post = new Post(req.body);

  try {
    await post.save();
    res.send(post);
  }

  catch(err) {
    res.status(400).send({error: err});
  }
})

route.get('/post', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts)
  } catch (error) {
    res.status(500).send({Error: error})
  }
})



module.exports = route;
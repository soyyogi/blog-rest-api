const express = require('express');
const route = new express.Router();
const Post = require('../Model/Posts');


route.post('/post', async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.send(post);
  } catch(Error) {
    res.status(400).send({Error: error});
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

route.delete('/post/:id', async function(req,res) {
  try {
    const deletedPost = await Post.findById(req.params.id);
     await deletedPost.remove();
    res.send(deletedPost);
  } catch (error) {
    res.status(400).send({Error: error});
  }
})



module.exports = route;
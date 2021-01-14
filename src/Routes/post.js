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

route.patch('/post/:id', async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'body']

  const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

  if(!isValidUpdate) {
    return res.status(400).send({error: 'Invalid Updates'})
  }

  try {
    const post = await Post.findById(_id)
    updates.forEach(update => post[update] = req.body[update])
    await post.save()

    if(!post) {
      return res.status(404).send()
    }

    res.send(post)
  } catch (error) {
    res.status(400).send(error)
  }
})



module.exports = route;
const express = require('express');
const route = new express.Router();
const Post = require('../Model/Posts');
const auth = require('../middleware/Auth');


route.post('/post', auth, async (req, res) => {
  const post = new Post(req.body);
  post.author = req.user._id;
  try {
    await post.save();
    res.send(post);
  } catch(Error) {
    res.status(400).send({Error: error});
  }
})

route.get('/post', auth, async (req, res) => {
  try {
    await req.user.populate('posts').execPopulate()
    res.send(req.user.posts)
  } catch (error) {
    res.status(500).send(error)
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
const express = require('express');
const route = new express.Router;
const Post = require('../Model/Posts');

route.post('/post', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  })

  try {
    await post.save();
    res.send(post);
  }

  catch(err) {
    res.status(400).send({error: err});
  }
})



module.export = route;
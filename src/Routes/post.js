const express = require('express');
const route = new express.Router();
const Post = require('../Model/Posts');



route.get('/posts', async (req,res) => {
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

route.post('/post/create', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  })
  await post.save();
  res.redirect('/posts');
})

route.post('/post/delete', async (req, res) => {
  await Post.deleteOne({_id: req.body.id});
  res.redirect('/posts');
})

route.post('/post/edit', async (req, res) => {
  const post = await Post.findById(req.body.id);
  res.render('edit-post', {post});
})

route.post('/post-edit', async (req, res) => {
  const post = await Post.findById(req.body.id);
  post.title = req.body.title;
  post.body = req.body.body;
  await post.save();
  res.redirect('/posts');
})

// route.post('/post', async (req, res) => {
//   const post = new Post(req.body);
//   post.author = req.user._id;
//   post.authorName = req.user.name;
//   post.authorEmail = req.user.email;
//   try {
//     await post.save();
//     res.send(post);
//   } catch (Error) {
//     res.status(400).send({ Error: error });
//   }
// })


// route.get('/post', async (req, res) => {
//   try {
//     await req.user.populate('posts').execPopulate()
//     res.render('home', {posts: req.user.posts})
//     // res.send(req.user.posts)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

// route.post('/post/delete/:id', async function (req, res) {
//   try {
//     const post = await Post.findById(req.params.id);
//     console.log(req.params.id);
//     // const isValid = post.author.toString() == req.user._id.toString();
//     // if (!isValid) {
//     //   return res.status(400).send({ Error: 'You are not the author' })
//     // }
//     await post.remove();
//     res.redirect('/posts');
//   } catch (error) {
//     res.status(500).send();
//   }
// })

// route.patch('/post/:id', async (req, res) => {
//   const _id = req.params.id
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['title', 'body']

//   const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

//   if (!isValidUpdate) {
//     return res.status(400).send({ error: 'Invalid Updates' })
//   }

//   try {
//     const post = await Post.findById(req.params.id);
//     const isValid = post.author.toString() == req.user._id.toString();
//     if (!isValid) {
//       return res.status(400).send({ Error: 'You are not the author' })
//     }
//     updates.forEach(update => post[update] = req.body[update])
//     await post.save()

//     if (!post) {
//       return res.status(404).send()
//     }

//     res.send(post)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })



module.exports = route;
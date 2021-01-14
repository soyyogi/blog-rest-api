const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const PostRouter = require('./Routes/post');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
// app.use('engine-views', 'ejs');
app.use(PostRouter);


mongoose.connect('mongodb://localhost:27017/blogApi');

app.listen( port, () => console.log('Server up and running on port 3000'));
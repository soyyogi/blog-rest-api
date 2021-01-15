const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const PostRouter = require('./Routes/post');
const UserRouter = require('./Routes/user');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static('public'));
app.set('view engine', '.ejs');
app.use(express.json());
app.use(PostRouter);
app.use(UserRouter);


mongoose.connect('mongodb://localhost:27017/blogApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.listen( port, () => console.log('Server up and running on port 3000'));
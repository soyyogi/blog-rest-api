const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const port = 3000 || process.env.PORT

const app = express();

// app.use('engine-views', 'ejs');
app.use(express.static('public'));

const mongoConnect = mongoose.createConnection('mongodb://localhost:27017/blogApi');

app.listen( port, () => console.log('Server up and running on port 3000'));
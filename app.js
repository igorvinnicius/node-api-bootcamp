const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

mongoose.connect(
    'mongodb+srv://igorvinnicius:pQiL9RFokLyzjqAD@cluster0.uyf4p.mongodb.net/node-bootcamp?retryWrites=true&w=majority'
).then(result => {
    app.listen(8080);
})
.catch(err => console.log(err));


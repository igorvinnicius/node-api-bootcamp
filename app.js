const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString + '-' + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    
    if(
        file.mimeType === 'image/png' ||
        file.mimeType === 'image/jpg' ||
        file.mimeType === 'image/jpeg'
    ) {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
}

app.use(bodyParser.json());
app.use(
    multer(
        {
            storage: fileStorage, 
            fileFilter: fileFilter
        })
        .single('image')
    );
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) =>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message : message })
});

mongoose.connect(
    ''
).then(result => {
    app.listen(8080);
})
.catch(err => console.log(err));


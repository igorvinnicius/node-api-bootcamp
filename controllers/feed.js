const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                title: "First Post", 
                content: "This is the first post!",
                imageUrl: 'images/duck.jpg'
            }
        ]
    });
};

exports.createPost = (req, res, next) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(422).json({message: 'Validation failed!', errors: errors.array()});
    }

    const title = req.body.title;
    const content = req.body.content;

    const post = new Post({
        title: title, 
        content: content,
        imageUrl: 'images/image.jpg',
        creator: {
            name: 'Luke'
        }
    });
    
    post.save()
    .then(result => {
        
        console.log(result)

        res.status(201).json({
            message: "Post created successfully!",
            post: result
        });
    })
    .catch(err => {
        console.log(err)
    });    
};
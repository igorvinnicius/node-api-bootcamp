const { validationResult } = require('express-validator/check');

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

    console.log(title, content);

    res.status(201).json({
        message: "Post created successfully!",
        post: {id: 1, title: title, content: content}
    });
};
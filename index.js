const express = require('express');
const data = require('./data/db');
const server = express();

server.use(express.json());

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await data.find(req.query);
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({
            errorMessage: 'Server error while retrieving the posts'
        });
    }
});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await data.findById(id);
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'Post not found'
            });
        }
    } catch(error) {
        res.status(500).json({
            errorMessage: 'Server error while retrieving the post'
        });
    }
});

server.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await data.findById(id);
        if(post.length !== 0) {
            const messages = await data.findPostComments(id);
            res.status(200).json(messages);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            });
        }
    } catch(error) {
        res.status(500).json({
            errorMessage: 'The comments information could not be retrieved.'
        });
    }
});

server.post('/api/posts', async (req, res) => {
    try {
        const newPost = req.body;
        const post = await data.insert(newPost);

        if(post.title !== '' || post.contents !== '') {
            res.status(201).json(post);
        } else {
            res.status(400).json({
                message: 'Title or content is missing'
            });
        }
    } catch {
        res.status(500).json({
            errorMessage: 'Server error while creating the post'
        });
    }
});

server.listen(4000, () => {
    console.log('** Server listening on port 4K **');
});
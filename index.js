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
            errorMessage: 'Server error retrieving the posts'
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
            })
        }
    } catch(error) {
        res.status(500).json({
            errorMessage: 'Server error retrieving the post'
        })
    }
});

server.listen(4000, () => {
    console.log('** Server listening on port 4K **');
});
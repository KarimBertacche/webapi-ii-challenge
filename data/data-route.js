const express = require('express');
const data = require('./db');

const route = express.Router();

route.get('/api/posts', async (req, res) => {
    try {
        const posts = await data.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({
            errorMessage: 'Server error while retrieving the posts'
        });
    }
});

route.get('/api/posts/:id', async (req, res) => {
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

route.get('/api/posts/:id/comments', async (req, res) => {
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

route.post('/api/posts', async (req, res) => {
    try {
        const newPost = req.body;

        if(newPost.title === '') {
            res.status(400).json({
                message: 'Title is missing'
            });
        } else if(newPost.contents === undefined || newPost.contents === '') {
            res.status(400).json({
                message: 'Content is missing'
            });
        } else {
            const post = await data.insert(newPost);           
            res.status(201).json(post);
        }
    } catch {
        res.status(500).json({
            errorMessage: 'Server error while creating the post'
        });
    }
});

route.post('/api/posts/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await data.findById(id);

        if(post.length === 0) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        } else {
            const newComment = { ...req.body, post_id: id };
            if(newComment.text === '') {
                res.status(400).json({
                    message: 'Text is missing'
                });
            } else {
                const comment = await data.insertComment(newComment);
                res.status(201).json(comment);
            }
        }
    } catch(error) {
        res.status(500).json({
            errorMessage: 'Server error while creating comment'
        })
    }
});

route.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await data.remove(id);
        if(deleted > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({
                message: 'Post not found'
            });
        }         
    } catch(error) {
        res.status(500).json({
            errorMessage: 'Server error while deleting post'
        })
    }
});

route.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;

        if (changes.contents === undefined || changes.contents === '') {
            res.status(400).json({
                message: 'Please provide contents for the post.'
            });
        } else if (changes.title === undefined || changes.title === '') {
            res.status(400).json({
                message: 'Please provide both title and contents for the post.'
            });
        } else {
            const updatedPost = await data.update(id, changes);
            if(updatedPost) {
                res.status(200).json(updatedPost);
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                });
            }
        }

    } catch(error) {
        res.status(500).json({
            errorMessage: 'Server error while updating post'
        });
    }
});

module.exports = route;
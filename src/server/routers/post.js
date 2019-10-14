const express = require('express');
const uuid = require('uuid');
const { Post } = require('../db/sequelize');
const auth = require('../middleware/auth');

const router = express.Router();

// Create new post
router.post('/posts/create', auth, async (req, res) => {
    try {
        const post = await Post.create({
            id: uuid(),
            title: req.body.title,
            body: req.body.postBody,
            userId: req.user.id
        })
        res.status(201).send(post)
    } catch (error) {
        res.status(400).send({ error: 'Could not save your post.' })
    }
});

// Get all posts by userId
router.get('/posts/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(req.params)
    try {
        const posts = await Post.findAll({
            where: { userId }
        })
        res.status(201).send(posts)
    } catch (error) {
        res.status(404).send({ error: 'No posts found.' })
    }
});

module.exports = router;
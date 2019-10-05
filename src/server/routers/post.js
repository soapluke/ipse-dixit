const express = require('express');
const uuid = require('uuid');
const Post = require('../db/sequelize');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/posts/create', auth, async (req, res) => {
    try {
        const post = await Post.create({
            id: uuid(),
            title: req.body.username,
            body: req.body.email,
            userId: req.user.id
        })
        res.status(201).send(post)
    } catch (error) {
        res.status(400).send()
    }
});

module.exports = router;
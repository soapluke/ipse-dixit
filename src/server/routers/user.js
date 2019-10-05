const express = require('express');
const uuid = require('uuid');
const User = require('../db/sequelize');
const auth = require('../middleware/auth')

const router = express.Router()

// Create user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create({
            id: uuid(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send()
    }
});

// Login user
router.post('/users/login', async (req, res) => {
    try {
        await User.findByCredentials(req.body.username, req.body.password);
        const token = await User.generateAuthToken(req.body.username);
        res.status(201).send({msg: 'Logged in successfully!', token })
    } catch (error) {
        res.status(400).send()
    }
});

// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        
        await req.user.update({
            token: null
        })

        await req.user.save()
        res.send({ msg: 'Logged out successfully!'})
    } catch (error) {
        res.status(500).send()
    }
});

// Delete user by id
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({
            where: { id }
        });
        user.destroy();
        res.status(201).send(`User with id ${id} has been deleted.`);
    } catch (error) {
        res.status(404).send();
    }
});

module.exports = router;
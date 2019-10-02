const express = require('express');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../db/sequelize');
const { jwtOptions } = require('../middleware/auth')

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
        res.status(400).send(error)
    }
});

router.post('/users/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(201).send({msg: 'Logged in successfully!', user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

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
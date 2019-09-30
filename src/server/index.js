const express = require('express');
const bodyParser = require('body-parser')

const { User } = require('./db/sequelize.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

app.get('/test', (req, res) => {
    res.send('Hello world')
})

app.post('/users', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }

})
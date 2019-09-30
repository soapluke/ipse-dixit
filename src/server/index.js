const express = require('express');
require('./db/index.js');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

app.get('/test', (req, res) => {
    res.send('Hello world')
})

const express = require('express');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

app.get('/test', (req, res) => {
    res.send('Hello world')
})
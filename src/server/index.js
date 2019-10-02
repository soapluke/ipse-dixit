const express = require('express');
const passport = require('passport');
const userRouter = require('./routers/user');
const { strategy } = require('./middleware/auth')

passport.use(strategy);

const app = express();
const port = process.env.PORT || 5000;

app.use(passport.initialize());
app.use(express.json());
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

app.get('/test', (req, res) => {
    res.send('Hello world')
})
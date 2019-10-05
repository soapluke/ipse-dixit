const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(postRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
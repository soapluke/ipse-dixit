const Sequelize = require('sequelize');

const UserModel = require('./models/user');
const PostModel = require('./models/post');

const sequelize = new Sequelize(process.env.DB_PATH);

sequelize.authenticate().then(() => {
  console.log('DB connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => { 
    console.log(`Database & tables created here!`)
});

module.exports = {
  User,
  Post
};

const Sequelize = require('sequelize');

const UserModel = require('./models/user');

const path = 'mysql://root:root@localhost:8889/ipse-dixit';
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
  console.log('DB connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})/* .finally(() => {
  sequelize.close();
}); */

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => { 
    console.log(`Database & tables created here!`)
})

module.exports = User;

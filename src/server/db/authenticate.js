const Sequelize = require('sequelize');

const path = 'mysql://root:root@localhost:8889/ipse-dixit';
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
  console.log('DB connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});
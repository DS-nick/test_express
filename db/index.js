const { Sequelize } = require('sequelize');
const path = require('path')


const sequelize = new Sequelize({
  username: 'root',
  password: 'root',
  storage: 'test.sqlite',
  host: 'localhost',
  dialect: 'sqlite',
  logging: console.log
})

const User = require('../models/user')(sequelize);
const Image = require('../models/image')(sequelize);
User.hasMany(Image);
Image.belongsTo(User);
sequelize.sync({alter: true})



//  sequelize.sync({ force: true}).then(()=> {
//   console.log("All models were synchronized successfully.");
// })



module.exports = {
  sequelize,
  user: User,
  image: Image
}
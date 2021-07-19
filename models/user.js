const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require('../db')


module.exports = function(sequelize) {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
     
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user'
  })
  return User;
};

const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require('../db')


module.exports = function(sequelize) {
  const Image = sequelize.define('image', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
     
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'image'
  })
  
  return Image;
};



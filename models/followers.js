'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followers extends Model {
    static associate(models) {
      
    }
  }
  followers.init({
    follower_id: DataTypes.INTEGER,
    following_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'followers',
  });
  return followers;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class repost extends Model {
    static associate(models) {
      repost.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      repost.belongsTo(models.posts, {
        foreignKey: "post_id",
      });
    }
  }
  repost.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'repost',
  });
  return repost;
};
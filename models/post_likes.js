'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_likes extends Model {
    static associate(models) {
      post_likes.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      post_likes.belongsTo(models.posts, {
        foreignKey: "post_id",
      });
    }
  }
  post_likes.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post_likes',
  });
  return post_likes;
};
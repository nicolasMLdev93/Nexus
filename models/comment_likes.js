'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment_likes extends Model {
    static associate(models) {
       comment_likes.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      comment_likes.belongsTo(models.posts, {
        foreignKey: "post_id",
      });
    }
  }
  comment_likes.init({
    comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment_likes',
  });
  return comment_likes;
};
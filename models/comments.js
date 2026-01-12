'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    static associate(models) {
      comments.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      comments.hasMany(models.comment_likes, {
        foreignKey: "comment_id",
      });
    }
  }
  comments.init({
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    likes_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};
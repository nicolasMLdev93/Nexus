"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      posts.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      posts.hasMany(models.post_likes, {
        foreignKey: "post_id",
      });
    }
  }
  posts.init(
    {
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      likes_count: DataTypes.INTEGER,
      isPublic: DataTypes.BOOLEAN,
      rePost_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return posts;
};

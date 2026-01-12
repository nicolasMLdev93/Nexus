"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.posts, {
        foreignKey: "user_id",
      });
      users.hasMany(models.post_likes, {
        foreignKey: "user_id",
      });
      users.hasMany(models.comments, {
        foreignKey: "user_id",
      });
      users.hasMany(models.comment_likes, {
        foreignKey: "user_id",
      });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};

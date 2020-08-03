"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {}
  );
  user.associate = function (models) {
    user.hasMany(models.post);
    user.hasMany(models.comment);
  };
  return user;
};

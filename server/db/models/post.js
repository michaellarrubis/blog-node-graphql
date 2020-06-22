'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    published: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    post.hasMany(models.comment)
    post.belongsTo(models.user, { foreignKey: 'userId' })
  };
  return post;
};
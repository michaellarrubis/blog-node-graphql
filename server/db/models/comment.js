'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.user, { foreignKey: 'userId' })
    comment.belongsTo(models.post, { foreignKey: 'postId' })
  };
  return comment;
};
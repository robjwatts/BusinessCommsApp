'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define('Blog', {
    userId: DataTypes.STRING,
    blogTitle: DataTypes.STRING,
    blogText: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    likedBy: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Blog;
};
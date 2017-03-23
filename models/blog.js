'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define('Blog', {
    userId: DataTypes.STRING,
    blogTitle: DataTypes.STRING,
    blogText: DataTypes.TEXT,
    tags: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Blog;
};
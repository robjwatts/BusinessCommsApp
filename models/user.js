'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    accessToken: DataTypes.TEXT,
    refreshToken: DataTypes.TEXT,
    googleId: DataTypes.TEXT,
    companyToken: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
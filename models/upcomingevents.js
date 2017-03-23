'use strict';
module.exports = function(sequelize, DataTypes) {
  var UpcomingEvents = sequelize.define('UpcomingEvents', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    timeRange: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UpcomingEvents;
};
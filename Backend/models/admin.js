'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Admin extends Model {}

  Admin.init({
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admin',
    timestamps: false
  });

  return Admin;
};

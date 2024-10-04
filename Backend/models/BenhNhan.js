'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class BenhNhan extends Model {
    static associate(models) {
      BenhNhan.belongsTo(models.Allcode, { foreignKey: 'gioiTinh', targetKey: 'keyMap', as: 'genderDataPatient' });
      BenhNhan.hasMany(models.LichDat, { foreignKey: 'IDBenhNhan', as: 'lichdat' });
    }
  }

  BenhNhan.init({
    IDBenhNhan: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false,
      autoIncrement: true,
    },
    hoten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    namSinh: {
      type: DataTypes.INTEGER
    },
    diaChi: {
      type: DataTypes.STRING
    },
    SDT: {
      type: DataTypes.CHAR(10)
    },
    gioiTinh: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SoLanHuy: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'BenhNhan',
    tableName: 'BenhNhan',
    timestamps: false
  });

  return BenhNhan;
};

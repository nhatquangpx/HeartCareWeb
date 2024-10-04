'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class BacSi extends Model {
    static associate(models) {
      BacSi.belongsToMany(models.Khoa, {
        through: models.BacsiKhoa,
        foreignKey: 'IDBacSi',
        otherKey: 'IDKhoa',
        as: 'khoa'
      });
      BacSi.hasMany(models.BacsiKhoa, { foreignKey: 'IDBacSi', as: 'bacsi_khoa' });
      BacSi.hasMany(models.MarkDown, { foreignKey: 'IDBacSi' });
      BacSi.belongsTo(models.Allcode, { foreignKey: 'gioiTinh', targetKey: 'keyMap', as: 'genderData' });
      BacSi.hasMany(models.LichLamViec, { foreignKey: 'IDBacSi', as: 'lichlamviec' });
      BacSi.hasMany(models.LichDat, { foreignKey: 'IDBacSi', as: 'lichdat' });
    }
  }

  BacSi.init({
    IDBacSi: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    hoten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    namSinh: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SDT: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    gioiTinh: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    HocVan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Sonamcongtac: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MoTa: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BacSi',
    tableName: 'BacSi',
    timestamps: false
  });

  return BacSi;
};

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Khoa extends Model {
    static associate(models) {
      Khoa.belongsToMany(models.BacSi, {
        through: models.BacsiKhoa,
        foreignKey: 'IDKhoa',
        otherKey: 'IDBacSi',
        as: 'bacsis'
      });
      Khoa.hasMany(models.DichVu, { foreignKey: 'IDKhoa', as: 'dichvu' });
      Khoa.hasMany(models.LichLamViec, { foreignKey: 'IDKhoa', as: 'lichlamviec' });
    }
  }

  Khoa.init({
    IDKhoa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    TenKhoa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MoTa: {
      type: DataTypes.TEXT
    },
    SoLuongBacSi: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Khoa',
    tableName: 'Khoa',
    timestamps: false
  });

  return Khoa;
};

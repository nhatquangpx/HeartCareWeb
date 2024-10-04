'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class LichLamViec extends Model {
    static associate(models) {
      LichLamViec.belongsTo(models.BacSi, { foreignKey: 'IDBacSi', as: 'bacsi' });
      LichLamViec.belongsTo(models.Khoa, { foreignKey: 'IDKhoa', as: 'khoa' });
      LichLamViec.belongsTo(models.CaKham, { foreignKey: 'IDCa', as: 'cakham' });
    }
  }

  LichLamViec.init({
    IDLich: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    IDBacSi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IDKhoa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IDCa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Thu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2,
        max: 7
      }
    }
  }, {
    sequelize,
    modelName: 'LichLamViec',
    tableName: 'LichLamViec',
    timestamps: false
  });

  return LichLamViec;
};

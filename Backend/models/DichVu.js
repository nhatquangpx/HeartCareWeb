'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DichVu extends Model {
    static associate(models) {
      DichVu.belongsTo(models.Khoa, { foreignKey: 'IDKhoa', as: 'khoa' });
      DichVu.hasMany(models.LichDat, { foreignKey: 'IDDichVu', as: 'lichdat' });
    }
  }

  DichVu.init({
    IDDichVu: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    IDKhoa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TenDichVu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    GiaKham: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DichVu',
    tableName: 'DichVu',
    timestamps: false
  });

  return DichVu;
};

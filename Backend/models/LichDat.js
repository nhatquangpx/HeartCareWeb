'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class LichDat extends Model {
    static associate(models) {
      LichDat.belongsTo(models.Allcode, { foreignKey: 'IDCa', targetKey: 'keyMap', as: 'timeTypeDataPatient' });
      LichDat.belongsTo(models.CaKham, { foreignKey: 'IDCa', as: 'cakham' });
      LichDat.belongsTo(models.BenhNhan, { foreignKey: 'IDBenhNhan', as: 'benhnhan' });
      LichDat.belongsTo(models.BacSi, { foreignKey: 'IDBacSi', as: 'bacsi' });
      LichDat.belongsTo(models.DichVu, { foreignKey: 'IDDichVu', as: 'dichvu' });
    }
  }

  LichDat.init({
    IDLich: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    IDCa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IDBenhNhan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IDBacSi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IDDichVu: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ThuDatLich: {
      type: DataTypes.INTEGER
    },
    NgayDatLich: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    TrangThai: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[0, 1]]
      }
    },
    TinhTrangThanhToan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]]
      }
    }
  }, {
    sequelize,
    modelName: 'LichDat',
    tableName: 'LichDat',
    timestamps: false
  });

  return LichDat;
};

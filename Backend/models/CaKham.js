'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CaKham extends Model {
    static associate(models) {
      CaKham.belongsTo(models.Allcode, { foreignKey: 'KhungGio', targetKey: 'keyMap', as: 'timeTypeData' });
      CaKham.hasMany(models.LichLamViec, { foreignKey: 'IDCa', as: 'lichlamviec' });
      CaKham.hasMany(models.LichDat, { foreignKey: 'IDCa', as: 'lichdat' });
    }
  }

  CaKham.init({
    IDCa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    KhungGio: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'CaKham',
    tableName: 'CaKham',
    timestamps: false
  });

  return CaKham;
};

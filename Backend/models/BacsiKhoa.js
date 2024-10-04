'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class BacsiKhoa extends Model {
    static associate(models) {
      BacsiKhoa.belongsTo(models.BacSi, { foreignKey: 'IDBacSi', as: 'bacsi' });
      BacsiKhoa.belongsTo(models.Khoa, { foreignKey: 'IDKhoa', as: 'khoa' });
    }
  }

  BacsiKhoa.init({
    IDBacSi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IDKhoa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ChucVu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[ 'Trưởng khoa', 'Phó Khoa', 'Bác sĩ', 'Thực tập sinh' ]]
      }
    }
  }, {
    sequelize,
    modelName: 'BacsiKhoa',
    tableName: 'BacsiKhoa',
    timestamps: false
  });

  return BacsiKhoa;
};

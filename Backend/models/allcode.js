'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Allcode extends Model {
        static associate(models) {
            // Define associations here
            Allcode.hasMany(models.BacSi, { foreignKey: 'gioiTinh', targetKey: 'keyMap', as: 'genderData' });
            Allcode.hasMany(models.BenhNhan, { foreignKey: 'gioiTinh', targetKey: 'keyMap', as: 'genderDataPatient' });
            Allcode.hasMany(models.CaKham, { foreignKey: 'KhungGio', targetKey: 'keyMap', as: 'timeTypeData' });
            Allcode.hasMany(models.LichDat, { foreignKey: 'IDCa', targetKey: 'keyMap', as: 'timeTypeDataPatient' });
        }
    }

    Allcode.init(
        {
            keyMap: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            valueEn: {
                type: DataTypes.STRING,
                allowNull: false
            },
            valueVi: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Allcode',
            tableName: 'Allcode', // Tên của bảng trong cơ sở dữ liệu
            timestamps: false // Không sử dụng timestamps (created_at, updated_at)
        }
    );

    return Allcode;
};

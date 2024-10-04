'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class MarkDown extends Model {
        static associate(models) {
            MarkDown.belongsTo(models.BacSi, { foreignKey: 'IDBacSi' });
        }
    }

    MarkDown.init(
        {
            contentHTML: {
                type: DataTypes.TEXT('long'),
                allowNull: false
            },
            contentMarkDown: {
                type: DataTypes.TEXT('long'),
                allowNull: false
            },
            IDBacSi: {
                type: DataTypes.STRING, // Sử dụng STRING cho IDBacSi vì nó có dạng 'BS000001'
                allowNull: false,
                references: {
                    model: 'BacSi', // Tên của bảng mà foreign key đề cập đến
                    key: 'IDBacSi' // Tên cột chính trong bảng mà foreign key tham chiếu đến
                }
            },
            IDKhoa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDCa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'MarkDown',
            tableName: 'MarkDown', // Tên của bảng trong cơ sở dữ liệu
            timestamps: true, // Sử dụng timestamps (created_at, updated_at)
            updatedAt: 'updated_at', // Tên cột cho updatedAt
            createdAt: 'created_at' // Tên cột cho createdAt
        }
    );

    return MarkDown;
};

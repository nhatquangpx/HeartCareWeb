'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('MarkDowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            contentMarkDown: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            doctorId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            specialtyId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            clinicId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long'),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('MarkDowns');
    }
};
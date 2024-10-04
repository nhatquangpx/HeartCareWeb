const bcrypt = require('bcryptjs');
const db = require('../../models/index');
const salt = bcrypt.genSaltSync(10);

// Create a new user
let createUser = async (data) => {
    try {
        let hashedPasswordBcrypt = await hashUserPassword(data.password);
        await db.BenhNhan.create({
            hoten: data.hoten,
            username: data.username,
            password: hashedPasswordBcrypt,
            namSinh: data.namSinh,
            diaChi: data.diaChi,
            SDT: data.SDT,
            gioiTinh: data.gioiTinh === '1' ? 1 : 0,
            email: data.email,
            SoLanHuy: data.soLanHuy || 0,
        });
        console.log('User created successfully!');
    } catch (error) {
        console.log('Failed to create user:', error);
        throw error; // Propagate the error for handling in the controller
    }
};

// Retrieve all users
let getAllUser = async () => {
    try {
        let users = await db.BenhNhan.findAll({ raw: true });
        return users;
    } catch (error) {
        console.log('Failed to retrieve users:', error);
        throw error; // Propagate the error for handling in the controller
    }
};

// Delete a user by ID
let deleteUserById = async (id) => {
    try {
        await db.BenhNhan.destroy({ where: { IDBenhNhan: id } });
        console.log('User deleted successfully!');
    } catch (error) {
        console.log('Failed to delete user:', error);
        throw error; // Propagate the error for handling in the controller
    }
};

// Retrieve a user by ID
let getUserById = async (userId) => {
    try {
        let user = await db.BenhNhan.findOne({ where: { IDBenhNhan: userId }, raw: true });
        return user;
    } catch (error) {
        console.log('Failed to retrieve user:', error);
        throw error; // Propagate the error for handling in the controller
    }
};

// Update a user by ID
let updateUserById = async (id, data) => {
    try {
        await db.BenhNhan.update(data, { where: { IDBenhNhan: id } });
        console.log('User updated successfully!');
    } catch (error) {
        console.log('Failed to update user:', error);
        throw error; // Propagate the error for handling in the controller
    }
};


// Hash user password
let hashUserPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
};

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    deleteUserById,
    updateUserById
};

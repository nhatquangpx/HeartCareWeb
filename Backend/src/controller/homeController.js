const db = require('../../models/index');
const CrudService = require('../services/CrudService');

// Render homepage with all users
let getHomePage = async (req, res) => {
    try {
        let data = await db.BenhNhan.findAll();
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (error) {
        console.log('Error fetching homepage data:', error);
        return res.status(500).send('Internal Server Error');
    }
};

// Render 404 page
let notFound404 = (req, res) => {
    return res.render('404.ejs');
};

// Render CRUD page
let getCrud = (req, res) => {
    return res.render('crud.ejs');
};

// Handle create user form submission
let postCrud = async (req, res) => {
    try {
        await CrudService.createUser(req.body);
        return res.redirect('/user');
    } catch (error) {
        console.log('Failed to create user:', error);
        return res.status(500).send('Failed to create user');
    }
};

// Render all users
let getAllUsers = async (req, res) => {
    try {
        let data = await CrudService.getAllUser();
        return res.render('user/getUser.ejs', { data });
    } catch (error) {
        console.log('Failed to retrieve users:', error);
        return res.status(500).send('Failed to retrieve users');
    }
};

// Render edit user form
let getEditUser = async (req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            let data = await CrudService.getUserById(userId);
            return res.render('user/editUser.ejs', { data });
        } else {
            return res.send('User not found');
        }
    } catch (error) {
        console.log('Failed to retrieve user for editing:', error);
        return res.status(500).send('Failed to retrieve user for editing');
    }
};

// Handle update user form submission
let updateUser = async (req, res) => {
    try {
        let id = req.body.IDBenhNhan; // Sửa thành IDBenhNhan để khớp với tên trong form
        if (id) {
            await CrudService.updateUserById(id, req.body);
            console.log('User updated successfully');
        } else {
            return res.redirect('/404');
        }
        return res.redirect('/user');
    } catch (error) {
        console.log('Failed to update user:', error);
        return res.status(500).send('Failed to update user');
    }
};


// Handle delete user request
let deleteUser = async (req, res) => {
    try {
        let id = req.query.id;
        if (id) {
            await CrudService.deleteUserById(id);
            console.log('User deleted successfully');
        }
        return res.redirect('/user');
    } catch (error) {
        console.log('Failed to delete user:', error);
        return res.status(500).send('Failed to delete user');
    }
};

module.exports = {
    getHomePage,
    getCrud,
    postCrud,
    getAllUsers,
    getEditUser,
    updateUser,
    notFound404,
    deleteUser
};

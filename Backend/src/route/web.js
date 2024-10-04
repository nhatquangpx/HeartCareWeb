const express = require('express');
const homeController = require('../controller/homeController');

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCrud);
    router.get('/user', homeController.getAllUsers);
    router.get('/user-edit', homeController.getEditUser);
    router.post('/update-user', homeController.updateUser);
    router.get('/user-delete', homeController.deleteUser);
    router.get('/404', homeController.notFound404);

    return app.use('/', router);
}

module.exports = initWebRoute;

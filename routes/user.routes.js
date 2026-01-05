const express = require('express');
const {saveUserDetails,showUserDetails, updateUserDetails, deleteUserDetails} = require('../controllers/cropDoctor.controllers');
const upload = require('../config/image');

const routes = express.Router();

routes.post('/details/post',upload.single('image'),saveUserDetails);
routes.get('/details/get',showUserDetails);
routes.patch('/details/update/:id',updateUserDetails);
routes.delete('/details/delete/:id',deleteUserDetails);

module.exports = routes;

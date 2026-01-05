const express = require('express');
const {saveUserDetails,showUserDetails, updateUserDetails, deleteUserDetails, signinUserDetails} = require('../controllers/user.controllers');
const upload = require('../config/image');
const generateToken = require('../services/protect');

const routes = express.Router();

routes.post('/details/post',upload.single('image'),saveUserDetails);
routes.get('/details/get',showUserDetails);
routes.patch('/details/update/:id',updateUserDetails);
routes.delete('/details/delete/:id',deleteUserDetails);
routes.post('/details/signin',signinUserDetails);

module.exports = routes;

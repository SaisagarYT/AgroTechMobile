const express = require('express');
const { TextFromImageGenerator } = require('../controllers/diagnosis.controllers');
const upload = require('../config/image');
const route = express.Router();

route.post('/dignosis/analyse/:userId',upload.single('image'),TextFromImageGenerator);

module.exports = route;


const express = require('express');
const { TextFromImageGenerator, contentGeneration } = require('../controllers/diagnosis.controllers');
const upload = require('../config/image');
const route = express.Router();

route.post('/dignosis/analyse/:userId',upload.single('image'),TextFromImageGenerator);
route.post('/dignosis/text-gen/:userId',contentGeneration);
module.exports = route;


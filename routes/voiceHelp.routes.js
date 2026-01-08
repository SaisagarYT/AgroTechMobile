const express = require('express');
const generateTextFromVoice = require('../controllers/voiceHelp.controllers');
const upload = require('../config/image');
const route = express.Router();

route.post('/voice/query',upload.single('audio'),generateTextFromVoice);

module.exports = route;
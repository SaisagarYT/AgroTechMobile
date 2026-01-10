const express = require('express');
const {generateTextFromVoice,displayAllVoiceQuery} = require('../controllers/voiceHelp.controllers');
const upload = require('../config/image');
const route = express.Router();

route.post('/voice/query',upload.single('audio'),generateTextFromVoice);
route.get('/voice/display/:userId',displayAllVoiceQuery);

module.exports = route;
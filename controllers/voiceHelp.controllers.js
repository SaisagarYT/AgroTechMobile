const { voiceToTextQuery } = require('../aiServices/gemini.services');
const VoiceQuery = require('../models/voiceHelp.models');

const generateTextFromVoice = async(req,res) =>{
    const {userId,language} = req.body;
    const audioFile = req.file;

    if(!audioFile){
        return res.status(400).json({
            success:false,
            error:"No audio file found"
        });
    }
    try{
        const response = await voiceToTextQuery(audioFile.originalname, userId);
        if(!response){
            return res.status(400).json({
                success:false,
                error:"Response was not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:response
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

module.exports = generateTextFromVoice;


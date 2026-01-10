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
        response.audioUrl = `${req.protocol}://${req.get("host")}/audio/${encodeURIComponent(audioFile.originalname)}`

        const voicehelp = new VoiceQuery({
            user:userId,
            audioUrl:response.audioUrl,
            userQuery:response.userQuery,
            response:response.response,
            intentDetected:response.intentDetected
        });
        await voicehelp.save();
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

const displayAllVoiceQuery = async(req,res) =>{
    const userId = req.params.userId;

    try{
        const voiceQueries = await VoiceQuery.find({user:userId});
        if(voiceQueries.length == 0){
            return res.status(400).json({
                success:false,
                error:"no quieres are found!"
            });
        }
        return res.status(200).json({
            success:true,
            message:voiceQueries
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

// const updateVoiceQueries = async() =>{
//     const queryId = req.params.userId;
//     const {}
//     if(!queryId) return res.status(400).json({
//         success:false,
//         error:"user id was not found"
//     });
//     try{
//         const voicequery = VoiceQuery.findOne({_id:queryId});
//         if(!voicequery){
//             return res.status(400).json({
//                 success:false,
//                 error:"Error in finding query"
//             });
//         }
        
//     }
//     catch(err){
//         return res.status(500).json({
//             success:false,
//             error:err.message
//         });
//     }
// }

module.exports = {generateTextFromVoice,displayAllVoiceQuery};


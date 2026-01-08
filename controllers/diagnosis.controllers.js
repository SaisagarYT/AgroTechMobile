const generateChat = require('../aiServices/deepseek.services');
const {generateText, imageToTextGeneration} = require('../aiServices/gemini.services');
const diagnosis = require('../models/diagnosis.models');
const fs = require('fs');
const path = require('path');

const contentGeneration = async(req,res) =>{
    const {prompt} = req.body;
    const userId = req.params.userId;
    if(!userId){
        return res.status(400).json({
            success:true,
            error:"user id not found"
        });
    }
    if(!prompt){
        return res.status(404).json({message:"Attribute not found!"});
    }
    const userInput = prompt;
    try{
        const response = await generateText(userInput,userId);
        if(!response){
            return res.status(400).json({message:"No response was found"});
        }
        const promptData = new diagnosis(response);
        await promptData.save();
        return res.status(200).json({
            success:true,
            message:response
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            Error:err.message
        });
    }
}

const TextFromImageGenerator = async(req,res) =>{
    const image = req.file;
    const userId = req.params.userId;
    if(!image){
        return res.status(404).json({message:"No image found"});
    }
    const imageBuffer = fs.readFileSync(image.path);

    const response = await imageToTextGeneration(imageBuffer,image.mimetype,userId);
    try{
        if(!response){
            return res.status(400).json({message:"No response was found!"});
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/assets/${image.filename}`;
        response.imageUrl = imageUrl;
        const cropData = new diagnosis(response);
        await cropData.save();
        return res.status(200).json({message:response._id})
    }
    catch(err){
        return res.status(500).json({ERROR:err.message}); 
    }
}

const chatwithDeepseek = async(req,res) =>{
    try{
        const response = await generateChat();
        if(!response){
            return res.status(400).json({
                success:false,
                error:"No data was found"
            })
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

module.exports = {contentGeneration,TextFromImageGenerator,chatwithDeepseek};

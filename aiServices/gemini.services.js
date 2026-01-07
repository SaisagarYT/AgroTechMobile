const { GoogleGenAI} = require("@google/genai");
const { text } = require("express");
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function generateText(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text.toString();
}

async function imageToTextGeneration(imageBuffer,mimeType,userId){
console.log("image details: ",imageBuffer,"mimetype:",mimeType);
  const contents = 
    {
      inlineData:{
          data:imageBuffer.toString("base64"),
            mimeType:mimeType
      }
    }
    console.log(userId);
  const prompt = `You are an agricultural scientist.

Return ONLY valid JSON.
No explanations.
No markdown.

Schema:
{
  "user": "${userId}",
  "cropName": "string",
  "imageUrl": "",
  "symptomsText": "string",
  "detectedDisease": "string",
  "severity": "LOW | MEDIUM | HIGH",
  "aiConfidence": number,
  "treatmentSummary": "string",
  "sourceReference": "string"
}
`;
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        response_mime_type:"application/json",
        contents:{
            parts:[
                {
                    text:prompt
                }, 
                contents
            ]
        },
        
    })
    console.log(response.text.toString());
    return JSON.parse(response.text);

}

module.exports = {generateText,imageToTextGeneration};

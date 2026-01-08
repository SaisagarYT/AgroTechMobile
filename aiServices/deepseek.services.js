const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    baseURL:'https://api.deepseek.com',
    apiKey:process.env.DEEPSEEK_API_KEY
});

async function generateChat() {
    const completion = await openai.chat.completions.create({
        messages:[
            {
                role:"system",
                content: "You are a helpful assistant."
            }
        ],
        model:"deepseek-chat"
    })
    console.log(completion.choices[0].message.content);
}

module.exports = generateChat;
require("dotenv").config();
const OpenAI = require("openai")

const openaiApiKey = process.env.OPENAI_API_KEY;

const chat = async (prompt, text) => {
    try {
        const { OpenAI } = require("openai");



        const openai = new OpenAI({

            apiKey: process.env.OPENAI_API_KEY,

        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: text },
            ],
        });
        const answ = completion.choices[0].message.content
        console.log(answ)
        return answ;
    } catch (err) {
        console.error("Error al conectar con OpenAI:", err);
        return "ERROR";
    }
};

module.exports = chat;


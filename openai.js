const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getMessageSuggestions(prompt) {
  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `Suggest 2 marketing messages for: ${prompt}` },
    ],
  });

  return chat.choices[0].message.content.split('\n').filter(Boolean);
}

module.exports = { getMessageSuggestions };

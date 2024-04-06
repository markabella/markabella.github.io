// Example: netlify/functions/answerQuestion.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const question = event.queryStringParameters.q || "Ask me a question.";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store your API key in an environment variable

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview", // Or whichever GPT model you prefer
      prompt: `${question}`, // Your question here
      temperature: 0.7,
      max_tokens: 150,
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://markabella.github.io", // Make sure CORS policy allows your GitHub Pages domain
    },
    body: JSON.stringify({ answer: data.choices[0].text.trim() }),
  };
};


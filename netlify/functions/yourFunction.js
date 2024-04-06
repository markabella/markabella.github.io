// Example: netlify/functions/answerQuestion.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const question = event.queryStringParameters.q || "Ask me a question.";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store your API key in an environment variable

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-davinci-003", // Or whichever GPT model you prefer
      prompt: `${question}`, // Your question here
      temperature: 0.7,
      max_tokens: 150,
    })
  });

  const data = await response.json();

  return {
  return {
    statusCode: 200,
    headers: {
      // Replace "*" with your specific domain to tighten security, e.g., "https://yourdomain.com"
      "Access-Control-Allow-Origin": "https://main--scintillating-pika-68754f.netlify.app",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      // Add any other headers as needed
    },
    body: JSON.stringify({ /* your response body */ }),
  };
};

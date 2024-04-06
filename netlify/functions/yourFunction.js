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

  // Check if 'choices' is defined and has at least one item
  if (!data.choices || data.choices.length === 0) {
    console.error('No choices available in the API response', data);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "The API response did not contain choices." }),
    };
  }

  // Use the previously declared answerText variable for cleaner code
  const answerText = data.choices[0].text.trim();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Make sure CORS policy allows your GitHub Pages domain
    },
    body: JSON.stringify({ answer: answerText }), // Utilize the answerText variable
  };
};

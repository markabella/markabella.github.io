// Example: netlify/functions/answerQuestion.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const question = event.queryStringParameters.q || "Ask me a question.";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use your OpenAI API key

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "text-davinci-003", // Specify the GPT model you're using
        prompt: `${question}`, // Pass the question as prompt
        temperature: 0.7,
        max_tokens: 150,
      })
    });

    if (!response.ok) {
      // Handle errors from the OpenAI API
      throw new Error(`Error from OpenAI: ${response.statusText}`);
    }

    const data = await response.json();

    // Extracting the text from the first choice (ensure to validate the response structure)
    const answerText = data.choices && data.choices.length > 0 ? data.choices[0].text : "No answer was provided.";

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://main--scintillating-pika-68754f.netlify.app",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: JSON.stringify({ answer: answerText }), // Return the answer text in the response body
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while processing your request." })
    };
  }
};

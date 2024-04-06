// netlify/functions/checkEnv.js

exports.handler = async (event) => {
  // Replace 'OPENAI_API_KEY' with the name of the environment variable you want to check
  const apiKey = process.env.OPENAI_API_KEY || 'API key not set';

  return {
    statusCode: 200,
    body: JSON.stringify({ apiKey: apiKey }),
  };
};

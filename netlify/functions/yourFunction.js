exports.handler = async (event) => {
  const question = event.queryStringParameters.q || "Ask me a question.";

  // Your response processing logic here
  const answer = `You asked: ${question}. Here's a placeholder response.`;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://markabella.github.io", // Allows requests from any domain
      // For better security, replace * with your GitHub Pages URL like "https://yourusername.github.io"
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify({ answer }),
  };
};

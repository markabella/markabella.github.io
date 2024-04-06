// Example: netlify/functions/yourFunction.js
exports.handler = async function(event) {
  const question = event.queryStringParameters.q || 'Welcome';

  // Process the question to find relevant responses
  // This example simply echoes the question; replace this logic with your own
  const responseText = `You asked: ${question}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ answer: responseText })
  };
};

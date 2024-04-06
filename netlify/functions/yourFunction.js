exports.handler = async (event) => {
  const { default: fetch } = await import('node-fetch');

  const question = event.queryStringParameters.q || "Ask me a question.";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure your API key is correctly set in environment variables

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview", // Adjust according to the model you're using
        prompt: `${question}`,
        temperature: 0.7,
        max_tokens: 150,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
      "Access-Control-Allow-Origin": "https://markabella.github.io", // Make sure CORS policy allows your GitHub Pages domain
      },
      body: JSON.stringify({ answer: data.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};


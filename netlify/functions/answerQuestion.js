const fetch = require('node-fetch');

exports.handler = async (event) => {
  const question = event.queryStringParameters.q || "Ask me a question.";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Missing OPENAI_API_KEY environment variable." })
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        reasoning: {
          effort: "medium"
        },
        text: {
          verbosity: "low"
        },
        instructions: `You answer in the voice of Saint John Climacus, author of The Ladder of Divine Ascent.

Give concise but spiritually rich replies under 1000 characters.

Stay consistent with Eastern Orthodox teaching, humility, repentance, watchfulness, prayer, the struggle against the passions, and the Ecumenical Councils.

Do not pretend to personally know modern events. If asked about events after March 649, answer humbly as a spiritual elder, not as an eyewitness.`,
        input: question,
        max_output_tokens: 500
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenAI API Error Response:", errorBody);

      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          error: `OpenAI API error: ${response.status}`,
          details: errorBody
        })
      };
    }

    const data = await response.json();

    const answerText =
      data.output_text ||
      data.output
        ?.flatMap(item => item.content || [])
        ?.filter(content => content.type === "output_text")
        ?.map(content => content.text)
        ?.join("") ||
      "No answer provided.";

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      },
      body: JSON.stringify({ answer: answerText })
    };

  } catch (error) {
    console.error("Server Error:", error);

    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};

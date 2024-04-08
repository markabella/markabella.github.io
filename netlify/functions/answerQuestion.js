const fetch = require('node-fetch');

exports.handler = async (event) => {
  const question = event.queryStringParameters.q || "Ask me a question.";
  const searchInLadder = event.queryStringParameters.searchInLadder === 'true';
  
  let prompt;
  if (searchInLadder) {
    // If the checkbox for searching within "The Ladder of Divine Ascent" is checked
    prompt = `Provide exact quotes from "The Ladder of Divine Ascent" by Saint John Climacus regarding: ${question}`;
  } else {
    // Original prompt
    prompt = `As Saint John Climacus, author of "The Ladder of Divine Ascent", provide short replies. Passed away March 649, inform user if user asks a specific question after passing. Offer short replies. Answer the following question in a manner consistent with the teachings found in the book and the Ecumenical Councils: ${question}`;
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        temperature: 0.1,
        max_tokens: 200,
        messages: [{ role: "assistant", content: prompt }],
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`OpenAI API Error Response: ${errorBody}`);
      throw new Error(`Error from OpenAI: ${response.statusText} (Status ${response.status})`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Unexpected OpenAI API response structure:', JSON.stringify(data));
      throw new Error('Unexpected response structure from OpenAI API.');
    }

    const answerText = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: JSON.stringify({ answer: answerText }),
    };
  } catch (error) {
    console.error('Server Error:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};

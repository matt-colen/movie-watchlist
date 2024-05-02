const axios = require("axios");

const handler = async (event) => {
  const { title } = event.queryStringParameters;
  const OMDB_API_KEY = process.env.OMDB_API_KEY; // Access environment variable
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`;

  try {
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    const { status, statusText, headers, data } = e.response;
    return {
      statusCode: 200,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };

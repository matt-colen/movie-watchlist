import axios from "axios";

exports.handler = async (event) => {
  try {
    const { title } = event.queryStringParameters;
    const OMDB_API_KEY = process.env.OMDB_API_KEY; // Access environment variable

    // Make request to third-party API using axios
    const axiosResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(axiosResponse.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

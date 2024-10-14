export const handler = async (event) => {
  const { title } = event.queryStringParameters;
  const OMDB_API_KEY = process.env.OMDB_API_KEY; // Access environment variable
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=movie`;

  try {
    const response = await fetch(url);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message || "An error occurred",
      }),
    };
  }
};

export const handler = async (event) => {
  const { id } = event.queryStringParameters;
  const OMDB_API_KEY = process.env.OMDB_API_KEY; // Access environment variable

  if (!OMDB_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "OMDB_API_KEY is not defined" }),
    };
  }

  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`;

  try {
    const response = await fetch(url);

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

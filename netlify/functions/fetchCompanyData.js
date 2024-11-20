const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { vatCode } = event.queryStringParameters;

  const url = `https://company.openapi.com/IT-start/${vatCode}`;
  const token = process.env.OPENAPI_TOKEN; // Usa la variabile ambiente per il token

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: response.statusText }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

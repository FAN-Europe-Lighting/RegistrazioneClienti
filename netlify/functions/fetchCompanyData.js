const fetch = require('node-fetch');

exports.handler = async (event) => {
  const vatCode = event.queryStringParameters.vatCode;

  if (!vatCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Partita IVA non fornita.' }),
    };
  }

  const OPENAPI_TOKEN = process.env.OPENAPI_TOKEN;
  const url = `https://test.company.openapi.com/IT-start/${vatCode}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENAPI_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Errore API: ${response.status} ${response.statusText}`);
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

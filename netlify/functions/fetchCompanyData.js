exports.handler = async (event) => {
  const vatCode = event.queryStringParameters.vatCode; // Leggi la partita IVA
  const token = process.env.API_TOKEN; // Token API dalle variabili di ambiente

  if (!vatCode || !token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Partita IVA o Token mancante" }),
    };
  }

  try {
    const response = await fetch(`https://test.company.openapi.com/IT-start/${vatCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Errore API: ${response.status}`);
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

const fetch = require('node-fetch');

// Funzione per mascherare i dati (mostra solo le prime 3 cifre)
function maskValue(value) {
  if (!value) return ""; // Se il valore è null o undefined
  if (value.length <= 3) return value; // Se il valore è troppo corto, non mascherare
  return value.slice(0, 3) + "*".repeat(value.length - 3); // Mostra le prime 3 e maschera il resto
}

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

    // Controlla se i dati esistono
    if (data && data.data && data.data.length > 0) {
      const company = data.data[0];

      // Maschera i dati prima di inviarli al frontend
      const maskedData = {
        companyName: company.companyName || "",
        taxCode: maskValue(company.taxCode || ""),
        sdiCode: maskValue(company.sdiCode || ""),
        address: maskValue(company.address?.registeredOffice?.streetName || ""),
        town: maskValue(company.address?.registeredOffice?.town || ""),
        province: maskValue(company.address?.registeredOffice?.province || ""),
        zipCode: maskValue(company.address?.registeredOffice?.zipCode || ""),
        region: maskValue(company.address?.registeredOffice?.region?.description || ""),
      };

      return {
        statusCode: 200,
        body: JSON.stringify(maskedData),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Nessun dato trovato per questa Partita IVA" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

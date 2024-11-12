const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Ottieni il token di Airtable dalla variabile di ambiente
  const airtableApiKey = process.env.AIRTABLE_TOKEN;
  const airtableBaseId = "appmFGmGI1IyNOKes"; // Modifica con il tuo Base ID
  const airtableTableName = "Registrazione Clienti"; // Nome della tabella in Airtable

  try {
    // Ottieni i dati dal corpo della richiesta
    const formData = JSON.parse(event.body);

    // Configura l'URL di Airtable
    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;

    // Effettua la richiesta POST ad Airtable
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: formData,
      }),
    });

    // Controlla se la richiesta è andata a buon fine
    if (!response.ok) {
      throw new Error(`Errore API Airtable: ${response.statusText}`);
    }

    const data = await response.json();

    // Risposta positiva
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Dati salvati con successo", data }),
    };
  } catch (error) {
    console.error("Errore durante l'invio ad Airtable:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

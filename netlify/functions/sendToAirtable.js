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

    // Effettua la richiesta POST a Airtable
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${airtableApiKey}`,
     

// server/index.js
require('newrelic');
const express = require("express");
const path = require('path');
const fetch = require('node-fetch');
const co2 = require('./co2-mm-mlo_json.json');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/green-check", async (req, res) => {
  let result = await fetch('http://api.thegreenwebfoundation.org/greencheck/www.google.com');
  let responseJson = await result.json()
  res.json(responseJson);
});

app.get("/api/co2", (req, res) => {
  res.json(co2);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
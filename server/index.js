// server/index.js
require('newrelic');
const express = require("express");
const path = require('path');
const fetch = require('node-fetch');
const global_average_co2_mean = require('./data/co2_annual_mean.json');
const global_average_co2_growth = require('./data/co2_annual_growth.json');
const mauna_loa_co2_growth = require('./data/mauna_loa_annual_growth.json');
const mauna_loa_co2_mean = require('./data/mauna_loa_annual_mean.json');
const fossil_by_nation = require('./data/fossil_emission_by_nation.json');
const sea_level = require('./data/sea_level.json');
const glacier_mass = require('./data/glacier_mass.json');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/green-check", async (req, res) => {
  const url = req.query.testUrl;
  let result = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${url}`);
  let responseJson = await result.json();
  res.json(responseJson);
});

app.get("/api/co2/mean", (req, res) => {
  res.json({
    "global-average": global_average_co2_mean,
    "mauna-loa": mauna_loa_co2_mean
  });
});

app.get("/api/co2/growth", (req, res) => {
  res.json({
    "global-average": global_average_co2_growth,
    "mauna-loa": mauna_loa_co2_growth
  });
});

app.get("/api/fossil", (req, res) => {
  const india = fossil_by_nation.filter(d => d.Country === 'INDIA');
  const china = fossil_by_nation.filter(d => d.Country === 'CHINA (MAINLAND)');
  const usa = fossil_by_nation.filter(d => d.Country === 'UNITED STATES OF AMERICA');
  const russia = fossil_by_nation.filter(d => d.Country === 'RUSSIAN FEDERATION');
  const japan = fossil_by_nation.filter(d => d.Country === 'JAPAN');
  const germany = fossil_by_nation.filter(d => d.Country === 'GERMANY');
  const iran = fossil_by_nation.filter(d => d.Country === 'ISLAMIC REPUBLIC OF IRAN');
  const saudi = fossil_by_nation.filter(d => d.Country === 'SAUDI ARABIA');
  const korea = fossil_by_nation.filter(d => d.Country === 'REPUBLIC OF KOREA');
  const canada = fossil_by_nation.filter(d => d.Country === 'CANADA');

  res.json({
    india,
    china,
    usa,
    russia,
    japan,
    germany,
    iran,
    saudi,
    korea,
    canada
  });
});

app.get("/api/nasa-events", async (req, res) => {
  let result = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events');
  let responseJson = await result.json();
  res.json(responseJson);
});

app.get("/api/sea-level", (req, res) => {
  res.json(sea_level);
});

app.get("/api/glacier-mass", (req, res) => {
  res.json(glacier_mass);
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
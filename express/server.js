'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true}).then(() => {
  console.log("Successfully connected to MongoDB Atlas!");
})
.catch((error) => {
  console.log("Unable to connect to MongoDB Atlas!");
  console.error(error);
});
const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

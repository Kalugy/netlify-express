'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
/*
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
*/
const router = express.Router();

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
/*
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true}).then(() => {
  console.log("Successfully connected to MongoDB Atlas!");
})
.catch((error) => {
  console.log("Unable to connect to MongoDB Atlas!");
  console.error(error);
});
*/
/*
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  } 

});
const User = mongoose.model("User", UserSchema);

*/
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl  }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
/*
// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then(async (hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword 
      });
      console.log(user)
      user.save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});
*/

module.exports = app;
module.exports.handler = serverless(app);

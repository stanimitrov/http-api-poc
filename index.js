const express = require("express");
const bodyParser = require("body-parser");

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.listen(SERVER_PORT, () => {
  console.log("App running on port: " + SERVER_PORT);
});

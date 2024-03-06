const express = require("express");
const bodyParser = require("body-parser");
const { appRouter } = require("./router");
const cors = require("cors");
require("dotenv").config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(appRouter);

app.listen(SERVER_PORT, () => {
  console.log("App running on port: " + SERVER_PORT);
});

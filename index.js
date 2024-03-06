import express from "express";
import bodyParser from "body-parser";

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use(() => {
  app.listen(SERVER_PORT, () => {
    console.log("App running on port: " + SERVER_PORT);
  });
});

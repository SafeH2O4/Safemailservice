const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const generateJwt = require("./app/controllers/generateJwt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post(
  "/api/auth/gettoken",  generateJwt.generateJwt
);


//routes
require('./app/routers/mail.routers')(app);


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);

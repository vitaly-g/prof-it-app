"use strict";

const bodyParser = require("body-parser");
const express = require("express");

const app = express();

const config = require("./config");
const db = require("./db");
const router = require("./router");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("client"));

db.connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

router.set(app);

app.listen(config.port, () =>
  console.log("App listening on port " + config.port)
);

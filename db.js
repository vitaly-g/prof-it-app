"use strict";

const pg = require("pg");

const config = require("./config");

const client = new pg.Client(config.dbConnectionString);

async function connect() {
  await client.connect();
}

module.exports = {
  connect,
  client
};

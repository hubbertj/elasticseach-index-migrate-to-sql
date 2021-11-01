"use strict";
const Connection = require("./connection");
const { Client } = require('pg');
const pgClient = new Client();

class PsqlConnection extends Connection {
  constructor(meta) {
    console.log(pgClient);
  }
}

module.exports = PsqlConnection;

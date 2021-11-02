"use strict";
const Connection = require("./connection");
const { Client } = require('pg');

class PsqlConnection extends Connection {
  #client = null;
  constructor(options) {
    super();
    this.init(options);
  }

  async init(options) {
    try {
      this.#client = new Client(options);
      await this.#client.connect();
      if('schema' in options){
        this.#client.query(`SET search_path TO '${options.schema}';`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getClient() {
    return this.#client;
  }
}

module.exports = PsqlConnection;

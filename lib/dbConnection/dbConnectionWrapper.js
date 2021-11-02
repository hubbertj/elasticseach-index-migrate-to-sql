"use strict";
// const { PsqlConnect, MySqlConnect } = require('.');
const PsqlConnect = require("./psqlConnect");


class DbConnectionWrapper {
  #client = null;
  #currentTable = null;

  constructor(dialect, options) {
    this.client = null;
    this.init(dialect, options);
  }

  init(dialect, options) {
    switch (dialect) {
      case 'postgre':
        this.#client = new PsqlConnect({ ...options }).getClient();
        break;
      case 'mysql':
        throw new Error('not implemented');
      default:
        this.#client = null;
    }
  }

  setCurrentTable(table) {
    this.#currentTable = table;
  }

  getCurrentTable() {
    return this.#currentTable;
  }

  getClient() {
    return this.#client;
  }

  async insert(data){
    let valueStr = 'VALUES (';
    let columnStr = '('
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (i === Object.keys(data).length - 1) {
        valueStr += (`$${i + 1})`);
        columnStr += (`${Object.keys(data)[i]})`);
        continue;
      }
      valueStr += (`$${i + 1}, `);
      columnStr += (`${Object.keys(data)[i]}, `);
    }
    return this.#client.query(
      `INSERT INTO ${this.#currentTable} ${columnStr} ${valueStr}`, Object.values(data));
   
  }

  /**
   * 
   * @param {*} id 
   * @param {*} pk 
   * @returns 
   */
  async getById(id, pk) {
    return this.#client.query(`SELECT * FROM ${this.#currentTable} WHERE ${pk} = '${id}'`);
  }

  /**
   * 
   * @returns 
   */
  async test() {
    let message = 'db not connected';
    try {
      const res = await this.#client.query('SELECT NOW();');
      if (res && 'rowCount' in res && res.rowCount > 0) {
        message = 'db connected...';
      }
    } catch (err) {
      console.error(err);
    }
    return message;
  }

  /**
   * 
   */
  async close() {
    console.log('Completed');
    await this.#client.end();
  }

}

module.exports = DbConnectionWrapper;

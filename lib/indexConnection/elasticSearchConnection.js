"use strict";
const Connection = require("./connection");
const elasticsearch = require('elasticsearch');

class ElasticSearchConnection extends Connection {
    #client = null;
    constructor(settings) {
        super();
        this.init(settings);
    }

    init(settings) {
        this.#client = new elasticsearch.Client(settings);
    }

    getClient(){
        return this.#client;
    }
}

module.exports = ElasticSearchConnection;

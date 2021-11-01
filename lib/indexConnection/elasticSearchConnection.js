"use strict";
const Connection = require("./connection");
const { elasticsearch } = require('elasticsearch');

class ElasticSearchConnection extends Connection {
    constructor(options) {
        this.init(options);
        this.elasticSearchClient = new elasticsearch.Client({
            hosts: ['https://username:password@host:port']
        });
      }
      
      init(options) {
    
      }
}

module.exports = ElasticSearchConnection;

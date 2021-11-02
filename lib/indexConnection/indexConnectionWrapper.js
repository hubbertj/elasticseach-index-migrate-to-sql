"use strict";
const ElasticSearchConnection = require("./elasticSearchConnection");

class IndexConnectionWrapper {
    #client = null;
    
    constructor(type, settings) {
        this.init(type, settings);
    }

    init(type, settings) {
        settings.host = `${settings.host}:${settings.port}`;
        switch (type) {
            case 'elasticsearch':
                this.#client = new ElasticSearchConnection({ ...settings }).getClient();
                break;
            default:
                throw new Error('not implemented');
        }
    }

    getClient() {
        return this.#client;
    }

    search(query) {
        return this.#client.search(query);
    }

    /**
      * 
      * @returns 
      */
    async test() {
        let message = 'index not connected';
        try {
            const response = await this.#client.ping({ requestTimeout: 1000 });
            if (response && response === true) {
                message = 'index connected...';
            }
        } catch (err) {
            console.trace(err.message)
        }
        return message;
    }
}

module.exports = IndexConnectionWrapper;
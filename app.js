const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    hosts: ['https://username:password@host:port']
});
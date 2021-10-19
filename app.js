const { elasticsearch } = require('elasticsearch');
const { Client } = require('pg');

const pgClient = new Client()
const elasticSearchClient = new elasticsearch.Client({
    hosts: ['https://username:password@host:port']
});

/**
 * main script function
 */
const main = () => {
    // read indexs 

    // loop indexs and call converters | mappers | injectors

}

main();




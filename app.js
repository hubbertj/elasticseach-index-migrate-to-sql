const { elasticsearch } = require('elasticsearch');
const { DbConnectionWrapper } = require('./lib/dbConnection');
const fs = require('fs');
// const elasticSearchClient = new elasticsearch.Client({
//     hosts: ['https://username:password@host:port']
// });

const SettingsDir = './settings';


/**
 * main script function
 */
const main = () => {
    let settings;
    let connection;
    try {
        settings = JSON.parse(fs.readFileSync(`${SettingsDir}/settings.json`));
        console.log(settings);
    } catch (err) {
        console.log(err);
    }
    if(!'db' in settings && !settings.db){
        return -1;
    }
    const { db } = settings;
    connection = new DbConnectionWrapper(db.dialect, db);
    try {
        const message = connection.test();
        console.log(message);
    } catch (err) {
        console.log(err);
    }

    // read indexs 

    // loop indexs and call converters | mappers | injectors

}

main();




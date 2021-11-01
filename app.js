const { DbConnectionWrapper } = require('./lib/dbConnection');
const { IndexConnectionWrapper } = require('./lib/indexConnection');
const fs = require('fs');
const SettingsDir = './settings';

/**
 * Gets script's settings;
 * @returns  
 */
const getSettings = () => {
    let settings;
    try {
        settings = JSON.parse(fs.readFileSync(`${SettingsDir}/settings.json`));
        console.log(settings);
    } catch (err) {
        console.log(err);
    }
    return settings;
}

/**
 * main script function
 */
const main = () => {
    const settings = getSettings();
    const { db, index } = settings;
    let dbConnection;
    let indexConnection;

    if(!db || !index){
        return -1;
    }

    // create db conection client;
    dbConnection = new DbConnectionWrapper(db.dialect, {...db });
    try {
        const message = dbConnection.test();
        console.log(message);
    } catch (err) {
        console.log(err);
    }

    // create index connection client;
    indexConnection = new IndexConnectionWrapper({});
    try {
        const message = indexConnection.test();
        console.log(message);
    } catch (err) {
        console.log(err);
    }

    // loop indexs and call converters | mappers | injectors and insert if needed;

}

main();




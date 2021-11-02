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
        console.log('settings --------');
        console.log(settings);
    } catch (err) {
        console.log(err);
    }
    return settings;
}

/**
 * main script function
 */
const main = async () => {
    const settings = getSettings();
    const { db, index, mapper } = settings;
    let dbConnection;
    let indexConnection;

    if(!db || !index){
        return -1;
    }

    // create db conection client;
    dbConnection = new DbConnectionWrapper(db.dialect, {...db });

    // create index connection client;
    indexConnection = new IndexConnectionWrapper(index.type, {...index});

    try {
        const dbMessage = await dbConnection.test();
        console.log(dbMessage);
        const idxMessage = await indexConnection.test();
        console.log(idxMessage);
    } catch (err) {
        console.log(err);
    }

    // loop indexs and call converters | mappers | injectors and insert if needed;
    if(mapper && mapper.length > 0){
        mapper.forEach(mapping => {

            if('active' in mapping && !mapping.active){
                return;
            }
            
            console.log(mapping);


        });
    }


    dbConnection.close();
}

main();




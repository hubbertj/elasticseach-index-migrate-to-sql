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
        console.log('--------');
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
    const { db, index, mappers, scroll } = settings;
    let dbConnection;
    let indexConnection;

    if (!db || !index) {
        return -1;
    }

    // create db conection client;
    dbConnection = new DbConnectionWrapper(db.dialect, { ...db });

    // create index connection client;
    indexConnection = new IndexConnectionWrapper(index.type, { ...index });

    try {
        const dbMessage = await dbConnection.test();
        console.log(dbMessage);
        const idxMessage = await indexConnection.test();
        console.log(idxMessage);
    } catch (err) {
        console.log(err);
    }

    // loop indexs and call converters | mappers | injectors and insert if needed;
    if (mappers && mappers.length > 0) {
        for (map in mappers) {
            let allRecords = [];
            const { index_name,
                fields,
                index_pk,
                table_pk,
                table_name } = mappers[map];
            dbConnection.setCurrentTable(table_name);

            if ('active' in mappers[map] && !mappers[map].active) {
                continue;
            }

            var { _scroll_id, hits } = await indexConnection.search({
                index: index_name,
                scroll,
                body: {
                    query: {
                        match_all: {}
                    }
                }
            });


            console.log(`Mapping for ${index_name} to ${table_name}`);
            console.log(fields);
            console.log(`${hits.total} documents found in ${index_name} index`);

            while (hits && hits.hits.length) {
                for (const doc in hits.hits) {
                    const document = hits.hits[doc];
                    const id = document[index_pk];
                    try {
                        const record = await dbConnection.getById(id, table_pk);
                        if (record.rowCount == 0) {
                            console.log(`${id} not found in ${dbConnection.getCurrentTable()} attempting to map and insert.`);
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }

                allRecords.push(...hits.hits);
                console.log(`processed ${allRecords.length} of ${hits.total} documents`);


                var { _scroll_id, hits } = await indexConnection.getClient().scroll({
                    scrollId: _scroll_id,
                    scroll
                });
            }
        }
    }
    dbConnection.close();
}

main();




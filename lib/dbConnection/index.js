const MySqlConnect = require("./mySqlConnect");
const DbConnectionWrapper = require("./dbConnectionWrapper.js");
const PsqlConnect = require("./psqlConnect");

module.exports = {
    DbConnectionWrapper,
    MySqlConnect,
    PsqlConnect
};

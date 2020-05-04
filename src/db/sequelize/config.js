import accessEnv from "#root/helpers/accessEnv";

const dbName = accessEnv("MYSQL_DB");
const dbHost = accessEnv("MYSQL_HOST");
const dbUser = accessEnv("MYSQL_USER");
const dbPassword = accessEnv("MYSQL_PASS");
const dbPort = accessEnv("MYSQL_PORT");

module.exports = {
    dbUrl: `mysql://${dbUser}:${dbPassword}@${dbHost}/${dbName}?charset=UTF8`   
};
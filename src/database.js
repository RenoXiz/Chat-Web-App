const { Client } = require('pg');
const parse = require('pg-connection-string').parse;
const dotenv = require('dotenv');

dotenv.config();

const config = parse(process.env.DB_CONNECTION_STRING);
const port = process.env.DB_PORT || 5432;
config.port = port;

console.log(config);

const client = new Client({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = client;
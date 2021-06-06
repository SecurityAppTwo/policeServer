const { Client } = require('pg');

const db = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'scurityapptwodb',
    password: 'mtgand6',
    port: 31000,
});


db.connect();
const { Client } = require("pg");

const db = new Client({
    user: 'admin',
    host: '172.30.196.58',
    database: 'securityapptwodb',
    password: 'mtgand6',
    port: 31000,
});

db.connect()
  .then(() => console.log("connected"))
  .catch(err => console.log("connection error", err.stack));

module.exports = db;

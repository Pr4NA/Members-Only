const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost", 
    user: "postgres",
    database: "users",
    password: "1234",
    port: 5432 
});
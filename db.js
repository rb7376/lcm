const { Pool } = require("pg");

var connectionString = "postgres://postgres:admin@localhost:5432/LcmApp";
const pool = new Pool({
  connectionString
})

module.exports = pool;
// Update with your config settings.
const settings = require("./settings");
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
    }
  }
};
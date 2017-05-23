const settings = require("./settings");
require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

const args = process.argv.slice(2);
const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];

const query = knex('famous_people').insert({
    first_name: firstName, 
    last_name: lastName, 
    birthdate: birthDate
});

console.log(query.toString());

query.asCallback()
knex.destroy();
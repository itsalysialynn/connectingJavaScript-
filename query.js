const settings = require("./settings");
require('dotenv').config();
const client = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

const input = process.argv[2];

function padTwoDigitNumber(number) {
  return number < 10 ? '0' + number.toString() : number;
}

client.select().from('famous_people').where('first_name', `${input}`).orWhere('last_name', `${input}`).asCallback(function (err, rows) {
  if (err) {
    console.error(err);
  } else {
    console.log('Found', rows.length, "person(s) by the name '" + input + "':");
    let resultStrings = rows.map(function turnRowIntoString(row) {
      let birthdate = new Date(row.birthdate);
      return '- ' + row.id + ": " + row.first_name + ' ' + row.last_name + ", born '" + birthdate.getFullYear() + '-' + padTwoDigitNumber(birthdate.getMonth() + 1) + '-' + padTwoDigitNumber(birthdate.getDate()) + "'";
    });
    console.log(resultStrings.join('\n'));
    client.destroy(); 
  }
});


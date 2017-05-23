const pg = require("pg");
const settings = require("./settings");

const dbConfig = {
  user: 'vagrant',
  password: 'vagrant'
};
const client = new pg.Client( dbConfig );
var args = process.argv.slice(2);
const input = process.argv[2];

function padTwoDigitNumber(number) {
  return number < 10 ? '0' + number.toString() : number;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Found', result.rows.length, "person(s) by the name '" + input + "':");
    // console.log(result.rows[0]); //output: 1
    let resultStrings = result.rows.map(function turnRowIntoString(row) {
      let birthdate = new Date(row.birthdate);
      return '- ' + row.id + ": " + row.first_name + ' ' + row.last_name + ", born '" + birthdate.getFullYear() + '-' + padTwoDigitNumber(birthdate.getMonth() + 1) + '-' + padTwoDigitNumber(birthdate.getDate()) + "'";
    });
    console.log(resultStrings.join('\n'));
    client.end();
  });
});
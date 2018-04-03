console.log('success 1');
const pg = require('pg-promise')();
const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'second_database',
    user: 'user1',
    password:'user1'
};
console.log('successful connection');
const db = pg(dbConfig);

db.query('select * from phonebook;')
    .then((results) => {
        console.log(results);
    });
// module.exports = db;
require('dotenv').config();
const{createPool} = require('mysql2'); 

const connection = createPool({
    host: process.env.host, 
    user: process.env.user,
    password: process.env.password, 
    database: process.env.database,
    multipleStatements: true,
    connectionLimit: 30
});

module.exports = connection; 
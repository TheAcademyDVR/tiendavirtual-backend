const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1004@',
    database: 'tienda_virtual'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('DATABASE CONECTADO');
});

module.exports = connection;
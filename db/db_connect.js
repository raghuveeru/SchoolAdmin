const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sravanthi@123",
    database: "studentadministration",
    port: 3306
});

con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;
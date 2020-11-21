var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CS178!CD!dc'
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
 });

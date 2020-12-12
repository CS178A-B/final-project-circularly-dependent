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

  // let query = "INSERT INTO category (id, name, description, created_at) VALUES ?";
  // con.query(query, results, (error, response) => {
  //   console.log(error || response);
  // });

// con.query(query, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//  });


  // con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//  });
exports.results = results;
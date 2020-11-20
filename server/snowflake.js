var snowflake = require('snowflake-sdk');

var connection = snowflake.createConnection({
    account: 'ik46588.us-central1.gcp',
    username: 'sha021',
    password: 'CS178!CD!dc'
});

connection.connect(function(err, conn) {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected as id: ' + connection.getId());
    }
})



    
// connection.execute({
//     sqlText: 'SELECT 1 + 1 AS solution',

//     complete: function(err, stmt, rows) {
//       if (err) {
//         console.error('Failed to execute statement due to the following error: ' + err.message);
//       } else {
//         console.log(stmt.getSqlText);

//         console.log('Number of rows produced: ' + rows.length);
//       }
//     }
//   });
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

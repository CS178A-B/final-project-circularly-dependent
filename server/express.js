/* entry point for our application */

// Bringing in the express framework and sotre it in a constant 'express'
const express = require('express');
const path = require('path');
const cors = require('cors');
const DeepCapitalizer = require('./data.js').DeepCapitalizer
const csv = require('csv-parser')
const fs = require('fs')
const filePath = path.join(__dirname, 'RS-20170701-20190630.csv');

// Initializing the express framework and save it to another constant 'app'
const app = express();

// Save the port of our sever into a constant 'PORT'
// process.env.PORT checks our environment variables to see if we already have a PORT defined.
// if not, then we use PORT 4000
const PORT = process.env.PORT || 4000;

// Delay in mili-seconds
const timeout = delay => {
  return new Promise(res => setTimeout(res, delay));
}

// Removes CORS error
app.use(cors());

// Serves up static Client build (React App)
app.use('/', express.static(path.join(__dirname, '../deep-capitalizer/build')));

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../deep-capitalizer/build', 'index.html'));
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.get('/test', (req, res) => {
  delayedRes = async () => {
    await timeout(500);
    res.status(200).json({ "message" : "> Counter poke from Server <" })
    console.log('Counter poke initiated')
  }
  delayedRes()
});

app.get('/rawData', (req, res) => {
  const results = [];

  console.log('File read')
  delayedRes = async () => { 
    fs.createReadStream(filePath)
      .on('error', () => {
          console.log("errorr")
      })
      .pipe(csv())
      .on('data', (row) => {
          results.push(row)
      })
      .on('end', () => {
        console.log(results[0]);
      })
  }
  res.status(200).json(results)
  delayedRes()  

});

// app.get("/", function(req, res){
//   var q = 'SELECT 1+1 AS solution';
//   connection.query(q, function (error, results) {
//   if (error) throw error;
//   var msg = "We have " + results[0].count + " users";
//   res.send(msg);
//   });
// });

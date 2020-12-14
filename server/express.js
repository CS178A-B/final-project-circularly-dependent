/* entry point for our application */

// Bringing in the express framework and sotre it in a constant 'express'
const express = require('express');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
// const filePath = path.join(__dirname, 'RS-20170701-20190630.csv');
const filePath = path.join(__dirname, 'outdata.json');
const mysql = require('mysql');
const bodyParrser = require('body-parser');

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

// sql works
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CS178!CD!dc',
  database: "mock"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("DROP DATABASE mock", function(err, result){
    if(err) throw err;
    console.log("mock deleted")
  })

  con.query("CREATE DATABASE mock", function(err, result){
    if(err) throw err;
    console.log("mock created")
  })
});


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

// app.get('/rawData', (req, res) => {
//   const results = [];

//   console.log('File read')
//   delayedRes = async () => { 
//     fs.createReadStream(filePath)
//       .on('error', () => {
//           console.log("errorr")
//       })
//       .pipe(csv())
//       .on('data', (row) => {
//           results.push(row)
//       })
//       .on('end', () => {
//         console.log(results[0]);
//       })
//   }
//   res.status(200).json(results)
//   delayedRes()  
// });

app.get('/rawData', (req, res) => {
  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   // con.query(q, function (error, results) {
  //   //   if (error) throw error;
  //   //   var msg = "We have " + results[0].solution + " users";
  //   //   res.send(msg);
  //   //   console.log(msg)
  //   //   return msg
  //   // });
  // });
  
  async function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
  }
  jsonReader(filePath, (err, ret) => {
    if (err) {
        console.log(err)
        return 
    }
    
    data = ret.Purchases
    // console.log(data[0].Product)
    var values = []
    for (var i=0; i<data.length; i++)
      values.push([data[i].Product, data[i].Descriptor])

    con.query('INSERT INTO items (product, descriptor) VALUES ?', [values], function(err,result) {
      if(err) {
          res.send('Error');
          console.log('error')
      }
      else {
          res.send('Success');
          console.log("success")
      }
    });
  })   
});


// app.post('/', function(req, res) {

//   var jsondata = req.body;
//   var values = [];
  
//   for(var i=0; i< jsondata.length; i++)
//     values.push([jsondata[i].name,jsondata[i].age]);
  
//   //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
//   connection.query('INSERT INTO members (name, age) VALUES ?', [values], function(err,result) {
//     if(err) {
//        res.send('Error');
//     }
//    else {
//        res.send('Success');
//     }
//   });
// })

// app.get("/", function(req, res){
//   var q = 'SELECT 1+1 AS solution';
//   connection.query(q, function (error, results) {
//   if (error) throw error;
//   var msg = "We have " + results[0].count + " users";
//   res.send(msg);
//   });
// });

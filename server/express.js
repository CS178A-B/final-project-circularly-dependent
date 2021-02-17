/* entry point for our application */
// Bringing in the express framework and sotre it in a constant 'express'
const express = require('express');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
var bodyParser = require('body-parser');
const rawfile = path.join(__dirname, 'RS-20170701-20190630.csv');
const mysql = require('mysql');
const cleanData = require('./CleanData')
// Initializing the express framework and save it to another constant 'app'
const app = express();
const fileupload = require('express-fileupload')


app.use(fileupload());

const filePath = path.join(__dirname, 'CoreNLPData.json');

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
  // database: "mock"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  con.query("DROP DATABASE IF EXISTS mock", function(err, result){
    if(err) throw err;
    console.log("mock deleted")
  })
  
  con.query("CREATE DATABASE mock", function(err, result){
    if(err) throw err;
    console.log("mock created")
  })
  
  con.query("USE mock", function(err, result){
    if(err) throw err;
    console.log("mock used")
  })
  
  var sql = "CREATE TABLE items (vendor_name VARCHAR(255), descriptor VARCHAR(255), req_department INT, item_desc TEXT, unit_price INT, dep_desc TEXT, item_total INT, product_name TEXT, po_no INT, entry_id INT, issue_date date, vendor_code INT, po_quantity INT)";
  // var sql = "CREATE TABLE items (vendor_name VARCHAR(255), descriptor VARCHAR(255), req_department INT, item_desc TEXT, unit_price INT, dep_desc TEXT, item_total INT, product_name TEXT, po_no INT, entry_id INT, issue_date VARCHAR(255), vendor_code INT)";
  const userPassTable = "CREATE TABLE users (username VARCHAR(255), password VARCHAR(255))"

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table item created");
  });
  
  con.query(userPassTable, function (err, result) {
    if (err) throw err;
    console.log("Table userPassword created");
  });

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
      return 
    }
    data = ret.PURCHASES
    
    let values = []
    for (var i=0; i<data.length; i++) {
      cleanData(data[i])
      values.push([data[i].VENDOR_NAME, data[i].DESCRIPTOR, data[i].REQUESTOR_DEPARTMENT, data[i].ITEM_DESC, data[i].UNIT_PRICE, data[i].DEPARTMENT_DESC, data[i].ITEM_TOTAL_AMOUNT, data[i].PRODUCT_NAME, data[i].PO_NO, data[i].ENTRY_ID, data[i].ISSUE_DATE, data[i].VENDOR_CODE, data[i].PO_QUANTITY])
      // values.push([data[i].VENDOR_NAME, data[i].DESCRIPTOR, data[i].REQUESTOR_DEPARTMENT, data[i].ITEM_DESC, data[i].UNIT_PRICE, data[i].DEPARTMENT_DESC, data[i].ITEM_TOTAL_AMOUNT, data[i].PRODUCT_NAME, data[i].PO_NO, data[i].ENTRY_ID, data[i].ISSUE_DATE, data[i].VENDOR_CODE/*, data[i].PO_QUANTITY*/])
    }
    let sql = 'INSERT INTO items (vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, entry_id, issue_date, vendor_code, po_quantity) VALUES ?'
    // let sql = 'INSERT INTO items (vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, entry_id, issue_date, vendor_code) VALUES ?'
    const userPass = 'INSERT INTO users VALUES (\'scotty@ucr.edu\', \'thebear\')'
    con.query(sql, [values], function(err,result) {
      if(err) {
        throw err;
      }
      else {
        console.log("success in")
      }
    }) 

    con.query(userPass, function(err,result) {
      if(err) {
        throw err;
      }
      else {
        console.log("success user In")
      }
    }) 
  })   
});


// Serves up static Client build (React App)
app.use('/', express.static(path.join(__dirname, '../deep-capitalizer/build')));

// Removes CORS error
app.use(cors());

// Sets up server to parse url-encoded body
app.use(bodyParser.urlencoded({ extended: true }));

// Sets up server to parse json body
app.use(bodyParser.json());

// Spins up React App from Node Server
app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../deep-capitalizer/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.get('/test', (req, res) => {
  delayedRes = async () => {
    await timeout(500);
    res.status(200).json({ "message" : "> Counter poke from Server <" })
    console.log('Counter poke initiated')
  }
  delayedRes()
});

app.post('/signIn', (req, res) => {
  console.log('tryint to log in?')
  const user = req.body.username
  const pass = req.body.password
  console.log(user)
  console.log(pass)
  const sqlquery = 'SELECT COUNT(username) as cnt FROM users WHERE username = \'' + user + '\' AND password = \'' + pass + '\' LIMIT 0, 1'
  con.query(sqlquery, function (err, result) {
    if (err) throw err;
    results = (result[0].cnt)
    res.status(200).json(results)
  });
})


app.post('/selectData', (req, res) => {
  // let sqlquery = 'SELECT * FROM items WHERE product_name = \'' + req.body.product_name + '\' ORDER BY ISSUE_DATE ASC, unit_price'
  let sqlquery = 'SELECT * FROM items WHERE product_name = \'' + req.body.product_name + '\' ORDER BY unit_price LIMIT 30'

  console.log(sqlquery)
  con.query(sqlquery, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result)
  });
})

app.post('/overall', (req, res) => {
  //let sqlquery = 'SELECT * FROM items WHERE product_name = \'' + req.body.product_name + '\' ORDER BY ISSUE_DATE ASC, item_total'
  let sqlquery  = 'SELECT SUM(item_total) AS Sum, YEAR(issue_date) as year FROM items WHERE product_name = \'' + req.body.product_name + '\'GROUP BY YEAR(issue_date) ORDER BY YEAR ASC'  
  con.query(sqlquery, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result)
  });
})

app.get('/productName', (req, res) => {
  let sqlquery = 'SELECT DISTINCT product_name FROM items'
  con.query(sqlquery, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result)
  });
})

app.post('/serverUpload', (req, res, next) => {
  console.log(req.files);
  const file = req.files.file;
  file.mv("./uploads/" + file.name, function(err, result) {
    if (err) throw err;
    res.send({
      success: true,
      message: "File uploaded!"
    });
  });
})


// function cleanData(data) {
//   let thisData = data
//   if (thisData.DESCRIPTOR == 0)
//     thisData.DESCRIPTOR = ""
//   thisData.REQUESTOR_DEPARTMENT = Number(thisData.REQUESTOR_DEPARTMENT)
//   thisData.ITEM_DESC = (thisData.ITEM_DESC).replace("\"\\\"", "") 
//   thisData.ITEM_DESC = (thisData.ITEM_DESC).replace("\"", "") 
//   thisData.ITEM_DESC = thisData.ITEM_DESC.replace(/  |\r\n|\n|\r/gm, '');
  
//   thisData.UNIT_PRICE = (thisData.UNIT_PRICE).replace(/\D/g,'');
//   thisData.UNIT_PRICE = Number(thisData.UNIT_PRICE)

//   thisData.ITEM_TOTAL_AMOUNT = (thisData.ITEM_TOTAL_AMOUNT).replace(/\D/g,'');
//   thisData.ITEM_TOTAL_AMOUNT = Number(thisData.ITEM_TOTAL_AMOUNT)
//   if ((thisData.PO_NO).includes("\n")) {
//     thisData.PO_NO = (thisData.PO_NO).replace("\n", "")
//   }
//   thisData.PO_NO = (thisData.PO_NO).replace(/\D/g,'');
//   thisData.PO_NO = Number(thisData.PO_NO)

//   thisData.ISSUE_DATE = (thisData.ISSUE_DATE).split(" ")[0]
//   thisData.ISSUE_DATE = (thisData.ISSUE_DATE).replace("\\", "")
//   thisData.ISSUE_DATE = (thisData.ISSUE_DATE).replace("/", "-")
//   let year = thisData.ISSUE_DATE.substr(thisData.ISSUE_DATE.length - 4)
//   thisData.ISSUE_DATE = (thisData.ISSUE_DATE).slice(0, -5)
//   if (thisData.ISSUE_DATE.charAt(2) != "-") thisData.ISSUE_DATE = "0" + thisData.ISSUE_DATE
//   if (thisData.ISSUE_DATE.charAt(4) == "-") thisData.ISSUE_DATE = thisData.ISSUE_DATE.slice(0, 2) + "0" + thisData.ISSUE_DATE.slice(2, -1)
//   thisData.ISSUE_DATE = year + "-" + thisData.ISSUE_DATE

//   thisData.VENDOR_CODE = (thisData.VENDOR_CODE).replace("V", "")
//   thisData.VENDOR_CODE = Number(thisData.VENDOR_CODE)

//   thisData.PO_QUANTITY = (thisData.PO_QUANTITY).replace(/\D/g,'');
//   thisData.PO_QUANTITY = Number(thisData.PO_QUANTITY)
// }


let results = [];
app.get('/upload', (req, res) => {
  console.log('File read')
  delayedRes = async () => { 
    fs.createReadStream(rawfile)
      .on('error', () => {
          console.log("errorr")
      })
      .pipe(csv())
      .on('data', (row) => {
          results.push(row)
      })
      .on('end', () => {
        // console.log(results)
        // res.status(200).json(results)
        fs.writeFile('./server/jsonsmalll.json',  JSON.stringify(results.slice(0, 10)), function (err) {
          if (err) throw err;
          console.log(results)
          console.log('Saved!');
        });
      })
      

    // const source = fs.createReadStream(rawfile, "utf8")
    // const destination = fs.createWriteStream("bigfile2.json")

    // source.on('data', function (chunk) {
    // //write into the file  one piece at a time
    //   destination.write(chunk)
    // });
    // source.on('end', function () {
    //   //after that we read the all file piece  by piece we close the stram 
    //   destination.end()
    // });


    // destination.on("finish", () => {
    // //the function destination.end() will rise the finish event 
    //   console.log("done write into bigfile2.txt")
    // })
  }

  delayedRes()  
});


  
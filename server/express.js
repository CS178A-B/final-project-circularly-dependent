/* entry point for our application */
// Bringing in the express framework and sotre it in a constant 'express'
const express = require('express');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const cleanData = require('./CleanData');
const app = express();
const fileupload = require('express-fileupload')

app.use(fileupload());

const filePath = path.join(__dirname, '/nlp-to-server/CoreNLPData.json');

// Save the port of our sever into a constant 'PORT'
// process.env.PORT checks our environment variables to see if we already have a PORT defined.
// if not, then we use PORT 4000
const PORT = process.env.PORT || 4000;
let city; 

// Delay in mili-seconds
const timeout = delay => {
  return new Promise(res => setTimeout(res, delay));
}

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CS178!CD!dc',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  con.query("CREATE DATABASE IF NOT EXISTS spendingData", function(err, result){
    if(err) throw err;
    console.log("spendingData created")
  })
  
  con.query("USE spendingData", function(err, result){
    if(err) throw err;
    console.log("spendingData used")
  })
  
  var sql = "CREATE TABLE IF NOT EXISTS items (vendor_name VARCHAR(255), descriptor VARCHAR(255), req_department INT, item_desc TEXT, unit_price INT, dep_desc TEXT, item_total INT, product_name TEXT, po_no INT, entry_id INT, issue_date date, vendor_code INT, po_quantity INT)";
  const userPassTable = "CREATE TABLE IF NOT EXISTS users (username VARCHAR(255), password VARCHAR(255), city VARCHAR(255))"

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
    let cleanedData
    for (var i=0; i<data.length; i++) {
      cleanedData = cleanData.CleanData(data[i])
      values.push([cleanedData.VENDOR_NAME, cleanedData.DESCRIPTOR, cleanedData.REQUESTOR_DEPARTMENT, cleanedData.ITEM_DESC, cleanedData.UNIT_PRICE, cleanedData.DEPARTMENT_DESC, cleanedData.ITEM_TOTAL_AMOUNT, cleanedData.PRODUCT_NAME, cleanedData.PO_NO, cleanedData.ENTRY_ID, cleanedData.ISSUE_DATE, cleanedData.VENDOR_CODE, cleanedData.PO_QUANTITY])
    }
    let sql = 'INSERT IGNORE INTO items (vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, entry_id, issue_date, vendor_code, po_quantity) VALUES ?'
    // let sql = 'INSERT INTO items (vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, entry_id, issue_date, vendor_code) VALUES ?'
    const userPass = 'INSERT IGNORE INTO users VALUES (\'scotty@ucr.edu\', \'thebear\', \'riverside\')'
    
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
  // const sqlquery = 'SELECT COUNT(username) as cnt FROM users WHERE username = \'' + user + '\' AND password = \'' + pass + '\' LIMIT 0, 1'
  const sqlquery = 'SELECT city FROM users WHERE username = \'' + user + '\' AND password = \'' + pass + '\''

  con.query(sqlquery, function (err, result) {
    if (err) throw err;
    //results = (result[0].cnt)
    if (result.length == 0) console.log('it is empty')


    res.status(200).json(result)
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

app.get('/serverUpload', (req,res) => {
  const fsH = require('fs');
  const dir = path.join(__dirname + '/../uploads/')
  let files = fsH.readdirSync(dir);  
  let uploadList = []
  for (const file of files) {
    uploadList.push(file)
  }
  console.log(uploadList)
  res.status(200).json(uploadList)
})


let results = [];
app.post('/serverUpload', (req, res, next) => {
  const file = req.files.file;
  let toNLPfile = path.join(__dirname + './ToNLP/newData.json')
  fp = path.join(__dirname + '/../uploads/', file.name)
  
  if (fs.existsSync(fp)) {
    res.send({
      success: false,
      message: 'File Already Exists'
    });
  }
  else {
    file.mv("./uploads/" + file.name, function(err, result) {
      if (err) throw err;
      let [fileName, fileExtension] = (file.name).split('.')

      delayedRes = async() => { 
        fs.createReadStream(fp)
        .on('error', () => {
            console.log("errorr")
        })
        .pipe(csv())
        .on('data', (row) => {
            results.push(row)
        })
        .on('end', () => {
          fileName = './server/ToNLP/newData.json'
          if (fs.existsSync(toNLPfile)) {
            console.log("UNLINKINGGGG")
            fs.unlinkSync(toNLPfile)
          }
          fs.writeFile(fileName, JSON.stringify(results), function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
        })
      }
      delayedRes()
    })
    res.send({
      success: true,
      message: 'Successfuly Uploaded'
    });
  }
})

/* entry point for our application */

// Bringing in the express framework and sotre it in a constant 'express'
const express = require('express');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
// const filePath = path.join(__dirname, 'RS-20170701-20190630.csv');
const filePath = path.join(__dirname, 'out1.json');
const mysql = require('mysql');

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
    
  con.query("USE mock", function(err, result){
    if(err) throw err;
    console.log("mock used")
  })
  
  var sql = "CREATE TABLE items (vendor_name VARCHAR(255), descriptor VARCHAR(255), req_department INT, item_desc TEXT, unit_price INT, dep_desc VARCHAR(255), item_total INT, product_name TEXT, po_no INT, entry_id INT, issue_date VARCHAR(255), vendor_code INT, po_quality INT)";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  con.query('CREATE TABLE fooo (vendor_name VARCHAR(255), descriptor VARCHAR(255), req_department INT, item_desc TEXT, unit_price INT, dep_desc VARCHAR(255), item_total INT, product_name TEXT, po_no INT, entry_id INT, issue_date VARCHAR(255))', function(err,result) {
    if(err) {
      console.log('error')
    }
    else {
      console.log("created f")
    }
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

let check = []
app.get('/rawData', (req, res) => {  
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
    data = ret.PURCHASES
    
    let values = []
    let vendor_name = []
    let descriptor = []
    let req_department = []
    let item_desc = []
    let unit_price = []
    let dep_desc = []
    let item_total = []
    let product_name = []
    let po_no = []
    let entry_id = []
    let issue_date = []
    let vendor_code = [] 
    let po_quality = []
    

    for (var i=0; i<data.length; i++) {
      cleanData(data[i])
      values.push([data[i].VENDOR_NAME, data[i].DESCRIPTOR, data[i].REQUESTOR_DEPARTMENT, data[i].ITEM_DESC, data[i].UNIT_PRICE, data[i].DEPARTMENT_DESC, data[i].ITEM_TOTAL_AMOUNT, data[i].PRODUCT_NAME, data[i].PO_NO, data[i].ENTRY_ID, data[i].ISSUE_DATE, data[i].VENDOR_CODE, data[i].PO_QUANTITY])
      vendor_name.push(data[i].VENDOR_NAME)
      descriptor.push(data[i].DESCRIPTOR)
      req_department.push(data[i].REQUESTOR_DEPARTMENT)
      item_desc.push(data[i].ITEM_DESC)
      unit_price.push(data[i].UNIT_PRICE)
      dep_desc.push(data[i].DEPARTMENT_DESC)
      item_total.push(data[i].ITEM_TOTAL_AMOUNT)
      product_name.push(data[i].PRODUCT_NAME)
      po_no.push(data[i].PO_NO)
      entry_id.push(data[i].ENTRY_ID)
      issue_date.push(data[i].ISSUE_DATE)
      vendor_code.push(data[i].VENDOR_CODE)
      po_quality.push(data[i].PO_QUANTITY)
    }

    let sql = 'INSERT INTO items (vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, entry_id, issue_date, vendor_code, po_quality) VALUES (?)'
    let sql2 = 'INSERT INTO fooo (vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, entry_id, issue_date) VALUES (?)'
    // con.query(sql, values, function(err,result) {
    //   if(err) {
    //     res.send('Error');
    //     console.log('error')
    //   }
    //   else {
    //     console.log("success")
    //   }
    // })
    
    let val = []
    val.push(['John', 'oooo']) //, 1, 'PUMP EFFICIENTcdaafd', 1, 'Water-production & aa', 408, 'pump efficiency ', 60443, 27, '08/18/2017 14:06', 1889, 408]
    val.push(['Jane', 'www'])
    console.log(val)
    con.query(sql, values, function(err,result) {
      if(err) {
        console.log('error')
      }
      else {
        console.log("success")
      }
    })
  // res.status(200).json([{'vendor_name':vendor_name, 'descriptor':descriptor, 'req_department':req_department, 'item_desc':item_desc, 'unit_price':unit_price, 'dep_desc':dep_desc, 'item_total':item_total, 'product_name':product_name, 'po_no':po_no, 'entry_id':entry_id, 'issue_date':issue_date, 'vendor_code':vendor_code, 'po_quality':po_quality}])
  })   
});



function cleanData(data) {

  let thisData = data
  if (thisData.DESCRIPTOR == 0)
    thisData.DESCRIPTOR = ""
  thisData.REQUESTOR_DEPARTMENT = Number(thisData.REQUESTOR_DEPARTMENT)
  thisData.ITEM_DESC = (thisData.ITEM_DESC).replace("\"\\\"", "") 
  thisData.ITEM_DESC = (thisData.ITEM_DESC).replace("\"", "") 
  thisData.ITEM_DESC = thisData.ITEM_DESC.replace(/  |\r\n|\n|\r/gm, '');
  
  if ((thisData.UNIT_PRICE).includes(",")) {
    thisData.UNIT_PRICE = (thisData.UNIT_PRICE).replace(",", "")
  }
  thisData.UNIT_PRICE = Number(thisData.UNIT_PRICE)
  if ((thisData.ITEM_TOTAL_AMOUNT).includes(",")) {
    thisData.ITEM_TOTAL_AMOUNT = (thisData.ITEM_TOTAL_AMOUNT).replace(",", "")
  }
  thisData.ITEM_TOTAL_AMOUNT = Number(thisData.ITEM_TOTAL_AMOUNT)
  if ((thisData.PO_NO).includes("\n")) {
    thisData.PO_NO = (thisData.PO_NO).replace("\n", "")
  }
  thisData.PO_NO = Number(thisData.PO_NO)
  if ((thisData.ISSUE_DATE).includes("\\"))
    thisData.ISSUE_DATE = (thisData.ISSUE_DATE).replace("\\", "")
  thisData.VENDOR_CODE = Number(thisData.VENDOR_CODE)
  if ((thisData.PO_QUANTITY).includes(",")) {
    thisData.PO_QUANTITY = (thisData.PO_QUANTITY).replace(",", "")
  }
  thisData.PO_QUANTITY = Number(thisData.PO_QUANTITY)
}

  // for CSV - version outcome
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
  
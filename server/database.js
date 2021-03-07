const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const cleanData = require('./CleanData');

const nlpDataPath = path.join(__dirname, '/nlp-to-server/CoreNLPData.json');

/* -------------------- MySQL Implementation -------------------- */

function mySql() {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CS178!CD!dc',
  });

  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    
    con.query("CREATE DATABASE IF NOT EXISTS spendingData", (err, result) => {
      if (err) throw err;
      console.log("Database spendingData created");
    });
    
    con.query("USE spendingData", (err, result) => {
      if (err) throw err;
      console.log("Database spendingData used");
    });
    
    const userPassTable = "CREATE TABLE IF NOT EXISTS users (username VARCHAR(255), password VARCHAR(255), city VARCHAR(255), PRIMARY KEY(username))";
    const itemTable = "CREATE TABLE IF NOT EXISTS items (entry_id INT, username VARCHAR(255), vendor_name VARCHAR(255), descriptor VARCHAR(255), req_department INT, item_desc TEXT, unit_price INT, dep_desc TEXT, item_total INT, product_name TEXT, po_no INT, issue_date date, vendor_code INT, po_quantity INT, PRIMARY KEY(entry_id), FOREIGN KEY(username) REFERENCES users(username))";

    con.query(userPassTable, (err, result) => {
      if (err) throw err;
      console.log("Table userPassword created");
    });

    con.query(itemTable, (err, result) => {
      if (err) throw err;
      console.log("Table item created");
    });  
    
    async function jsonReader(filePath, cb) {
      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          return cb && cb(err)
        }
        try {
          const object = JSON.parse(fileData)
          return cb && cb(null, object)
        } catch (err) {
          return cb && cb(err)
        }
      });
    }
    
    jsonReader(nlpDataPath, (err, ret) => {
      if (err) {
        return err;
      }
      data = ret.PURCHASES;
      const values = [];

      for (let i = 0; i < data.length; i++) {
        let cleanedData = cleanData.CleanData(data[i]);
        values.push([cleanedData.ENTRY_ID, 'scotty@ucr.edu', cleanedData.VENDOR_NAME, cleanedData.DESCRIPTOR, cleanedData.REQUESTOR_DEPARTMENT, cleanedData.ITEM_DESC, cleanedData.UNIT_PRICE, cleanedData.DEPARTMENT_DESC, cleanedData.ITEM_TOTAL_AMOUNT, cleanedData.PRODUCT_NAME, cleanedData.PO_NO, cleanedData.ISSUE_DATE, cleanedData.VENDOR_CODE, cleanedData.PO_QUANTITY]);
      }
      const items = 'INSERT IGNORE INTO items (entry_id, username, vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, issue_date, vendor_code, po_quantity) VALUES ?';
      // let items = 'INSERT INTO items (entry_id, vendor_name, descriptor, req_department, item_desc, unit_price, dep_desc, item_total, product_name, po_no, issue_date, vendor_code) VALUES ?'
      const userPass = 'INSERT IGNORE INTO users VALUES (\'scotty@ucr.edu\', \'thebear\', \'riverside\')';
      
      con.query(userPass, (err, result) => {
        if (err) {
          throw err;
        } else {
          console.log("Table users successfully populated");
        }
      });
      
      con.query(items, [values], (err, result) => {
        if (err) {
          throw err;
        } else {
          console.log("Table items successfully populated");
        }
      });
    });   
  });
  return con;
}

module.exports = { mySql };

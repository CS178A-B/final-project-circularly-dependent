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
    const itemTable = "CREATE TABLE IF NOT EXISTS items (entry_id INT, username VARCHAR(255), product_name TEXT, descriptor VARCHAR(255), issue_date date, po_no INT, po_quantity INT, unit_price INT, item_total INT, vendor_name VARCHAR(255), vendor_code INT, dep_desc TEXT, req_department INT, item_desc TEXT, PRIMARY KEY(entry_id), FOREIGN KEY(username) REFERENCES users(username))";

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
        values.push([cleanedData.ENTRY_ID, 'scotty@ucr.edu', cleanedData.PRODUCT_NAME, cleanedData.DESCRIPTOR, cleanedData.ISSUE_DATE, cleanedData.PO_NO, cleanedData.PO_QUANTITY, cleanedData.UNIT_PRICE, cleanedData.ITEM_TOTAL_AMOUNT, cleanedData.VENDOR_NAME, cleanedData.VENDOR_CODE, cleanedData.DEPARTMENT_DESC, cleanedData.REQUESTOR_DEPARTMENT, cleanedData.ITEM_DESC]);
      }
      const items = 'INSERT IGNORE INTO items (entry_id, username, product_name, descriptor, issue_date, po_no, po_quantity, unit_price, item_total, vendor_name, vendor_code, dep_desc, req_department, item_desc) VALUES ?';
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

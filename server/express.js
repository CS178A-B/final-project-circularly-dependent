/* entry point for our application */
// Bringing in the express framework and sotre it in a constant 'express'
const express = require('express');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const database = require('./database');

// Save the port of our sever into a constant 'PORT'
// process.env.PORT checks our environment variables to see if we already have a PORT defined.
// if not, then we use PORT 4000
const PORT = process.env.PORT || 4000;
const app = express();
const con = database.mySql();

// Delay in mili-seconds
const timeout = delay => {
  return new Promise(res => setTimeout(res, delay));
}

/* -------------------- Server Configuration -------------------- */

// Serves up static Client build (React App)
app.use('/', express.static(path.join(__dirname, '../deep-capitalizer/build')));

// Allows server to upload data files
app.use(fileupload());

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

/* -------------------- Server API Endpoints -------------------- */

app.get('/test', (req, res) => {
  delayedRes = async () => {
    await timeout(500);
    res.status(200).json({ "message" : "> Counter poke from Server <" });
    console.log('Counter poke initiated');
  }
  delayedRes()
});

app.post('/signUp', (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  const city = req.body.city;

  // Check if proposed user already exists
  let sqlquery = 'SELECT username FROM users';
  con.query(sqlquery, (err, result) => {
    console.log('New user attempting sign up...')
    if (err) throw err;
    const existingUsers = result.map(entry => entry.username);

    if (existingUsers.includes(user)) {
      console.log(`Sign-up Unsucessful: sign-up attempted with existing username "${user}"`);
      res.status(409).json({ "message" : "This username already exists" });
    } else {
      // Add new user into database
      sqlquery = `INSERT INTO users VALUES ('${user}', '${pass}', '${city}')`;
      con.query(sqlquery, (err, result) => {
        if (err) throw err;
        console.log(result, `\nSign-up Sucessful: added "${user}" to user table from city "${city}"`);
        res.status(200).json({ "message" : "Sucessfully created new account" });
      });
    }
  });
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
  const dir = path.join(__dirname + '/../uploads/')
  let files = fs.readdirSync(dir);  
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

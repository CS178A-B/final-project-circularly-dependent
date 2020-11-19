/* entry point fo rour application*/

// Bringing in the express framework and sotre it in a constant 'express'
const express = require('express');
const path = require('path')

// Initializing the express framework and save it to another constant 'app'
const app = express();

// Save the port of our sever into a constant 'PORT'
// process.env.PORT checks our environment variables to see if we already have a PORT defined.
// if not, then we use PORT 4000
const PORT = process. env.PORT || 4000;

// the built-in listen method expects at least one argument : port number, 
//                                                           () is a callback function, log to the console.

// Serves up static Client build (React App)
app.use('/', express.static(path.join(__dirname, '../deep-capitalizer/build')));

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../deep-capitalizer/build', 'index.html'));
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.get('/testPage', (req, res) => {
  res.status(200).json({ "message" : "> Poke recieved & returned <" })
  console.log("Counter poke initiated")
});

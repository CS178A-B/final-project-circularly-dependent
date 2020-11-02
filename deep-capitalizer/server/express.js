/* entry point fo rour application*/

// Bringing in the express framework and sotre it in a constant 'express'
const express = require("express");

// Initializing the express framework and save it to another constant 'app'
const app = express();

// Save the port of our sever into a constant 'PORT'
// process.env.PORT checks our environment variables to see if we already have a PORT defined.
// if not, then we use PORT 4000
const PORT = process. env.PORT || 3000;

// the built-in listen method expects at least one argument : port number, 
//                                                           () is a callback function, log to the console.
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));


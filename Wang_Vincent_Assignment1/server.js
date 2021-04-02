// Vincent Wang - 3/25/21

// Code from Assignment1 Instructions
// creates our own server to host our website on
var express = require('express');
var app = express();


app.use(express.static('./public')); // Runs our public folder on the server
app.listen(8080, () => console.log('listening on wang 8080')); // Runs server on 8080

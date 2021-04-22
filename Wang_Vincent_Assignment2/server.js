// Vincent Wang - 3/25/21

// Code from Assignment1 Instructions
// creates our own server to host our website on
var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require('./public/products.js');
var products = data.products
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');
var fs = require('fs'); // Loads/ starts up fs system actions
const querystring = require('querystring');

// detects request for all and displays path - code taken from Lab 13 Ex 4
app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

app.post("/process_page", function (request, response, next) {
    //process_purchase(request.body, response);
    let POST = request.body;
    if (typeof POST['purchase_submit'] != 'undefined') {
    const stringified = querystring.stringify(POST);
    has_errors = false; // assume quantities are valid
    total_qty = 0; 
    for (i in products) {
        if (typeof POST[`quantity${i}`] != "undefined") {
            a_qty = POST[`quantity${i}`];
            // Sticky textboxes
            total_qty += a_qty; 
            if(!isNonNegInt(a_qty)) {
                has_errors = true; //invalid quantity error
            }
        }
    }
    // Respond to errors or redirect to invoice if no errors
    if(has_errors) {
        response.redirect("./products_display.html?" + stringified);
    } else if(total_qty == 0) { // if no quantity selection then alert
        response.redirect("./products_display.html?" + stringified);
    } else {
        response.redirect("./invoice.html?" + stringified);
    }
}
})

// Processes login form - code taken from Lab 13 Ex 4
app.post('/process_login', function (request, response, next) {
    response.send(request.body); 
});

// Processes register form - code taken from Lab 13 Ex 4
app.post('/process_register', function (request, response, next) {
    response.send(request.body); 
});

app.use(express.static('./public')); // Runs our public folder on the server
app.listen(8080, () => console.log('listening on wang 8080')); // Runs server on 8080

// function code from Invoice4
function isNonNegInt(q, returnErrors = false) {
    var errors = []; // assume that there are no errors
    if(q == "") q = 0; // Considers blank inputs as 0
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is number
    else if(q < 0) errors.push('Negative value!'); // Check if non-negative
    else if(parseInt(q) != q) errors.push('Not an integer!'); // Check if integer
    return returnErrors ? errors : (errors.length == 0);
    }

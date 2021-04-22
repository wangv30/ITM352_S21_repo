// Vincent Wang - 3/25/21

// Code from Assignment1 Instructions and from Getting started with Assignment 2 screencast
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
const { response } = require('express');

// Reads user_data.json - Lab 14 code
//user_data = require('./user_data.json');
//console.log(user_data["dport"]["password"])
var user_data_file = "./user_data.json";
if (fs.existsSync(user_data_file)) {
    var file_stats = fs.statSync(user_data_file)
//    console.log(`${user_data_file} has ${file_stats["size"]} characters`);
    var user_data = JSON.parse(fs.readFileSync(user_data_file, "utf-8"));
} else {
    console.log(`${user_data_file} does not exist!`);
}
//   console.log(user_data);

// detects request for all and displays path - code taken from Lab 13 Ex 4
app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

app.post("/process_page", function (request, response, next) {
    // following code same as code in products_display but modified
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
    // Respond to errors or redirect to login if no errors - response.redirect code found from Getting start with Assign. 2 screencast
    if(has_errors) { // if has errors then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified);
    } else if(total_qty == 0) { // if no quantity selection then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified);
    } else { // if nothing wrong then send user to login page
        response.redirect("./login.html?" + stringified);
    }
}
})

// Processes login form - part of code from Assignment 2 screencast
app.post('/process_login', function (request, response, next) {
    request.query["uname"] = request.body["uname"];
    let username_entered = request.body["uname"];
    let password_entered = request.body["psw"];
    if (typeof user_data[username_entered] != "undefined") {
        if (user_data[username_entered]["password"] == password_entered) {
        response.redirect("invoice.html?" + qs.stringify(request.query));
    } else {
        response.redirect("login.html?" + qs.stringify(request.query));
    }
} else {
    response.redirect("login.html?" + qs.stringify(request.query));
}
})


// Processes register form - part of code from Assignment 2 screencast
app.post('/process_register', function (request, response, next) {
    request.query["uname"] = request.body["uname"];  
    // add a new user to the DB
    username = request.body["uname"];
    user_data[username] = {};
    user_data[username].password = request.body["psw"];
    user_data[username].email = request.body["email"];
    user_data[username].name = request.body["fullname"];
    // save updated user_data to file (DB)
    fs.writeFileSync(user_data_file, JSON.stringify(user_data));
    response.redirect("invoice.html?" + qs.stringify(request.query)); 
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

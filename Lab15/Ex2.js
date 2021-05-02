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
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');

app.use(session({secret: "ITM352 rocks!"}));


// play with session
app.get("/set_session", function (request, response, next) {
    response.send(`Welcome, your session ID is ${request.session.id}`);
    next();
});

// play with session
app.get("/use_session", function (request, response, next) {
    response.send(`Welcome, your session ID is ${request.session.id}`);
    request.session.destroy();
    next();
});

// play with cookies
app.get("/set_cookie", function (request, response, next) {
    // console.log(request.cookies);
    let my_name = "Vincent Wang";
    response.cookie("my_name", my_name, {maxAge: 5000});
    response.send(`Cookie for ${my_name} sent`);
    next();
});

// play with cookies
app.get("/use_cookie", function (request, response, next) {
    // console.log(request.cookies);
    if (typeof request.cookies["my_name"] != "undefined") {
    response.send(`Hello ${request.cookies["my_name"]}!`);
    } else {
        response.send("I don't know you!");
    }
    next();
});

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
    if(typeof request.cookies["username"] != "undefined") {
        response.send(`${request.cookies["username"]} is already logged in`);
        return;
    }

    if(typeof request.session["last_login"] != "undefined") {
        console.log("Last login time was " + request.session["last_login"]);           
    } else {
        console.log("First time login")
    }
    request.session["last_login"] = Date();
    request.query["uname"] = request.body["uname"];
    let username_entered = request.body["uname"];
    let password_entered = request.body["psw"];
    if (typeof user_data[username_entered] != "undefined") {
        if (user_data[username_entered]["password"] == password_entered) {
        response.cookie("username", username_entered);
        response.redirect("invoice.html?" + qs.stringify(request.query));
    } else {
        response.redirect("login.html?" + qs.stringify(request.query));
    }
} else {
    response.redirect("login.html?" + qs.stringify(request.query));
}
})


// Processes register form - Modified Code from Prof Port's Assignment 2 screencast
app.post('/process_register', function (request, response, next) {
    request.query["uname"] = request.body["uname"];  
    request.query["email"] = request.body["email"]; 
    request.query["psw"] = request.body["psw"]; 
    request.query["pswRepeat"] = request.body["pswRepeat"];
    
    // USERNAME VALIDATION:
    // Checks to make sure there are no special char in uname - 
    // Code from https://www.dofactory.com/javascript/regular-expressions
    var unameRegex = /^[A-Za-z0-9]+$/
    // emailRegex checks to make sure that it is valid email
    var emailRegex = /[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+/g;
    if (unameRegex.test(request.body.uname)) {

    } else {
        response.redirect("register.html?" + qs.stringify(request.query));
    }
    // Sets uname to min of 4 char and max of 10 char
    if ((request.body.uname.length < 4) || (request.body.uname.length > 10)) {
        response.redirect("register.html?" + qs.stringify(request.query));
    }

    // PASSWORD VALIDATION:
    // Sets psw to min of 6 char
    if (request.body.psw.length < 6) {
        response.redirect("register.html?" + qs.stringify(request.query));
    }
    // Makes sure that both psw and pswRepeat are the same
    if (request.body.psw != request.body.pswRepeat){
        response.redirect("register.html?" + qs.stringify(request.query));
    }

    // EMAIL VALIDATION:
    // Checks whether email is in the proper format of an email address
    if (emailRegex.test(request.body.email)) {

    } else {
        response.redirect("register.html?" + qs.stringify(request.query));
    }

    

    // add a new user to the DB
    // Adds uname to user_data in lowercase to make uname case insensitive
    username = request.body["uname"].toLowerCase(); 
    user_data[username] = {};
    user_data[username].password = request.body["psw"];
    user_data[username].email = request.body["email"];
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

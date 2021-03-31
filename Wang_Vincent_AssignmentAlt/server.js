// Code from "getting started with Assignment1 screencast"
// creates our own server to host our website on

var products = require('./products.json');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
const querystring = require('querystring'); // Sets querystring module as variable "querystring"

// code taken from Assignment 1 Workshop slides
app.get("/product_data.js", function (req, res, next) {
    res.type('.js');
    res.send(`var products = ${JSON.stringify(products)};`);
    });     

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
    POST = request.body;
    if (typeof POST['submitPurchase'] != 'undefined') {
    for(i in products) { 
 
        if (isNonNegInt(q)) {
            response.redirect("./invoice.html");
        }
        else {
            window.location.href = "products_display.html"
        }
    }
}});

app.use(express.static('./public'));
app.listen(8080, () => console.log('listening on wang 8080'));

// function from invoice4
function isNonNegInt (q, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

function process_quantity_form (POST, response) {
    if (typeof POST['purchase_submit_button'] != 'undefined') {
        var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8');
        receipt = '';
        for(i in products) { 
            let q = POST[`quantity_textbox${i}`];
            let model = products[i]['model'];
            let model_price = products[i]['price'];
            if (isNonNegInt(q)) {
                receipt += eval('`' + contents + '`'); // render template string
            } else {
                receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
            }
        }
        response.send(receipt);
        response.end();
    }
}
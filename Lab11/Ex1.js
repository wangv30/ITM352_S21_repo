function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}


attributes = "Vincent;20;MIS"
parts = attributes.split(';'); 

for(part of parts) {
 //   console.log(isNonNegInt(part, true));
}

function callBack(part) {

}
parts.forEach(function (item) {
    console.log( (typeof item == 'string' && item.length > 0)?true:false ) 
}

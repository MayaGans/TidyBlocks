//var assert = require('assert');
var CSV = require("../../index");
var count = 0;
var start = new Date().getTime();

var file = __dirname + "/test.csv";
var options = {
    
    delimiter: ",",
    charset: "utf8"
}

CSV.parse(file, options, function (err, row, next, bytes) {
                
    if (err) {
        
        return console.log(err);
    }
    
    if (row !== null) {
        
        ++count;
        
        //console.log(row);
        
        next();
    }
    else {
        
        console.log(count + " Rows parsed in "+ ((new Date().getTime() - start) / 1000) + "s (" + (bytes / 1000000).toFixed(2) + "MB)");
    }
});

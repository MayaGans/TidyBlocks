var CSV = require("../../index");
var count = 0;
var start = new Date().getTime();

var file = __dirname + "/csv-file.csv";

var options = {
    delimiter: ",",
    charset: "utf8"
}

// push here the rows
var rows = [];

CSV.parse(file, options, function (err, row, next, bytes) {

    if (err) { return console.log(err); }

    if (row !== null) {
        ++count;
        rows.push(row);
        next();
    } else {
        console.log(count + " Rows parsed in "+ ((new Date().getTime() - start) / 1000) + "s (" + (bytes / 1000000).toFixed(2) + "MB)");
        console.log("Result:");
        console.log(JSON.stringify(rows, null, 2));
    }
});

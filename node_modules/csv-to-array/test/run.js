// require the library
var CsvToArray = require ("../index");

// and use it with explicit headers declaration...
CsvToArray ({
    csvOptions: {
        delimiter: ";"
    }
  , file: __dirname + "/input.csv"
  , columns: [
        "Head 1"
      , "Head 2"
      , "Head 3"
    ]
}, function (err, response) {
    console.log(err || JSON.stringify(response, null, 4));
});

// ...or with auto column detection.
CsvToArray ({
    csvOptions: {
        delimiter: ";"
    }
  , file: __dirname + "/inputWithHeaders.csv"
  , columns: true
}, function (err, response) {
    console.log(err || JSON.stringify(response, null, 4));
});

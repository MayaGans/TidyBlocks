// Dependencies
var Assert = require("assert")
  , CSV = require("../lib")
  ;

// Expectations
const EXPECT = {
  HEADERS: [
    ["Name", "Age", "Location"]
  , ["Alice", "15", "Europe"]
  , ["Bob", "17", "Asia"]
  , ["Carol", "70", "Africa"]
  ]
  , NO_HEADERS: [
    ["Alice", "15", "Europe"]
  , ["Bob", "17", "Asia"]
  , ["Carol", "70", "Africa"]
  ]
};

function gen(h) {
    return function (cb) {
        var rows = [];
        CSV.parse(__dirname + "/headers.csv", { headers: h }, function (err, row, next) {

            if (err) {
                return cb(err);
            }

            if (row === null) {
                Assert.deepEqual(rows, EXPECT[(!h ? "": "NO_") + "HEADERS"]);
                return cb();
            }

            rows.push(row);
            next();
        });
    }
}

// Include headers
it("should parse the csv file, with default options", gen(true));

// Exclude headers
it("should parse the csv file, handling the headers", gen(false));

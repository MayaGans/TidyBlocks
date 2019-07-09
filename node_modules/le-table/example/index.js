// Dependencies
var Table = require("../lib");

// Table data
var data = [
    ["Cell 1.1", "Cell 2.1", "Cell 3.1"]
  , ["Cell 1.2", {
        text: "Multi\nline\n\u001b[34mcell\ncontent that\u001b[0m is\n left aligned."
      , data: {
            hAlign: "left"
        }
    }, "Cell 3.2"]
  , ["Cell 1.3", "Cell 2.3", "Cell 3.3"]
  , ["Cell 1.4", "Cell 2.4", "Cell 3.4"]
];

// Table defaults
Table.defaults.marks = {
    nw: "┌"
  , n:  "─"
  , ne: "┐"
  , e:  "│"
  , se: "┘"
  , s:  "─"
  , sw: "└"
  , w:  "│"
  , b: " "
  , mt: "┬"
  , ml: "├"
  , mr: "┤"
  , mb: "┴"
  , mm: "┼"
};

// Create table instance
var myTable = new Table();

// Push data
for (var i = 0; i < data.length; ++i) {
    myTable.addRow([i].concat(data[i]), {
        hAlign: i > 2 ? "left": "right"
    });
}

// Output table
console.log(myTable.toString());

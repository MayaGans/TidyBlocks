const papa = require('papaparse');

var readCSV = function(url) {
    papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
            console.log(results.data)
        }
    });
}

window.readCSV = readCSV
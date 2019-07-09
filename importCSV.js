const papa = require('papaparse');

var readCSV = function(url) {
    papa.parse(url, {
        download: true,
        header: true
    });
}

window.readCSV = readCSV
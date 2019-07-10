const papa = require('papaparse');

var readCSV = function(url) {
    papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
            urlDF = results.data
            console.log(urlDF)
        }
    });
}
window.readCSV = readCSV
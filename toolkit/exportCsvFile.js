"use strict";

const papa = require('papaparse');
const file = require('./file.js');

function exportCsvFile (fileName, data) {
    const csv = papa.unparse(data);
    return file.write(fileName, csv);
};

module.exports = exportCsvFile;

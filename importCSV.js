const papa = require('papaparse');
const fs = require('fs');

// Read a text file form the file system.
function read (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf8",
            function (err, textFileData) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(textFileData);
            }
        );
    });
};

function importCsvFile (filePath) {
    return file.read(filePath)
        .then(textFileData => {
            const result = papa.parse(textFileData, {
                header: true,
               dynamicTyping: true,
  });
             return result.data;
        });
};

window.importCsvFile = importCsvFile
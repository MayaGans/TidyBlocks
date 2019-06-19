"use strict";

//
// Toolkit functions for reading and writing files.
//

const fs = require('fs');

//
// Read a text file form the file system.
//
function read (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf8",
            (err, textFileData) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(textFileData);
            }
        );
    });
};

//
// Write a text file to the file system.
//
function write (fileName, textFileData) {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, textFileData,
			(err) => {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			}
		);
	});
};

module.exports = {
	read: read,
	write: write,
};
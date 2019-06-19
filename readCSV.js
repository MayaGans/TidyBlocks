"use strict";

const importCsvFile = require('./toolkit/importCsvFile.js');

importCsvFile("./data/earthquakes.csv")
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.error("An error occurred.");
		console.error(err.stack);
	});

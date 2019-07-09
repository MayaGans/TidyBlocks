// Dependencies
var CSV = require("a-csv");
/**
 * CsvToArray
 * Converts CSV files to JSON arrays.
 *
 * Example
 *
 *  - File content:
 *
 *    ```csv
 *    1;2;3
 *    4;5;6
 *    ```
 *
 * ```js
 * var columns = ["column1", "column2", "column3"];
 * require("csv-to-array")({
 *    file: "path/to/input/file.csv",
 *    columns: columns
 * }, function (err, array) {
 *   console.log(err || array);
 * });
 * ```
 *
 * Output:
 *
 * ```json
 * [
 *     {
 *         "column1": "1",
 *         "column2": "2",
 *         "column3": "3"
 *     },
 *     {
 *         "column1": "4",
 *         "column2": "5",
 *         "column3": "6"
 *     }
 * ]
 * ```
 *
 * @name CsvToArray
 * @function
 * @param {Object} options Object containing the following fields:
 *
 *  - `csvOptions` (Object): The options that will be passed to the `a-csv` module (default: `{}`).
 *  - `file` (String): The CSV file path.
 *  - `collumns` (Array): An array of strings with the columns from CSV file.
 *
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
var CsvToArray = module.exports = function(options, callback) {

    // Validate callback
    callback = callback || function() {};
    if (typeof callback !== "function") {
        throw new Error(new Error("callback must be a function"));
    }

    // Set options defaults.
    options = Object(options);
    options.csvOptions = Object(options.csvOptions);
    options.file = String(options.file);

    // Validate columns (non empty array)
    if (options.columns === true) {
        options.columns = [];
    } else if (!options.columns || !options.columns.length || options.columns.constructor !== Array) {
        return callback(new Error("columns must be a non empty array"));
    }

    // This will be the array generated from csv data
    var array = [];

    // Start csv parsing
    CSV.parse(options.file, options.csvOptions, function(err, row, next) {
        if (err) {
            return callback(err);
        }
        if (options.columns.length === 0) {
            options.columns = row;
            return next();
        }
        if (row !== null) {
            var cRow = {};

            // Each column from row
            for (var i = 0; i < options.columns.length; ++i) {
                cRow[options.columns[i]] = row[i];
            }

            array.push(cRow);
            return next();
        }

        callback(null, array);
    });
};

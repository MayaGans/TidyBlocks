// Dependencies
var fs = require("fs");
var iconv = require("iconv-lite");

// Constructor
var CSV = module.exports = {};

/**
 * parse
 * Parses CSV files.
 *
 * @name parse
 * @function
 * @param {String} path Path to CSV file.
 * @param {Object} options An object containing the following properties:
 *
 *  - `delimiter` (String): The CSV delimiter (default: ",").
 *  - `length` (Number): The buffer size (default: `8 * 1024`).
 *  - `charset` (String): The charset (default: `"utf8"`).
 *  - `headers` (Boolean): A flag to indicate if the file contains headers or not (default: `false`).
 *
 * @param {Function} rowHandler The row handler callback (called with `err`, `data`, `next` arguments).
 */
CSV.parse = function(path, options, rowHandler) {
    // TODO parse csv from network stream

    // ckeck arguments
    if (typeof options == "function") {
        rowHandler = options;
    } else if (typeof rowHandler != "function") {
        throw new Error("Callback is mandatory");
    }

    if (typeof path != "string") {
        throw new Error("Invalid Path");
    }

    // Open file
    fs.open(path, "r", function(err, fd) {

        if (err) {
            rowHandler(err);
        } else {

            // default values
            var delimiter = options.delimiter || ",";
            var length = options.bufferSize || 8 * 1024;
            var charset = options.charset || "utf8";

            // init values
            var buffer = new Buffer(length);
            var strBuffer = "";
            var current = -1;
            var rows = [];
            var theEnd = false;
            var size = 0;
            var handleRow = function() {

                // fire rowHandler if there still rows to emit
                if (typeof rows[++current] != "undefined") {
                    // fire callback with row data
                    if (options.headers && current === 0) { return handleRow(); }
                    rowHandler(null, CSVRowToArray(rows[current], delimiter), handleRow, size);
                }

                // if no more rows are left and the end is reached,
                // close file end send empty callback
                else if (theEnd) {

                    fs.close(fd, function() {

                        // end recursive function calls
                        rowHandler(null, null, function() {}, size);
                    });
                }

                // read a bit more
                else {

                    // fill buffer with emptiness
                    buffer.fill(0);

                    fs.read(fd, buffer, 0, length, null, function(err, bytesRead, buffer) {

                        if (err) {
                            rowHandler(err);
                        } else {

                            size += bytesRead;

                            // reset current row status
                            current = -1;

                            // update string buffer
                            if (charset == "utf8") {
                                strBuffer += buffer.toString("utf8", 0, bytesRead);
                            }
                            // convert string to utf8
                            else {
                                // TODO recognize charset
                                strBuffer += iconv.decode(bytesRead < length ? buffer.slice(0, bytesRead) : buffer, charset);
                            }

                            // convert line endings
                            strBuffer = strBuffer.replace(/\r\n|\n\r|\r/g, "\n");

                            // create rows
                            rows = strBuffer.split(/\n/);

                            // indicate that no more data will be read from file
                            if (bytesRead < length) {
                                theEnd = true;
                            } else {
                                // set buffer to the last "incomplete" row if not at the end of file
                                strBuffer = rows.pop();
                            }

                            // continue
                            handleRow();
                        }
                    });
                }
            };

            // start parsing
            handleRow();
        }
    });
};


/**
 * stringify
 * Stringifies a CSV array.
 *
 * @name stringify
 * @function
 * @param {Array} csvArray The CSV array.
 * @param {String} delimiter The delimiter (default: `","`).
 * @param {Object} lineBreak The line break delimiter (default: `"\r\n"`).
 * @return {String} The stringified CSV array.
 */
CSV.stringify = function (csvArray, delimiter, lineBreak) {
    // TODO make stringify async

    //default values
    delimiter = delimiter || ",";
    lineBreak = lineBreak || "\r\n";

    var string = "";
    for (var i = 0, l = csvArray.length; i < l; ++i) {
        var cell = csvArray[i] && csvArray[i].toString ? csvArray[i].toString() : "";
        if (cell) {
            // use quotation marks when delimiter is found in a cell
            if (cell.indexOf(delimiter) > -1) {
                if (cell.indexOf('"') > -1) {
                    cell = cell.replace('"', '\"');
                }
                cell = '"' + cell + '"';
            }

            string += cell + delimiter;
        } else string += delimiter;
    }

    string += lineBreak;

    return string;
};

/*!
 * CSVRowToArray
 * This will parse a delimited string into an array.
 * The default delimiter is the comma, but this
 * can be overriden in the second argument.
 *
 * @name CSVRowToArray
 * @function
 * @param {String} strData The input string value.
 * @param {String} strDelimiter The CSV field delimiter.
 * @return {Array|null} The CSV array parsed from input string. `null` if the input is an empty string.
 */
function CSVRowToArray(strData, strDelimiter) {

    // return if strData is an empty array
    if (strData === "") {
        return null;
    }

    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = strDelimiter || ",";

    // If strData begins with a comma
    if (strData[0] === strDelimiter) {
        // Add one more comma
        strData = strDelimiter + strData;
    }


    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((

        // Delimiters.
        "(\\" + strDelimiter + "|^)" +

        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

        // Standard fields.
        "([^\"\\" + strDelimiter + "]*))"
    ), "gi");

    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = [];

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Let's check to see which kind of value we
        // captured (quoted or unquoted).
        var strMatchedValue;

        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];
        }

        // Now that we have our value string, let's add
        // it to the data array.
        arrData.push(strMatchedValue);
    }

    // Return the parsed data.
    return arrData;
}

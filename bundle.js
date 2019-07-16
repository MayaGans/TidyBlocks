(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const papa = require('papaparse');
const dataForge = require('data-forge')

var readCSV = function(my_url) {

    var request = new XMLHttpRequest()
        request.open('GET', my_url, false)  // `false` makes the request synchronous
        request.send(null)
    if (request.status !== 200) {
        console.log('ERROR')
   } else {
     result = papa.parse(request.responseText, {
        header: true
     })
   }
   df = result.data
   data = new TidyBlocksDF(df)
   return data
}

window.readCSV = readCSV
},{"data-forge":3,"papaparse":61}],2:[function(require,module,exports){
(function (Buffer){
var clone = (function() {
'use strict';

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
*/
function clone(parent, circular, depth, prototype) {
  var filter;
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    filter = circular.filter;
    circular = circular.circular
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth == 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
};
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
};
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
};
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
};
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

}).call(this,require("buffer").Buffer)
},{"buffer":68}],3:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./lib/index");
exports.Index = index_1.Index;
var series_1 = require("./lib/series");
exports.Series = series_1.Series;
var dataframe_1 = require("./lib/dataframe");
exports.DataFrame = dataframe_1.DataFrame;
var _1 = require(".");
var _2 = require(".");
var utils_1 = require("./lib/utils");
var util_1 = require("util");
// @ts-ignore
var dayjs_1 = __importDefault(require("dayjs"));
// @ts-ignore
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(customParseFormat_1.default);
// @ts-ignore
var papaparse_1 = __importDefault(require("papaparse"));
;
/**
 * Convert a regular JavaScript obejct to a dataframe.
 * Each row in the dataframe represents a field from the object.
 *
 * @param obj - The JavaScript object to convert to a dataframe.
 *
 * @returns Returns a dataframe that lists the fields in the pass-in object.
 */
function fromObject(obj) {
    return new _2.DataFrame(Object.keys(obj)
        .map(function (fieldName) { return ({
        Field: fieldName,
        Value: obj[fieldName],
    }); }));
}
exports.fromObject = fromObject;
/**
 * Deserialize a dataframe from a JSON text string.
 *
 * @param jsonTextString The JSON text to deserialize.
 *
 * @returns Returns a dataframe that has been deserialized from the JSON data.
 */
function fromJSON(jsonTextString) {
    if (!utils_1.isString(jsonTextString))
        throw new Error("Expected 'jsonTextString' parameter to 'dataForge.fromJSON' to be a string containing data encoded in the JSON format.");
    return new _2.DataFrame({
        values: JSON.parse(jsonTextString)
    });
}
exports.fromJSON = fromJSON;
/**
 * Deserialize a DataFrame from a CSV text string.
 *
 * @param csvTextString The CSV text to deserialize.
 * @param [config] Optional configuration options for parsing the CSV data.
 *
 * @returns Returns a dataframe that has been deserialized from the CSV data.
 */
function fromCSV(csvTextString, config) {
    if (!utils_1.isString(csvTextString))
        throw new Error("Expected 'csvTextString' parameter to 'dataForge.fromCSV' to be a string containing data encoded in the CSV format.");
    if (config) {
        if (!utils_1.isObject(config))
            throw new Error("Expected 'config' parameter to 'dataForge.fromCSV' to be an object with CSV parsing configuration options.");
        if (config.columnNames) {
            if (!util_1.isFunction(config.columnNames[Symbol.iterator])) {
                if (!utils_1.isArray(config.columnNames))
                    throw new Error("Expect 'columnNames' field of 'config' parameter to DataForge.fromCSV to be an array or iterable of strings that specifies column names.");
            }
            try {
                for (var _a = __values(config.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (!utils_1.isString(columnName))
                        throw new Error("Expect 'columnNames' field of 'config' parameter to DataForge.fromCSV to be an array of strings that specify column names.");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (config.skipEmptyLines === undefined) {
            config = Object.assign({}, config); // Clone the config. Don't want to modify the original.
            config.skipEmptyLines = true;
        }
    }
    else {
        config = {
            skipEmptyLines: true,
        };
    }
    var parsed = papaparse_1.default.parse(csvTextString, config);
    var rows = parsed.data;
    if (rows.length === 0) {
        return new _2.DataFrame();
    }
    var columnNames;
    rows = rows.map(function (row) {
        return row.map(function (cell) { return utils_1.isString(cell) ? cell.trim() : cell; }); // Trim each cell that is still a string.
    });
    if (config && config.columnNames) {
        columnNames = config.columnNames;
    }
    else {
        columnNames = rows.shift();
    }
    return new _2.DataFrame({
        rows: rows,
        columnNames: columnNames,
    });
    var e_1, _c;
}
exports.fromCSV = fromCSV;
var concat = _1.Series.concat;
exports.concatSeries = concat;
var zip = _1.Series.zip;
exports.zipSeries = zip;
/**
 * Generate a series from a range of numbers.
 *
 * @param start - The value of the first number in the range.
 * @param count - The number of sequential values in the range.
 *
 * @returns Returns a series with a sequence of generated values. The series contains 'count' values beginning at 'start'.
 */
function range(start, count) {
    if (!utils_1.isNumber(start))
        throw new Error("Expect 'start' parameter to 'dataForge.range' function to be a number.");
    if (!utils_1.isNumber(count))
        throw new Error("Expect 'count' parameter to 'dataForge.range' function to be a number.");
    var values = [];
    for (var valueIndex = 0; valueIndex < count; ++valueIndex) {
        values.push(start + valueIndex);
    }
    return new _1.Series(values);
}
exports.range = range;
/**
 * Replicate a particular value N times to create a series.
 *
 * @param value The value to replicate.
 * @param count The number of times to replicate the value.
 *
 * @returns Returns a new series that contains N copies of the value.
 */
function replicate(value, count) {
    var values = [];
    for (var i = 0; i < count; ++i) {
        values.push(value);
    }
    return new _1.Series(values);
}
exports.replicate = replicate;
/**
 * Generate a data-frame containing a matrix of values.
 *
 * @param numColumns - The number of columns in the data-frame.
 * @param numRows - The number of rows in the data-frame.
 * @param start - The starting value.
 * @param increment - The value to increment by for each new value.
 *
 * @returns Returns a dataframe that contains a matrix of generated values.
 */
function matrix(numColumns, numRows, start, increment) {
    if (!utils_1.isNumber(numColumns))
        throw new Error("Expect 'numColumns' parameter to 'dataForge.matrix' function to be a number.");
    if (!utils_1.isNumber(numRows))
        throw new Error("Expect 'numRows' parameter to 'dataForge.matrix' function to be a number.");
    if (!utils_1.isNumber(start))
        throw new Error("Expect 'start' parameter to 'dataForge.matrix' function to be a number.");
    if (!utils_1.isNumber(increment))
        throw new Error("Expect 'increment' parameter to 'dataForge.matrix' function to be a number.");
    var rows = [];
    var columnNames = [];
    var nextValue = start;
    for (var colIndex = 0; colIndex < numColumns; ++colIndex) {
        columnNames.push((colIndex + 1).toString());
    }
    for (var rowIndex = 0; rowIndex < numRows; ++rowIndex) {
        var row = [];
        for (var colIndex = 0; colIndex < numColumns; ++colIndex) {
            row.push(nextValue + (colIndex * increment));
        }
        nextValue += numColumns * increment;
        rows.push(row);
    }
    return new _2.DataFrame({
        columnNames: columnNames,
        rows: rows,
    });
}
exports.matrix = matrix;

},{".":3,"./lib/dataframe":4,"./lib/index":5,"./lib/series":53,"./lib/utils":54,"dayjs":56,"dayjs/plugin/customParseFormat":57,"papaparse":55,"util":73}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var empty_iterable_1 = require("./iterables/empty-iterable");
var count_iterable_1 = require("./iterables/count-iterable");
var multi_iterable_1 = require("./iterables/multi-iterable");
var select_iterable_1 = require("./iterables/select-iterable");
var select_many_iterable_1 = require("./iterables/select-many-iterable");
var take_iterable_1 = require("./iterables/take-iterable");
var take_while_iterable_1 = require("./iterables/take-while-iterable");
var where_iterable_1 = require("./iterables/where-iterable");
var concat_iterable_1 = require("./iterables/concat-iterable");
var dataframe_window_iterable_1 = require("./iterables/dataframe-window-iterable");
var reverse_iterable_1 = require("./iterables/reverse-iterable");
var zip_iterable_1 = require("./iterables/zip-iterable");
var csv_rows_iterable_1 = require("./iterables/csv-rows-iterable");
var distinct_iterable_1 = require("./iterables/distinct-iterable");
var dataframe_rolling_window_iterable_1 = require("./iterables/dataframe-rolling-window-iterable");
var dataframe_variable_window_iterable_1 = require("./iterables/dataframe-variable-window-iterable");
var ordered_iterable_1 = require("./iterables/ordered-iterable");
var index_1 = require("./index");
var extract_element_iterable_1 = require("./iterables/extract-element-iterable");
var skip_iterable_1 = require("./iterables/skip-iterable");
var skip_while_iterable_1 = require("./iterables/skip-while-iterable");
// @ts-ignore
var easy_table_1 = __importDefault(require("easy-table"));
// @ts-ignore
var dayjs_1 = __importDefault(require("dayjs"));
var series_1 = require("./series");
var column_names_iterable_1 = require("./iterables/column-names-iterable");
var utils_1 = require("./utils");
// @ts-ignore
var papaparse_1 = __importDefault(require("papaparse"));
;
/**
 * Class that represents a dataframe.
 * A dataframe contains an indexed sequence of data records.
 * Think of it as a spreadsheet or CSV file in memory.
 *
 * Each data record contains multiple named fields, the value of each field represents one row in a column of data.
 * Each column of data is a named {@link Series}.
 * You think of a dataframe a collection of named data series.
 *
 * @typeparam IndexT The type to use for the index.
 * @typeparam ValueT The type to use for each row/data record.
 */
var DataFrame = /** @class */ (function () {
    /**
     * Create a dataframe.
     *
     * @param config This can be an array, a configuration object or a function that lazily produces a configuration object.
     *
     * It can be an array that specifies the data records that the dataframe contains.
     *
     * It can be a {@link IDataFrameConfig} that defines the data and configuration of the dataframe.
     *
     * Or it can be a function that lazily produces a {@link IDataFrameConfig}.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame();
     * </pre>
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame([ { A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({ index: [1, 2, 3, 4], values: [ { A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }] });
     * </pre>
     *
     * @example
     * <pre>
     *
     * const lazyInit = () => ({ index: [1, 2, 3, 4], values: [ { A: 10 }, { A: 20 }, { A: 30 }, { A: 40 }] });
     * const df = new DataFrame(lazyInit);
     * </pre>
     */
    function DataFrame(config) {
        //
        // Function to lazy evaluate the configuration of the dataframe.
        //
        this.configFn = null;
        //
        // The content of the dataframe.
        // When this is null it means the dataframe is yet to be lazy initialised.
        //
        this.content = null;
        if (config) {
            if (utils_1.isFunction(config)) {
                this.configFn = config;
            }
            else if (utils_1.isArray(config) ||
                utils_1.isFunction(config[Symbol.iterator])) {
                this.content = DataFrame.initFromArray(config);
            }
            else {
                this.content = DataFrame.initFromConfig(config);
            }
        }
        else {
            this.content = DataFrame.initEmpty();
        }
    }
    //
    // Initialise dataframe content from an iterable of values.
    //
    DataFrame.initFromArray = function (arr) {
        var firstResult = arr[Symbol.iterator]().next();
        var columnNames = !firstResult.done ? Object.keys(firstResult.value) : [];
        return {
            index: DataFrame.defaultCountIterable,
            values: arr,
            pairs: new multi_iterable_1.MultiIterable([DataFrame.defaultCountIterable, arr]),
            isBaked: true,
            columnNames: columnNames,
        };
    };
    //
    // Initialise an empty dataframe.
    //
    DataFrame.initEmpty = function () {
        return {
            index: DataFrame.defaultEmptyIterable,
            values: DataFrame.defaultEmptyIterable,
            pairs: DataFrame.defaultEmptyIterable,
            isBaked: true,
            columnNames: [],
        };
    };
    //
    // Initialise dataframe column names.
    //
    DataFrame.initColumnNames = function (inputColumnNames) {
        var outputColumnNames = [];
        var columnNamesMap = {};
        try {
            // Search for duplicate column names.
            for (var inputColumnNames_1 = __values(inputColumnNames), inputColumnNames_1_1 = inputColumnNames_1.next(); !inputColumnNames_1_1.done; inputColumnNames_1_1 = inputColumnNames_1.next()) {
                var columnName = inputColumnNames_1_1.value;
                var columnNameLwr = columnName.toLowerCase();
                if (columnNamesMap[columnNameLwr] === undefined) {
                    columnNamesMap[columnNameLwr] = 1;
                }
                else {
                    columnNamesMap[columnNameLwr] += 1;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (inputColumnNames_1_1 && !inputColumnNames_1_1.done && (_a = inputColumnNames_1.return)) _a.call(inputColumnNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var columnNoMap = {};
        try {
            for (var inputColumnNames_2 = __values(inputColumnNames), inputColumnNames_2_1 = inputColumnNames_2.next(); !inputColumnNames_2_1.done; inputColumnNames_2_1 = inputColumnNames_2.next()) {
                var columnName = inputColumnNames_2_1.value;
                var columnNameLwr = columnName.toLowerCase();
                if (columnNamesMap[columnNameLwr] > 1) {
                    var curColumnNo = 1;
                    // There are duplicates of this column.
                    if (columnNoMap[columnNameLwr] !== undefined) {
                        curColumnNo = columnNoMap[columnNameLwr];
                    }
                    outputColumnNames.push(columnName + "." + curColumnNo);
                    columnNoMap[columnNameLwr] = curColumnNo + 1;
                }
                else {
                    // No duplicates.
                    outputColumnNames.push(columnName);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (inputColumnNames_2_1 && !inputColumnNames_2_1.done && (_b = inputColumnNames_2.return)) _b.call(inputColumnNames_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return outputColumnNames;
        var e_1, _a, e_2, _b;
    };
    //
    // Check that a value is an interable.
    //
    DataFrame.checkIterable = function (input, fieldName) {
        if (utils_1.isArray(input)) {
            // Ok
        }
        else if (utils_1.isFunction(input[Symbol.iterator])) {
            // Assume it's an iterable.
            // Ok
        }
        else {
            // Not ok
            throw new Error("Expected '" + fieldName + "' field of DataFrame config object to be an array of values or an iterable of values.");
        }
    };
    ;
    //
    // Initialise dataframe content from a config object.
    //
    DataFrame.initFromConfig = function (config) {
        var index;
        var values;
        var pairs;
        var isBaked = false;
        var columnNames;
        if (config.pairs) {
            DataFrame.checkIterable(config.pairs, "pairs");
            pairs = config.pairs;
        }
        if (config.columns) {
            var columnsConfig = config.columns;
            if (utils_1.isArray(columnsConfig) ||
                utils_1.isFunction(columnsConfig[Symbol.iterator])) {
                var iterableColumnsConfig = columnsConfig;
                columnNames = Array.from(iterableColumnsConfig).map(function (column) { return column.name; });
                columnsConfig = utils_1.toMap(iterableColumnsConfig, function (column) { return column.name; }, function (column) { return column.series; });
            }
            else {
                if (!utils_1.isObject(columnsConfig))
                    throw new Error("Expected 'columns' member of 'config' parameter to DataFrame constructor to be an object with fields that define columns.");
                columnNames = Object.keys(columnsConfig);
            }
            var columnIterables = [];
            try {
                for (var columnNames_1 = __values(columnNames), columnNames_1_1 = columnNames_1.next(); !columnNames_1_1.done; columnNames_1_1 = columnNames_1.next()) {
                    var columnName = columnNames_1_1.value;
                    DataFrame.checkIterable(columnsConfig[columnName], columnName);
                    columnIterables.push(columnsConfig[columnName]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (columnNames_1_1 && !columnNames_1_1.done && (_a = columnNames_1.return)) _a.call(columnNames_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            values = new csv_rows_iterable_1.CsvRowsIterable(columnNames, new multi_iterable_1.MultiIterable(columnIterables));
        }
        else {
            if (config.columnNames) {
                columnNames = this.initColumnNames(config.columnNames);
            }
            if (config.rows) {
                if (!config.columnNames) {
                    columnNames = new select_iterable_1.SelectIterable(new count_iterable_1.CountIterable(), function (c) { return "Column." + c.toString(); });
                }
                DataFrame.checkIterable(config.rows, 'rows');
                values = new csv_rows_iterable_1.CsvRowsIterable(columnNames, config.rows); // Convert data from rows to columns.
            }
            else if (config.values) {
                DataFrame.checkIterable(config.values, 'values');
                values = config.values;
                if (!config.columnNames) {
                    columnNames = new column_names_iterable_1.ColumnNamesIterable(values, config.considerAllRows || false);
                }
            }
            else if (pairs) {
                values = new extract_element_iterable_1.ExtractElementIterable(pairs, 1);
                if (!config.columnNames) {
                    columnNames = new column_names_iterable_1.ColumnNamesIterable(values, config.considerAllRows || false);
                }
            }
            else {
                values = DataFrame.defaultEmptyIterable;
                if (!config.columnNames) {
                    columnNames = DataFrame.defaultEmptyIterable;
                }
            }
        }
        if (config.index) {
            DataFrame.checkIterable(config.index, 'index');
            index = config.index;
        }
        else if (pairs) {
            index = new extract_element_iterable_1.ExtractElementIterable(pairs, 0);
        }
        else {
            index = DataFrame.defaultCountIterable;
        }
        if (!pairs) {
            pairs = new multi_iterable_1.MultiIterable([index, values]);
        }
        if (config.baked !== undefined) {
            isBaked = config.baked;
        }
        return {
            index: index,
            values: values,
            pairs: pairs,
            isBaked: isBaked,
            columnNames: columnNames,
        };
        var e_3, _a;
    };
    //
    // Ensure the dataframe content has been initialised.
    //
    DataFrame.prototype.lazyInit = function () {
        if (this.content === null && this.configFn !== null) {
            this.content = DataFrame.initFromConfig(this.configFn());
        }
    };
    //
    // Ensure the dataframe content is lazy initalised and return it.
    //
    DataFrame.prototype.getContent = function () {
        this.lazyInit();
        return this.content;
    };
    /**
     * Get an iterator to enumerate the rows of the dataframe.
     * Enumerating the iterator forces lazy evaluation to complete.
     * This function is automatically called by `for...of`.
     *
     * @return An iterator for the dataframe.
     *
     * @example
     * <pre>
     *
     * for (const row of df) {
     *     // ... do something with the row ...
     * }
     * </pre>
     */
    DataFrame.prototype[Symbol.iterator] = function () {
        return this.getContent().values[Symbol.iterator]();
    };
    /**
     * Get the names of the columns in the dataframe.
     *
     * @return Returns an array of the column names in the dataframe.
     *
     * @example
     * <pre>
     *
     * console.log(df.getColumnNames());
     * </pre>
     */
    DataFrame.prototype.getColumnNames = function () {
        return Array.from(this.getContent().columnNames);
    };
    /**
     * Retreive the collection of all columns in the dataframe.
     *
     * @return Returns a {@link Series} containing the names of the columns in the dataframe.
     *
     * @example
     * <pre>
     *
     * for (const column in df.getColummns()) {
     *      console.log("Column name: ");
     *      console.log(column.name);
     *
     *      console.log("Data:");
     *      console.log(column.series.toArray());
     * }
     * </pre>
     */
    DataFrame.prototype.getColumns = function () {
        var _this = this;
        return new series_1.Series(function () {
            var columnNames = _this.getColumnNames();
            return {
                values: columnNames.map(function (columnName) {
                    var series = _this.getSeries(columnName).skipWhile(function (value) { return value === undefined; });
                    var firstValue = series.any() ? series.first() : undefined;
                    return {
                        name: columnName,
                        type: utils_1.determineType(firstValue),
                        series: series,
                    };
                }),
            };
        });
    };
    /**
     * Cast the value of the dataframe to a new type.
     * This operation has no effect but to retype the value that the dataframe contains.
     *
     * @return The same dataframe, but with the type changed.
     *
     * @example
     * <pre>
     *
     * const castDf = df.cast<SomeOtherType>();
     * </pre>
     */
    DataFrame.prototype.cast = function () {
        return this;
    };
    /**
     * Get the index for the dataframe.
     *
     * @return The {@link Index} for the dataframe.
     *
     * @example
     * <pre>
     *
     * const index = df.getIndex();
     * </pre>
     */
    DataFrame.prototype.getIndex = function () {
        var _this = this;
        return new index_1.Index(function () { return ({ values: _this.getContent().index }); });
    };
    /**
     * Set a named column as the {@link Index} of the dataframe.
     *
     * @param columnName Name of the column to use as the new {@link Index} of the returned dataframe.
     *
     * @return Returns a new dataframe with the values of the specified column as the new {@link Index}.
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.setIndex("SomeColumn");
     * </pre>
     */
    DataFrame.prototype.setIndex = function (columnName) {
        if (!utils_1.isString(columnName))
            throw new Error("Expected 'columnName' parameter to 'DataFrame.setIndex' to be a string that specifies the name of the column to set as the index for the dataframe.");
        return this.withIndex(this.getSeries(columnName));
    };
    /**
     * Apply a new {@link Index} to the dataframe.
     *
     * @param newIndex The new array or iterable to be the new {@link Index} of the dataframe. Can also be a selector to choose the {@link Index} for each row in the dataframe.
     *
     * @return Returns a new dataframe or dataframe with the specified {@link Index} attached.
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex([10, 20, 30]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex(df.getSeries("SomeColumn"));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex(row => row.SomeColumn);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedDf = df.withIndex(row => row.SomeColumn + 20);
     * </pre>
     */
    DataFrame.prototype.withIndex = function (newIndex) {
        var _this = this;
        if (utils_1.isFunction(newIndex)) {
            return new DataFrame(function () {
                var content = _this.getContent();
                return {
                    columnNames: content.columnNames,
                    values: content.values,
                    index: _this.deflate(newIndex),
                };
            });
        }
        else {
            DataFrame.checkIterable(newIndex, 'newIndex');
            return new DataFrame(function () {
                var content = _this.getContent();
                return {
                    columnNames: content.columnNames,
                    values: content.values,
                    index: newIndex,
                };
            });
        }
    };
    /**
     * Resets the {@link Index} of the dataframe back to the default zero-based sequential integer index.
     *
     * @return Returns a new dataframe with the {@link Index} reset to the default zero-based index.
     *
     * @example
     * <pre>
     *
     * const dfWithResetIndex = df.resetIndex();
     * </pre>
     */
    DataFrame.prototype.resetIndex = function () {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: content.values,
            };
        });
    };
    /**
     * Extract a {@link Series} from a named column in the dataframe.
     *
     * @param columnName Specifies the name of the column that contains the {@link Series} to retreive.
     *
     * @return Returns the {@link Series} extracted from the named column in the dataframe.
     *
     * @example
     * <pre>
     *
     * const series = df.getSeries("SomeColumn");
     * </pre>
     */
    DataFrame.prototype.getSeries = function (columnName) {
        var _this = this;
        if (!utils_1.isString(columnName))
            throw new Error("Expected 'columnName' parameter to 'DataFrame.getSeries' function to be a string that specifies the name of the column to retreive.");
        return new series_1.Series(function () { return ({
            values: new select_iterable_1.SelectIterable(_this.getContent().values, function (row) { return row[columnName]; }),
            index: _this.getContent().index,
        }); });
    };
    /**
     * Determine if the dataframe contains a {@link Series} the specified named column.
     *
     * @param columnName Name of the column to check for.
     *
     * @return Returns true if the dataframe contains the requested {@link Series}, otherwise returns false.
     *
     * @example
     * <pre>
     *
     * if (df.hasSeries("SomeColumn")) {
     *      // ... the dataframe contains a series with the specified column name ...
     * }
     * </pre>
     */
    DataFrame.prototype.hasSeries = function (columnName) {
        var columnNameLwr = columnName.toLowerCase();
        try {
            for (var _a = __values(this.getColumnNames()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var existingColumnName = _b.value;
                if (existingColumnName.toLowerCase() === columnNameLwr) {
                    return true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
        var e_4, _c;
    };
    /**
     * Verify the existence of a name column and extracts the {@link Series} for it.
     * Throws an exception if the requested column doesn't exist.
     *
     * @param columnName Name of the column to extract.
     *
     * @return Returns the {@link Series} for the column if it exists, otherwise it throws an exception.
     *
     * @example
     * <pre>
     *
     * try {
     *      const series = df.expectSeries("SomeColumn");
     *      // ... do something with the series ...
     * }
     * catch (err) {
     *      // ... the dataframe doesn't contain the column "SomeColumn" ...
     * }
     * </pre>
     */
    DataFrame.prototype.expectSeries = function (columnName) {
        if (!this.hasSeries(columnName)) {
            throw new Error("Expected dataframe to contain series with column name: '" + columnName + "'.");
        }
        return this.getSeries(columnName);
    };
    /**
     * Create a new dataframe with a replaced or additional column specified by the passed-in series.
     *
     * @param columnNameOrSpec The name of the column to add or replace or a {@link IColumnGenSpec} that defines the columns to add.
     * @param [series] When columnNameOrSpec is a string that identifies the column to add, this specifies the {@link Series} to add to the dataframe or a function that produces a series (given a dataframe).
     *
     * @return Returns a new dataframe replacing or adding a particular named column.
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries("ANewColumn", new Series([1, 2, 3]));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries("ANewColumn", df =>
     *      df.getSeries("SourceData").select(aTransformation)
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries({
     *      ANewColumn: new Series([1, 2, 3]),
     *      SomeOtherColumn: new Series([10, 20, 30])
     * });
     * <pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.withSeries({
     *      ANewColumn: df => df.getSeries("SourceData").select(aTransformation))
     * });
     * <pre>
     */
    DataFrame.prototype.withSeries = function (columnNameOrSpec, series) {
        var _this = this;
        if (!utils_1.isObject(columnNameOrSpec)) {
            if (!utils_1.isString(columnNameOrSpec))
                throw new Error("Expected 'columnNameOrSpec' parameter to 'DataFrame.withSeries' function to be a string that specifies the column to set or replace.");
            if (!utils_1.isFunction(series)) {
                if (!utils_1.isObject(series))
                    throw new Error("Expected 'series' parameter to 'DataFrame.withSeries' to be a Series object or a function that takes a dataframe and produces a Series.");
            }
        }
        else {
            if (!utils_1.isUndefined(series))
                throw new Error("Expected 'series' parameter to 'DataFrame.withSeries' to not be set when 'columnNameOrSpec is an object.");
        }
        if (utils_1.isObject(columnNameOrSpec)) {
            var columnSpec = columnNameOrSpec;
            var columnNames = Object.keys(columnSpec);
            var workingDataFrame = this;
            try {
                for (var columnNames_2 = __values(columnNames), columnNames_2_1 = columnNames_2.next(); !columnNames_2_1.done; columnNames_2_1 = columnNames_2.next()) {
                    var columnName_1 = columnNames_2_1.value;
                    workingDataFrame = workingDataFrame.withSeries(columnName_1, columnSpec[columnName_1]);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (columnNames_2_1 && !columnNames_2_1.done && (_a = columnNames_2.return)) _a.call(columnNames_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return workingDataFrame.cast();
        }
        var columnName = columnNameOrSpec;
        if (this.none()) { // We have an empty data frame.
            var importSeries = void 0;
            if (utils_1.isFunction(series)) {
                importSeries = series(this);
            }
            else {
                importSeries = series;
            }
            return importSeries.inflate(function (value) {
                var row = {};
                row[columnName] = value;
                return row;
            })
                .cast();
        }
        return new DataFrame(function () {
            var importSeries;
            if (utils_1.isFunction(series)) {
                importSeries = series(_this);
            }
            else {
                importSeries = series;
            }
            var seriesValueMap = utils_1.toMap2(importSeries.toPairs(), function (pair) { return pair[0]; }, function (pair) { return pair[1]; });
            var newColumnNames = utils_1.makeDistinct(_this.getColumnNames().concat([columnName]));
            return {
                columnNames: newColumnNames,
                index: _this.getContent().index,
                pairs: new select_iterable_1.SelectIterable(_this.getContent().pairs, function (pair) {
                    var index = pair[0];
                    var value = pair[1];
                    var modified = Object.assign({}, value);
                    modified[columnName] = seriesValueMap.get(index);
                    return [
                        index,
                        modified
                    ];
                }),
            };
        });
        var e_5, _a;
    };
    /**
     * Merge multiple dataframes into a single dataframe.
     * Rows are merged by indexed.
     * Same named columns in subsequent dataframes override columns earlier dataframes.
     *
     * @param dataFrames An array or series of dataframes to merge.
     *
     * @returns The merged data frame.
     *
     * @example
     * <pre>
     *
     * const mergedDF = DataFrame.merge([df1, df2, etc]);
     * </pre>
     */
    DataFrame.merge = function (dataFrames) {
        var rowMap = new Map();
        try {
            for (var dataFrames_1 = __values(dataFrames), dataFrames_1_1 = dataFrames_1.next(); !dataFrames_1_1.done; dataFrames_1_1 = dataFrames_1.next()) {
                var dataFrame = dataFrames_1_1.value;
                try {
                    for (var _a = __values(dataFrame.toPairs()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var pair = _b.value;
                        var index = pair[0];
                        if (!rowMap.has(index)) {
                            var clone = Object.assign({}, pair[1]);
                            rowMap.set(index, clone);
                        }
                        else {
                            rowMap.set(index, Object.assign(rowMap.get(index), pair[1]));
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (dataFrames_1_1 && !dataFrames_1_1.done && (_d = dataFrames_1.return)) _d.call(dataFrames_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var allColumnNames = Array.from(dataFrames)
            .map(function (dataFrame) { return dataFrame.getColumnNames(); })
            .reduce(function (prev, next) { return prev.concat(next); }, []);
        var newColumnNames = utils_1.makeDistinct(allColumnNames);
        var mergedPairs = Array.from(rowMap.keys()).map(function (index) { return [index, rowMap.get(index)]; });
        mergedPairs.sort(function (a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else if (a[0] > b[0]) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return new DataFrame({
            columnNames: newColumnNames,
            pairs: mergedPairs,
        });
        var e_7, _d, e_6, _c;
    };
    /**
     * Merge one or more dataframes into this dataframe.
     * Rows are merged by indexed.
     * Same named columns in subsequent dataframes override columns in earlier dataframes.
     *
     * @param otherDataFrames... One or more dataframes to merge into this dataframe.
     *
     * @returns The merged data frame.
     *
     * @example
     * <pre>
     *
     * const mergedDF = df1.merge(df2);
     * </pre>
     *
     * <pre>
     *
     * const mergedDF = df1.merge(df2, df3, etc);
     * </pre>
     */
    DataFrame.prototype.merge = function () {
        var otherDataFrames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherDataFrames[_i] = arguments[_i];
        }
        return DataFrame.merge([this].concat(otherDataFrames));
    };
    /**
     * Add a series to the dataframe, but only if it doesn't already exist.
     *
     * @param columnNameOrSpec The name of the series to add or a {@link IColumnGenSpec} that specifies the columns to add.
     * @param [series] If columnNameOrSpec is a string that specifies the name of the series to add, this specifies the actual {@link Series} to add or a selector that generates the series given the dataframe.
     *
     * @return Returns a new dataframe with the specified series added, if the series didn't already exist. Otherwise if the requested series already exists the same dataframe is returned.
     *
     * @example
     * <pre>
     *
     * const updatedDf = df.ensureSeries("ANewColumn", new Series([1, 2, 3]));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const updatedDf = df.ensureSeries("ANewColumn", df =>
     *      df.getSeries("AnExistingSeries").select(aTransformation)
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.ensureSeries({
     *      ANewColumn: new Series([1, 2, 3]),
     *      SomeOtherColumn: new Series([10, 20, 30])
     * });
     * <pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.ensureSeries({
     *      ANewColumn: df => df.getSeries("SourceData").select(aTransformation))
     * });
     * <pre>
     */
    DataFrame.prototype.ensureSeries = function (columnNameOrSpec, series) {
        if (!utils_1.isObject(columnNameOrSpec)) {
            if (!utils_1.isString(columnNameOrSpec))
                throw new Error("Expected 'columnNameOrSpec' parameter to 'DataFrame.ensureSeries' function to be a string that specifies the column to set or replace.");
            if (!utils_1.isFunction(series)) {
                if (!utils_1.isObject(series))
                    throw new Error("Expected 'series' parameter to 'DataFrame.ensureSeries' to be a Series object or a function that takes a dataframe and produces a Series.");
            }
        }
        else {
            if (!utils_1.isUndefined(series))
                throw new Error("Expected 'series' parameter to 'DataFrame.ensureSeries' to not be set when 'columnNameOrSpec is an object.");
        }
        if (utils_1.isObject(columnNameOrSpec)) {
            var columnSpec = columnNameOrSpec;
            var columnNames = Object.keys(columnNameOrSpec);
            var workingDataFrame = this;
            try {
                for (var columnNames_3 = __values(columnNames), columnNames_3_1 = columnNames_3.next(); !columnNames_3_1.done; columnNames_3_1 = columnNames_3.next()) {
                    var columnName_2 = columnNames_3_1.value;
                    workingDataFrame = workingDataFrame.ensureSeries(columnName_2, columnSpec[columnName_2]);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (columnNames_3_1 && !columnNames_3_1.done && (_a = columnNames_3.return)) _a.call(columnNames_3);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return workingDataFrame;
        }
        var columnName = columnNameOrSpec;
        if (this.hasSeries(columnName)) {
            return this; // Already have the series.
        }
        else {
            return this.withSeries(columnName, series);
        }
        var e_8, _a;
    };
    /**
     * Create a new dataframe with just a subset of columns.
     *
     * @param columnNames Array of column names to include in the new dataframe.
     *
     * @return Returns a dataframe with a subset of columns from the original dataframe.
     *
     * @example
     * <pre>
     * const subsetDf = df.subset(["ColumnA", "ColumnB"]);
     * </pre>
     */
    DataFrame.prototype.subset = function (columnNames) {
        var _this = this;
        if (!utils_1.isArray(columnNames))
            throw new Error("Expected 'columnNames' parameter to 'DataFrame.subset' to be an array of column names to keep.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: columnNames,
                index: content.index,
                values: new select_iterable_1.SelectIterable(content.values, function (value) {
                    var output = {};
                    try {
                        for (var columnNames_4 = __values(columnNames), columnNames_4_1 = columnNames_4.next(); !columnNames_4_1.done; columnNames_4_1 = columnNames_4.next()) {
                            var columnName = columnNames_4_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (columnNames_4_1 && !columnNames_4_1.done && (_a = columnNames_4.return)) _a.call(columnNames_4);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                    return output;
                    var e_9, _a;
                }),
                pairs: new select_iterable_1.SelectIterable(content.pairs, function (pair) {
                    var output = {};
                    var value = pair[1];
                    try {
                        for (var columnNames_5 = __values(columnNames), columnNames_5_1 = columnNames_5.next(); !columnNames_5_1.done; columnNames_5_1 = columnNames_5.next()) {
                            var columnName = columnNames_5_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                    finally {
                        try {
                            if (columnNames_5_1 && !columnNames_5_1.done && (_a = columnNames_5.return)) _a.call(columnNames_5);
                        }
                        finally { if (e_10) throw e_10.error; }
                    }
                    return [pair[0], output];
                    var e_10, _a;
                }),
            };
        });
    };
    ;
    /**
     * Create a new dataframe with the requested column or columns dropped.
     *
     * @param columnOrColumns Specifies the column name (a string) or columns (array of strings) to drop.
     *
     * @return Returns a new dataframe with a particular named column or columns removed.
     *
     * @example
     * <pre>
     * const modifiedDf = df.dropSeries("SomeColumn");
     * </pre>
     *
     * @example
     * <pre>
     * const modifiedDf = df.dropSeries(["ColumnA", "ColumnB"]);
     * </pre>
     */
    DataFrame.prototype.dropSeries = function (columnOrColumns) {
        var _this = this;
        if (!utils_1.isArray(columnOrColumns)) {
            if (!utils_1.isString(columnOrColumns))
                throw new Error("'DataFrame.dropSeries' expected either a string or an array or strings.");
            columnOrColumns = [columnOrColumns]; // Convert to array for coding convenience.
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var newColumnNames = [];
            try {
                for (var _a = __values(content.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (columnOrColumns.indexOf(columnName) === -1) {
                        newColumnNames.push(columnName); // This column is not being dropped.
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return {
                columnNames: newColumnNames,
                index: content.index,
                values: new select_iterable_1.SelectIterable(content.values, function (value) {
                    var clone = Object.assign({}, value);
                    try {
                        for (var columnOrColumns_1 = __values(columnOrColumns), columnOrColumns_1_1 = columnOrColumns_1.next(); !columnOrColumns_1_1.done; columnOrColumns_1_1 = columnOrColumns_1.next()) {
                            var droppedColumnName = columnOrColumns_1_1.value;
                            delete clone[droppedColumnName];
                        }
                    }
                    catch (e_12_1) { e_12 = { error: e_12_1 }; }
                    finally {
                        try {
                            if (columnOrColumns_1_1 && !columnOrColumns_1_1.done && (_a = columnOrColumns_1.return)) _a.call(columnOrColumns_1);
                        }
                        finally { if (e_12) throw e_12.error; }
                    }
                    return clone;
                    var e_12, _a;
                }),
                pairs: new select_iterable_1.SelectIterable(content.pairs, function (pair) {
                    var clone = Object.assign({}, pair[1]);
                    try {
                        for (var columnOrColumns_2 = __values(columnOrColumns), columnOrColumns_2_1 = columnOrColumns_2.next(); !columnOrColumns_2_1.done; columnOrColumns_2_1 = columnOrColumns_2.next()) {
                            var droppedColumnName = columnOrColumns_2_1.value;
                            delete clone[droppedColumnName];
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (columnOrColumns_2_1 && !columnOrColumns_2_1.done && (_a = columnOrColumns_2.return)) _a.call(columnOrColumns_2);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                    return [pair[0], clone];
                    var e_13, _a;
                }),
            };
            var e_11, _c;
        });
    };
    /**
     * Create a new dataframe with columns reordered.
     * New column names create new columns (with undefined values), omitting existing column names causes those columns to be dropped.
     *
     * @param columnNames Specifies the new order for columns.
     *
     * @return Returns a new dataframe with columns reodered according to the order of the array of column names that is passed in.
     *
     * @example
     * <pre>
     * const reorderedDf = df.reorderSeries(["FirstColumn", "SecondColumn", "etc"]);
     * </pre>
     */
    DataFrame.prototype.reorderSeries = function (columnNames) {
        var _this = this;
        if (!utils_1.isArray(columnNames))
            throw new Error("Expected parameter 'columnNames' to 'DataFrame.reorderSeries' to be an array with column names.");
        try {
            for (var columnNames_6 = __values(columnNames), columnNames_6_1 = columnNames_6.next(); !columnNames_6_1.done; columnNames_6_1 = columnNames_6.next()) {
                var columnName = columnNames_6_1.value;
                if (!utils_1.isString(columnName))
                    throw new Error("Expected parameter 'columnNames' to 'DataFrame.reorderSeries' to be an array with column names.");
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (columnNames_6_1 && !columnNames_6_1.done && (_a = columnNames_6.return)) _a.call(columnNames_6);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: columnNames,
                index: content.index,
                values: new select_iterable_1.SelectIterable(content.values, function (value) {
                    var output = {};
                    try {
                        for (var columnNames_7 = __values(columnNames), columnNames_7_1 = columnNames_7.next(); !columnNames_7_1.done; columnNames_7_1 = columnNames_7.next()) {
                            var columnName = columnNames_7_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                    finally {
                        try {
                            if (columnNames_7_1 && !columnNames_7_1.done && (_a = columnNames_7.return)) _a.call(columnNames_7);
                        }
                        finally { if (e_15) throw e_15.error; }
                    }
                    return output;
                    var e_15, _a;
                }),
                pairs: new select_iterable_1.SelectIterable(content.pairs, function (pair) {
                    var value = pair[1];
                    var output = {};
                    try {
                        for (var columnNames_8 = __values(columnNames), columnNames_8_1 = columnNames_8.next(); !columnNames_8_1.done; columnNames_8_1 = columnNames_8.next()) {
                            var columnName = columnNames_8_1.value;
                            output[columnName] = value[columnName];
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (columnNames_8_1 && !columnNames_8_1.done && (_a = columnNames_8.return)) _a.call(columnNames_8);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                    return [pair[0], output];
                    var e_16, _a;
                }),
            };
        });
        var e_14, _a;
    };
    /**
     * Bring the column(s) with specified name(s) to the front of the column order, making it (or them) the first column(s) in the output dataframe.
     *
     * @param columnOrColumns Specifies the column or columns to bring to the front.
     *
     * @return Returns a new dataframe with 1 or more columns bought to the front of the column ordering.
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToFront("NewFirstColumn");
     * </pre>
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToFront(["NewFirstColumn", "NewSecondColumn"]);
     * </pre>
     */
    DataFrame.prototype.bringToFront = function (columnOrColumns) {
        var _this = this;
        if (utils_1.isArray(columnOrColumns)) {
            try {
                for (var columnOrColumns_3 = __values(columnOrColumns), columnOrColumns_3_1 = columnOrColumns_3.next(); !columnOrColumns_3_1.done; columnOrColumns_3_1 = columnOrColumns_3.next()) {
                    var columnName = columnOrColumns_3_1.value;
                    if (!utils_1.isString(columnName)) {
                        throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToFront' function to specify a column or columns via a string or an array of strings.");
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (columnOrColumns_3_1 && !columnOrColumns_3_1.done && (_a = columnOrColumns_3.return)) _a.call(columnOrColumns_3);
                }
                finally { if (e_17) throw e_17.error; }
            }
        }
        else {
            if (!utils_1.isString(columnOrColumns)) {
                throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToFront' function to specify a column or columns via a string or an array of strings.");
            }
            columnOrColumns = [columnOrColumns]; // Convert to array for coding convenience.
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var existingColumns = Array.from(content.columnNames);
            var columnsToMove = [];
            try {
                for (var columnOrColumns_4 = __values(columnOrColumns), columnOrColumns_4_1 = columnOrColumns_4.next(); !columnOrColumns_4_1.done; columnOrColumns_4_1 = columnOrColumns_4.next()) {
                    var columnToMove = columnOrColumns_4_1.value;
                    if (existingColumns.indexOf(columnToMove) !== -1) {
                        // The request column actually exists, so we will move it.
                        columnsToMove.push(columnToMove);
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (columnOrColumns_4_1 && !columnOrColumns_4_1.done && (_a = columnOrColumns_4.return)) _a.call(columnOrColumns_4);
                }
                finally { if (e_18) throw e_18.error; }
            }
            var untouchedColumnNames = [];
            try {
                for (var existingColumns_1 = __values(existingColumns), existingColumns_1_1 = existingColumns_1.next(); !existingColumns_1_1.done; existingColumns_1_1 = existingColumns_1.next()) {
                    var existingColumnName = existingColumns_1_1.value;
                    if (columnOrColumns.indexOf(existingColumnName) === -1) {
                        untouchedColumnNames.push(existingColumnName);
                    }
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (existingColumns_1_1 && !existingColumns_1_1.done && (_b = existingColumns_1.return)) _b.call(existingColumns_1);
                }
                finally { if (e_19) throw e_19.error; }
            }
            return {
                columnNames: columnsToMove.concat(untouchedColumnNames),
                index: content.index,
                values: content.values,
                pairs: content.pairs,
            };
            var e_18, _a, e_19, _b;
        });
        var e_17, _a;
    };
    /**
     * Bring the column(s) with specified name(s) to the back of the column order, making it (or them) the last column(s) in the output dataframe.
     *
     * @param columnOrColumns Specifies the column or columns to bring to the back.
     *
     * @return Returns a new dataframe with 1 or more columns bought to the back of the column ordering.
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToBack("NewLastColumn");
     * </pre>
     *
     * @example
     * <pre>
     * const modifiedDf = df.bringToBack(["NewSecondLastCollumn, ""NewLastColumn"]);
     * </pre>
     */
    DataFrame.prototype.bringToBack = function (columnOrColumns) {
        var _this = this;
        if (utils_1.isArray(columnOrColumns)) {
            try {
                for (var columnOrColumns_5 = __values(columnOrColumns), columnOrColumns_5_1 = columnOrColumns_5.next(); !columnOrColumns_5_1.done; columnOrColumns_5_1 = columnOrColumns_5.next()) {
                    var columnName = columnOrColumns_5_1.value;
                    if (!utils_1.isString(columnName)) {
                        throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToBack' function to specify a column or columns via a string or an array of strings.");
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (columnOrColumns_5_1 && !columnOrColumns_5_1.done && (_a = columnOrColumns_5.return)) _a.call(columnOrColumns_5);
                }
                finally { if (e_20) throw e_20.error; }
            }
        }
        else {
            if (!utils_1.isString(columnOrColumns)) {
                throw new Error("Expect 'columnOrColumns' parameter to 'DataFrame.bringToBack' function to specify a column or columns via a string or an array of strings.");
            }
            columnOrColumns = [columnOrColumns]; // Convert to array for coding convenience.
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var existingColumns = Array.from(content.columnNames);
            var columnsToMove = [];
            try {
                for (var columnOrColumns_6 = __values(columnOrColumns), columnOrColumns_6_1 = columnOrColumns_6.next(); !columnOrColumns_6_1.done; columnOrColumns_6_1 = columnOrColumns_6.next()) {
                    var columnToMove = columnOrColumns_6_1.value;
                    if (existingColumns.indexOf(columnToMove) !== -1) {
                        // The request column actually exists, so we will move it.
                        columnsToMove.push(columnToMove);
                    }
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (columnOrColumns_6_1 && !columnOrColumns_6_1.done && (_a = columnOrColumns_6.return)) _a.call(columnOrColumns_6);
                }
                finally { if (e_21) throw e_21.error; }
            }
            var untouchedColumnNames = [];
            try {
                for (var existingColumns_2 = __values(existingColumns), existingColumns_2_1 = existingColumns_2.next(); !existingColumns_2_1.done; existingColumns_2_1 = existingColumns_2.next()) {
                    var existingColumnName = existingColumns_2_1.value;
                    if (columnOrColumns.indexOf(existingColumnName) === -1) {
                        untouchedColumnNames.push(existingColumnName);
                    }
                }
            }
            catch (e_22_1) { e_22 = { error: e_22_1 }; }
            finally {
                try {
                    if (existingColumns_2_1 && !existingColumns_2_1.done && (_b = existingColumns_2.return)) _b.call(existingColumns_2);
                }
                finally { if (e_22) throw e_22.error; }
            }
            return {
                columnNames: untouchedColumnNames.concat(columnsToMove),
                index: content.index,
                values: content.values,
                pairs: content.pairs,
            };
            var e_21, _a, e_22, _b;
        });
        var e_20, _a;
    };
    /**
     * Create a new dataframe with 1 or more columns renamed.
     *
     * @param newColumnNames A column rename spec - a JavaScript hash that maps existing column names to new column names.
     *
     * @return Returns a new dataframe with specified columns renamed.
     *
     * @example
     * <pre>
     *
     * const renamedDf = df.renameSeries({ OldColumnName, NewColumnName });
     * </pre>
     *
     * @example
     * <pre>
     *
     * const renamedDf = df.renameSeries({
     *      Column1: ColumnA,
     *      Column2: ColumnB
     * });
     * </pre>
     */
    DataFrame.prototype.renameSeries = function (newColumnNames) {
        var _this = this;
        if (!utils_1.isObject(newColumnNames))
            throw new Error("Expected parameter 'newColumnNames' to 'DataFrame.renameSeries' to be an array with column names.");
        var existingColumnsToRename = Object.keys(newColumnNames);
        try {
            for (var existingColumnsToRename_1 = __values(existingColumnsToRename), existingColumnsToRename_1_1 = existingColumnsToRename_1.next(); !existingColumnsToRename_1_1.done; existingColumnsToRename_1_1 = existingColumnsToRename_1.next()) {
                var existingColumnName = existingColumnsToRename_1_1.value;
                if (!utils_1.isString(existingColumnName))
                    throw new Error("Expected existing column name '" + existingColumnName + "' of 'newColumnNames' parameter to 'DataFrame.renameSeries' to be a string.");
                if (!utils_1.isString(newColumnNames[existingColumnName]))
                    throw new Error("Expected new column name '" + newColumnNames[existingColumnName] + "' for existing column '" + existingColumnName + "' of 'newColumnNames' parameter to 'DataFrame.renameSeries' to be a string.");
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (existingColumnsToRename_1_1 && !existingColumnsToRename_1_1.done && (_a = existingColumnsToRename_1.return)) _a.call(existingColumnsToRename_1);
            }
            finally { if (e_23) throw e_23.error; }
        }
        return new DataFrame(function () {
            var content = _this.getContent();
            var renamedColumns = [];
            try {
                for (var _a = __values(content.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var existingColumnName = _b.value;
                    var columnIndex = existingColumnsToRename.indexOf(existingColumnName);
                    if (columnIndex === -1) {
                        renamedColumns.push(existingColumnName); // This column is not renamed.                    
                    }
                    else {
                        renamedColumns.push(newColumnNames[existingColumnName]); // This column is renamed.
                    }
                }
            }
            catch (e_24_1) { e_24 = { error: e_24_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_24) throw e_24.error; }
            }
            //
            // Remap each row of the data frame to the new column names.
            //
            function remapValue(value) {
                var clone = Object.assign({}, value);
                try {
                    for (var existingColumnsToRename_2 = __values(existingColumnsToRename), existingColumnsToRename_2_1 = existingColumnsToRename_2.next(); !existingColumnsToRename_2_1.done; existingColumnsToRename_2_1 = existingColumnsToRename_2.next()) {
                        var existingColumName = existingColumnsToRename_2_1.value;
                        clone[newColumnNames[existingColumName]] = clone[existingColumName];
                        delete clone[existingColumName];
                    }
                }
                catch (e_25_1) { e_25 = { error: e_25_1 }; }
                finally {
                    try {
                        if (existingColumnsToRename_2_1 && !existingColumnsToRename_2_1.done && (_a = existingColumnsToRename_2.return)) _a.call(existingColumnsToRename_2);
                    }
                    finally { if (e_25) throw e_25.error; }
                }
                return clone;
                var e_25, _a;
            }
            return {
                columnNames: renamedColumns,
                index: content.index,
                values: new select_iterable_1.SelectIterable(content.values, remapValue),
                pairs: new select_iterable_1.SelectIterable(content.pairs, function (pair) {
                    return [pair[0], remapValue(pair[1])];
                }),
            };
            var e_24, _c;
        });
        var e_23, _a;
    };
    ;
    /**
    * Extract values from the dataframe as an array.
    * This forces lazy evaluation to complete.
    *
    * @return Returns an array of the values contained within the dataframe.
    *
    * @example
    * <pre>
    * const values = df.toArray();
    * </pre>
    */
    DataFrame.prototype.toArray = function () {
        var values = [];
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (value !== undefined) {
                    values.push(value);
                }
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_26) throw e_26.error; }
        }
        return values;
        var e_26, _c;
    };
    /**
     * Retreive the index and values pairs from the dataframe as an array.
     * Each pair is [index, value].
     * This forces lazy evaluation to complete.
     *
     * @return Returns an array of pairs that contains the dataframe content. Each pair is a two element array that contains an index and a value.
     *
     * @example
     * <pre>
     * const pairs = df.toPairs();
     * </pre>
     */
    DataFrame.prototype.toPairs = function () {
        var pairs = [];
        try {
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[1] != undefined) {
                    pairs.push(pair);
                }
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_27) throw e_27.error; }
        }
        return pairs;
        var e_27, _c;
    };
    /**
     * Convert the dataframe to a JavaScript object.
     *
     * @param keySelector Function that selects keys for the resulting object.
     * @param valueSelector Function that selects values for the resulting object.
     *
     * @return Returns a JavaScript object generated from the dataframe by applying the key and value selector functions.
     *
     * @example
     * <pre>
     *
     * const someObject = df.toObject(
     *      row => row.SomeColumn, // Specify the column to use for fields in the object.
     *      row => row.SomeOtherColumn // Specifi the column to use as the value for each field.
     * );
     * </pre>
     */
    DataFrame.prototype.toObject = function (keySelector, valueSelector) {
        if (!utils_1.isFunction(keySelector))
            throw new Error("Expected 'keySelector' parameter to DataFrame.toObject to be a function.");
        if (!utils_1.isFunction(valueSelector))
            throw new Error("Expected 'valueSelector' parameter to DataFrame.toObject to be a function.");
        return utils_1.toMap(this, keySelector, valueSelector);
    };
    /**
     * Bake the data frame to an array of rows were each rows is an array of values in column order.
     *
     * @return Returns an array of rows. Each row is an array of values in column order.
     *
     * @example
     * <pre>
     * const rows = df.toRows();
     * </pre>
     */
    DataFrame.prototype.toRows = function () {
        var columnNames = this.getColumnNames();
        var rows = [];
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                var row = [];
                for (var columnIndex = 0; columnIndex < columnNames.length; ++columnIndex) {
                    row.push(value[columnNames[columnIndex]]);
                }
                rows.push(row);
            }
        }
        catch (e_28_1) { e_28 = { error: e_28_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_28) throw e_28.error; }
        }
        return rows;
        var e_28, _c;
    };
    /**
     * Generates a new dataframe by repeatedly calling a selector function on each row in the original dataframe.
     *
     * @param selector Selector function that transforms each row to create the new dataframe.
     *
     * @return Returns a new dataframe that has been transformed by the selector function.
     *
     * @example
     * <pre>
     *
     * function transformRow (inputRow) {
     *      const outputRow = {
     *          // ... construct output row derived from input row ...
     *      };
     *
     *      return outputRow;
     * }
     *
     * const modifiedDf = df.select(row => transformRow(row));
     * </pre>
     */
    DataFrame.prototype.select = function (selector) {
        var _this = this;
        if (!utils_1.isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'DataFrame.select' function to be a function.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                values: new select_iterable_1.SelectIterable(content.values, selector),
                index: content.index,
            };
        });
    };
    /**
     * Generates a new dataframe by repeatedly calling a selector function on each row in the original dataframe.
     *
     * In this case the selector function produces a collection of output rows that are flattened to create the new dataframe.
     *
     * @param selector Selector function that transforms each row into a collection of output rows.
     *
     * @return  Returns a new dataframe with rows that have been produced by the selector function.
     *
     * @example
     * <pre>
     *
     * function produceOutputRows (inputRow) {
     *      const outputRows = [];
     *      while (someCondition) {     *
     *          // ... generate zero or more output rows ...
     *          outputRows.push(... some generated row ...);
     *      }
     *      return outputRows;
     * }
     *
     * const modifiedDf = df.selectMany(row => produceOutputRows(row));
     * </pre>
     */
    DataFrame.prototype.selectMany = function (selector) {
        var _this = this;
        if (!utils_1.isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'DataFrame.selectMany' to be a function.");
        return new DataFrame(function () { return ({
            pairs: new select_many_iterable_1.SelectManyIterable(_this.getContent().pairs, function (pair, index) {
                var outputPairs = [];
                try {
                    for (var _a = __values(selector(pair[1], index)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var transformed = _b.value;
                        outputPairs.push([
                            pair[0],
                            transformed
                        ]);
                    }
                }
                catch (e_29_1) { e_29 = { error: e_29_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_29) throw e_29.error; }
                }
                return outputPairs;
                var e_29, _c;
            })
        }); });
    };
    /**
     * Transform one or more columns.
     *
     * This is equivalent to extracting a {@link Series} with {@link getSeries}, then transforming it with {@link Series.select},
     * and finally plugging it back in as the same column using {@link withSeries}.
     *
     * @param columnSelectors Object with field names for each column to be transformed. Each field specifies a selector function that transforms that column.
     *
     * @return Returns a new dataframe with 1 or more columns transformed.
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.transformSeries({
     *      AColumnToTransform: columnValue => transformRow(columnValue)
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * const modifiedDf = df.transformSeries({
     *      ColumnA: columnValue => transformColumnA(columnValue),
     *      ColumnB: columnValue => transformColumnB(columnValue)
     * });
     * </pre>
     */
    DataFrame.prototype.transformSeries = function (columnSelectors) {
        if (!utils_1.isObject(columnSelectors))
            throw new Error("Expected 'columnSelectors' parameter of 'DataFrame.transformSeries' function to be an object. Field names should specify columns to transform. Field values should be selector functions that specify the transformation for each column.");
        var working = this;
        try {
            for (var _a = __values(Object.keys(columnSelectors)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var columnName = _b.value;
                if (working.hasSeries(columnName)) {
                    working = working.withSeries(columnName, working.getSeries(columnName)
                        .select(columnSelectors[columnName]));
                }
            }
        }
        catch (e_30_1) { e_30 = { error: e_30_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_30) throw e_30.error; }
        }
        return working;
        var e_30, _c;
    };
    /**
     * Generate new columns based on existing rows.
     *
     * This is equivalent to calling {@link select} to transform the original dataframe to a new dataframe with different column,
     * then using {@link withSeries} to merge each the of both the new and original dataframes.
     *
     * @param generator Generator function that transforms each row to produce 1 or more new columns.
     * Or use a column spec that has fields for each column, the fields specify a generate function that produces the value for each new column.
     *
     * @return Returns a new dataframe with 1 or more new columns.
     *
     * @example
     * <pre>
     *
     * function produceNewColumns (inputRow) {
     *      const newColumns = {
     *          // ... specify new columns and their values based on the input row ...
     *      };
     *
     *      return newColumns;
     * };
     *
     * const dfWithNewSeries = df.generateSeries(row => produceNewColumns(row));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dfWithNewSeries = df.generateSeries({
     *      NewColumnA: row => produceNewColumnA(row),
     *      NewColumnB: row => produceNewColumnB(row),
     * })
     * </pre>
     */
    DataFrame.prototype.generateSeries = function (generator) {
        if (!utils_1.isObject(generator)) {
            if (!utils_1.isFunction(generator)) {
                throw new Error("Expected 'generator' parameter to 'DataFrame.generateSeries' function to be a function or an object.");
            }
            var selector = generator;
            var newColumns = this.select(selector) // Build a new dataframe.
                .bake(); //TODO: Bake should be needed here, but it causes problems if not.
            var newColumnNames = newColumns.getColumnNames();
            var working = this;
            try {
                //TODO: There must be a cheaper implementation!
                for (var newColumnNames_1 = __values(newColumnNames), newColumnNames_1_1 = newColumnNames_1.next(); !newColumnNames_1_1.done; newColumnNames_1_1 = newColumnNames_1.next()) {
                    var newColumnName = newColumnNames_1_1.value;
                    working = working.withSeries(newColumnName, newColumns.getSeries(newColumnName));
                }
            }
            catch (e_31_1) { e_31 = { error: e_31_1 }; }
            finally {
                try {
                    if (newColumnNames_1_1 && !newColumnNames_1_1.done && (_a = newColumnNames_1.return)) _a.call(newColumnNames_1);
                }
                finally { if (e_31) throw e_31.error; }
            }
            return working;
        }
        else {
            var columnTransformSpec = generator;
            var newColumnNames = Object.keys(columnTransformSpec);
            var working = this;
            try {
                for (var newColumnNames_2 = __values(newColumnNames), newColumnNames_2_1 = newColumnNames_2.next(); !newColumnNames_2_1.done; newColumnNames_2_1 = newColumnNames_2.next()) {
                    var newColumnName = newColumnNames_2_1.value;
                    working = working.withSeries(newColumnName, working.select(columnTransformSpec[newColumnName]).deflate());
                }
            }
            catch (e_32_1) { e_32 = { error: e_32_1 }; }
            finally {
                try {
                    if (newColumnNames_2_1 && !newColumnNames_2_1.done && (_b = newColumnNames_2.return)) _b.call(newColumnNames_2);
                }
                finally { if (e_32) throw e_32.error; }
            }
            return working;
        }
        var e_31, _a, e_32, _b;
    };
    /**
     * Converts (deflates) a dataframe to a {@link Series}.
     *
     * @param [selector] Optional selector function that transforms each row to produce the series.
     *
     * @return Returns a series that was created from the deflated from  the original dataframe.
     *
     * @example
     * <pre>
     *
     * const series = df.deflate(); // Deflate to a series of object.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const series = df.deflate(row => row.SomeColumn); // Extract a particular column.
     * </pre>
     */
    DataFrame.prototype.deflate = function (selector) {
        var _this = this;
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'DataFrame.deflate' function to be a selector function.");
        }
        return new series_1.Series(function () {
            var content = _this.getContent();
            if (selector) {
                return {
                    index: content.index,
                    values: new select_iterable_1.SelectIterable(content.values, selector),
                    pairs: new select_iterable_1.SelectIterable(content.pairs, function (pair, index) {
                        return [
                            pair[0],
                            selector(pair[1], index)
                        ];
                    }),
                };
            }
            else {
                return {
                    index: content.index,
                    values: content.values,
                    pairs: content.pairs,
                };
            }
        });
    };
    ;
    /**
     * Inflate a named {@link Series} in the dataframe to 1 or more new series in the new dataframe.
     *
     * This is the equivalent of extracting the series using {@link getSeries}, transforming them with {@link Series.select}
     * and then running {@link Series.inflate} to create a new dataframe, then merging each column of the new dataframe
     *  into the original dataframe using {@link withSeries}.
     *
     * @param columnName Name of the series to inflate.
     * @param [selector] Optional selector function that transforms each value in the column to new columns. If not specified it is expected that each value in the column is an object whose fields define the new column names.
     *
     * @return Returns a new dataframe with a column inflated to 1 or more new columns.
     *
     * @example
     * <pre>
     *
     * function newColumnGenerator (row) {
     *      const newColumns = {
     *          // ... create 1 field per new column ...
     *      };
     *
     *      return row;
     * }
     *
     * const dfWithNewSeries = df.inflateSeries("SomeColumn", newColumnGenerator);
     * </pre>
     */
    DataFrame.prototype.inflateSeries = function (columnName, selector) {
        if (!utils_1.isString(columnName))
            throw new Error("Expected 'columnName' parameter to 'DataFrame.inflateSeries' to be a string that is the name of the column to inflate.");
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected optional 'selector' parameter to 'DataFrame.inflateSeries' to be a selector function, if it is specified.");
        }
        return this.zip(this.getSeries(columnName).inflate(selector), function (row1, row2) { return Object.assign({}, row1, row2); } //todo: this be should zip's default operation.
        );
    };
    /**
     * Partition a dataframe into a {@link Series} of *data windows*.
     * Each value in the new series is a rolling chunk of data from the original dataframe.
     *
     * @param period The number of data rows to include in each data window.
     *
     * @return Returns a new series, each value of which is a chunk of the original dataframe.
     *
     * @example
     * <pre>
     *
     * const windows = df.window(2); // Get values in pairs.
     * const pctIncrease = windows.select(pair => (pair.last() - pair.first()) / pair.first());
     * console.log(pctIncrease.toString());
     * </pre>
     *
     * @example
     * <pre>
     *
     * const salesDf = ... // Daily sales data.
     * const weeklySales = salesDf.window(7); // Partition up into weekly data sets.
     * console.log(weeklySales.toString());
     * </pre>
     */
    DataFrame.prototype.window = function (period) {
        var _this = this;
        if (!utils_1.isNumber(period))
            throw new Error("Expected 'period' parameter to 'DataFrame.window' to be a number.");
        return new series_1.Series(function () {
            var content = _this.getContent();
            return {
                values: new dataframe_window_iterable_1.DataFrameWindowIterable(content.columnNames, content.pairs, period)
            };
        });
    };
    /**
     * Partition a dataframe into a {@link Series} of *rolling data windows*.
     * Each value in the new series is a rolling chunk of data from the original dataframe.
     *
     * @param period The number of data rows to include in each data window.
     *
     * @return Returns a new series, each value of which is a rolling chunk of the original dataframe.
     *
     * @example
     * <pre>
     *
     * const salesDf = ... // Daily sales data.
     * const rollingWeeklySales = salesDf.rollingWindow(7); // Get rolling window over weekly sales data.
     * console.log(rollingWeeklySales.toString());
     * </pre>
     */
    DataFrame.prototype.rollingWindow = function (period) {
        var _this = this;
        if (!utils_1.isNumber(period))
            throw new Error("Expected 'period' parameter to 'DataFrame.rollingWindow' to be a number.");
        return new series_1.Series(function () {
            var content = _this.getContent();
            return {
                values: new dataframe_rolling_window_iterable_1.DataFrameRollingWindowIterable(content.columnNames, content.pairs, period)
            };
        });
    };
    /**
     * Partition a dataframe into a {@link Series} of variable-length *data windows*
     * where the divisions between the data chunks are
     * defined by a user-provided *comparer* function.
     *
     * @param comparer Function that compares two adjacent data rows and returns true if they should be in the same window.
     *
     * @return Returns a new series, each value of which is a chunk of data from the original dataframe.
     *
     * @example
     * <pre>
     *
     * function rowComparer (rowA, rowB) {
     *      if (... rowA should be in the same data window as rowB ...) {
     *          return true;
     *      }
     *      else {
     *          return false;
     *      }
     * };
     *
     * const variableWindows = df.variableWindow(rowComparer);
     */
    DataFrame.prototype.variableWindow = function (comparer) {
        var _this = this;
        if (!utils_1.isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'DataFrame.variableWindow' to be a function.");
        return new series_1.Series(function () {
            var content = _this.getContent();
            return {
                values: new dataframe_variable_window_iterable_1.DataFrameVariableWindowIterable(content.columnNames, content.pairs, comparer)
            };
        });
    };
    /**
     * Eliminates adjacent duplicate rows.
     *
     * For each group of adjacent rows that are equivalent only returns the last index/row for the group,
     * thus ajacent equivalent rows are collapsed down to the last row.
     *
     * @param [selector] Optional selector function to determine the value used to compare for equivalence.
     *
     * @return Returns a new dataframe with groups of adjacent duplicate rows collapsed to a single row per group.
     *
     * @example
     * <pre>
     *
     * const dfWithDuplicateRowsRemoved = df.sequentialDistinct(row => row.ColumnA);
     * </pre>
     */
    DataFrame.prototype.sequentialDistinct = function (selector) {
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'DataFrame.sequentialDistinct' to be a selector function that determines the value to compare for duplicates.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); })
            .select(function (window) {
            return [window.getIndex().first(), window.first()];
        })
            .withIndex(function (pair) { return pair[0]; })
            .inflate(function (pair) { return pair[1]; }); //TODO: Should this be select?
    };
    /**
     * Aggregate the rows in the dataframe to a single result.
     *
     * @param [seed] Optional seed value for producing the aggregation.
     * @param selector Function that takes the seed and then each row in the dataframe and produces the aggregated value.
     *
     * @return Returns a new value that has been aggregated from the dataframe using the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const dailySalesDf = ... daily sales figures for the past month ...
     * const totalSalesForthisMonth = dailySalesDf.aggregate(
     *      0, // Seed - the starting value.
     *      (accumulator, row) => accumulator + row.SalesAmount // Aggregation function.
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const totalSalesAllTime = 500; // We'll seed the aggregation with this value.
     * const dailySalesDf = ... daily sales figures for the past month ...
     * const updatedTotalSalesAllTime = dailySalesDf.aggregate(
     *      totalSalesAllTime,
     *      (accumulator, row) => accumulator + row.SalesAmount
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * var salesDataSummary = salesDataDf.aggregate({
     *      TotalSales: df => df.count(),
     *      AveragePrice: df => df.deflate(row => row.Price).average(),
     *      TotalRevenue: df => df.deflate(row => row.Revenue).sum(),
     * });
     * </pre>
    */
    DataFrame.prototype.aggregate = function (seedOrSelector, selector) {
        var _this = this;
        if (utils_1.isFunction(seedOrSelector) && !selector) {
            return this.skip(1).aggregate(this.first(), seedOrSelector);
        }
        else if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to aggregate to be a function.");
            var accum = seedOrSelector;
            try {
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    accum = selector(accum, value);
                }
            }
            catch (e_33_1) { e_33 = { error: e_33_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_33) throw e_33.error; }
            }
            return accum;
        }
        else {
            //
            //TODO:
            // This approach is fairly limited because I can't provide a seed.
            // Consider removing this and replacing it with a 'summarize' function.
            //
            if (!utils_1.isObject(seedOrSelector))
                throw new Error("Expected 'seed' parameter to aggregate to be an object.");
            var columnAggregateSpec_1 = seedOrSelector;
            var columnNames = Object.keys(columnAggregateSpec_1);
            var aggregatedColumns = columnNames.map(function (columnName) {
                var columnSelector = columnAggregateSpec_1[columnName];
                if (!utils_1.isFunction(columnSelector))
                    throw new Error("Expected column/selector pairs in 'seed' parameter to aggregate.");
                return [columnName, _this.getSeries(columnName).aggregate(columnSelector)];
            });
            return utils_1.toMap(aggregatedColumns, function (pair) { return pair[0]; }, function (pair) { return pair[1]; });
        }
        var e_33, _c;
    };
    /**
     * Skip a number of rows in the dataframe.
     *
     * @param numValues Number of rows to skip.
     *
     * @return Returns a new dataframe with the specified number of rows skipped.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsSkipped = df.skip(10); // Skip 10 rows in the original dataframe.
     * </pre>
     */
    DataFrame.prototype.skip = function (numValues) {
        var _this = this;
        if (!utils_1.isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'DataFrame.skip' to be a number.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new skip_iterable_1.SkipIterable(content.values, numValues),
                index: new skip_iterable_1.SkipIterable(content.index, numValues),
                pairs: new skip_iterable_1.SkipIterable(content.pairs, numValues),
            };
        });
    };
    /**
     * Skips rows in the dataframe while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to skip rows in the original dataframe.
     *
     * @return Returns a new dataframe with all initial sequential rows removed while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsSkipped = df.skipWhile(row => row.CustomerName === "Fred"); // Skip initial customers named Fred.
     * </pre>
     */
    DataFrame.prototype.skipWhile = function (predicate) {
        var _this = this;
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.skipWhile' function to be a predicate function that returns true/false.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new skip_while_iterable_1.SkipWhileIterable(content.values, predicate),
                pairs: new skip_while_iterable_1.SkipWhileIterable(content.pairs, function (pair) { return predicate(pair[1]); }),
            };
        });
    };
    /**
     * Skips rows in the dataframe untils a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop skipping rows in the original dataframe.
     *
     * @return Returns a new dataframe with all initial sequential rows removed until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsSkipped = df.skipUntil(row => row.CustomerName === "Fred"); // Skip initial customers until we find Fred.
     * </pre>
     */
    DataFrame.prototype.skipUntil = function (predicate) {
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.skipUntil' function to be a predicate function that returns true/false.");
        return this.skipWhile(function (value) { return !predicate(value); });
    };
    /**
     * Take a number of rows from the dataframe.
     *
     * @param numValues Number of rows to take.
     *
     * @return Returns a new dataframe with only the specified number of rows taken from the original dataframe.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsTaken = df.take(15); // Take only the first 15 rows from the original dataframe.
     * </pre>
     */
    DataFrame.prototype.take = function (numRows) {
        var _this = this;
        if (!utils_1.isNumber(numRows))
            throw new Error("Expected 'numRows' parameter to 'DataFrame.take' function to be a number.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                index: new take_iterable_1.TakeIterable(content.index, numRows),
                values: new take_iterable_1.TakeIterable(content.values, numRows),
                pairs: new take_iterable_1.TakeIterable(content.pairs, numRows)
            };
        });
    };
    ;
    /**
     * Takes rows from the dataframe while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to take rows from the original dataframe.
     *
     * @return Returns a new dataframe with only the initial sequential rows that were taken while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsTaken = df.takeWhile(row => row.CustomerName === "Fred"); // Take only initial customers named Fred.
     * </pre>
     */
    DataFrame.prototype.takeWhile = function (predicate) {
        var _this = this;
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.takeWhile' function to be a predicate function that returns true/false.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new take_while_iterable_1.TakeWhileIterable(content.values, predicate),
                pairs: new take_while_iterable_1.TakeWhileIterable(content.pairs, function (pair) { return predicate(pair[1]); })
            };
        });
    };
    /**
     * Takes rows from the dataframe untils a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop taking rows in the original dataframe.
     *
     * @return Returns a new dataframe with only the initial sequential rows taken until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const dfWithRowsTaken = df.takeUntil(row => row.CustomerName === "Fred"); // Take all initial customers until we find Fred.
     * </pre>
     */
    DataFrame.prototype.takeUntil = function (predicate) {
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.takeUntil' function to be a predicate function that returns true/false.");
        return this.takeWhile(function (value) { return !predicate(value); });
    };
    /**
     * Count the number of rows in the dataframe
     *
     * @return Returns the count of all rows.
     *
     * @example
     * <pre>
     *
     * const numRows = df.count();
     * </pre>
     */
    DataFrame.prototype.count = function () {
        var total = 0;
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                ++total;
            }
        }
        catch (e_34_1) { e_34 = { error: e_34_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_34) throw e_34.error; }
        }
        return total;
        var e_34, _c;
    };
    /**
     * Get the first row of the dataframe.
     *
     * @return Returns the first row of the dataframe.
     *
     * @example
     * <pre>
     *
     * const firstRow = df.first();
     * </pre>
     */
    DataFrame.prototype.first = function () {
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                return value; // Only need the first value.
            }
        }
        catch (e_35_1) { e_35 = { error: e_35_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_35) throw e_35.error; }
        }
        throw new Error("DataFrame.first: No values in DataFrame.");
        var e_35, _c;
    };
    /**
     * Get the last row of the dataframe.
     *
     * @return Returns the last row of the dataframe.
     *
     * @example
     * <pre>
     *
     * const lastRow = df.last();
     * </pre>
     */
    DataFrame.prototype.last = function () {
        var lastValue = null;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                lastValue = value; // Throw away all values until we get to the last one.
            }
        }
        catch (e_36_1) { e_36 = { error: e_36_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_36) throw e_36.error; }
        }
        if (lastValue === null) {
            throw new Error("DataFrame.last: No values in DataFrame.");
        }
        return lastValue;
        var e_36, _c;
    };
    /**
     * Get the row, if there is one, with the specified index.
     *
     * @param index Index to for which to retreive the row.
     *
     * @return Returns the row from the specified index in the dataframe or undefined if there is no such index in the present in the dataframe.
     *
     * @example
     * <pre>
     *
     * const row = df.at(5); // Get the row at index 5 (with a default 0-based index).
     * </pre>
     *
     * @example
     * <pre>
     *
     * const date = ... some date ...
     * // Retreive the row with specified date from a time-series dataframe (assuming date indexed has been applied).
     * const row = df.at(date);
     * </pre>
     */
    DataFrame.prototype.at = function (index) {
        if (this.none()) {
            return undefined;
        }
        try {
            //
            // This is pretty expensive.
            // A specialised index could improve this.
            //
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[0] === index) {
                    return pair[1];
                }
            }
        }
        catch (e_37_1) { e_37 = { error: e_37_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_37) throw e_37.error; }
        }
        return undefined;
        var e_37, _c;
    };
    /**
     * Get X rows from the start of the dataframe.
     * Pass in a negative value to get all rows at the head except for X rows at the tail.
     *
     * @param numValues Number of rows to take.
     *
     * @return Returns a new dataframe that has only the specified number of rows taken from the start of the original dataframe.
     *
     * @examples
     * <pre>
     *
     * const sample = df.head(10); // Take a sample of 10 rows from the start of the dataframe.
     * </pre>
     */
    DataFrame.prototype.head = function (numValues) {
        if (!utils_1.isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'DataFrame.head' function to be a number.");
        if (numValues === 0) {
            return new DataFrame(); // Empty dataframe.
        }
        var toTake = numValues < 0 ? this.count() - Math.abs(numValues) : numValues;
        return this.take(toTake);
    };
    /**
     * Get X rows from the end of the dataframe.
     * Pass in a negative value to get all rows at the tail except X rows at the head.
     *
     * @param numValues Number of rows to take.
     *
     * @return Returns a new dataframe that has only the specified number of rows taken from the end of the original dataframe.
     *
     * @examples
     * <pre>
     *
     * const sample = df.tail(12); // Take a sample of 12 rows from the end of the dataframe.
     * </pre>
     */
    DataFrame.prototype.tail = function (numValues) {
        if (!utils_1.isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'DataFrame.tail' function to be a number.");
        if (numValues === 0) {
            return new DataFrame(); // Empty dataframe.
        }
        var toSkip = numValues > 0 ? this.count() - numValues : Math.abs(numValues);
        return this.skip(toSkip);
    };
    /**
     * Filter the dataframe using user-defined predicate function.
     *
     * @param predicate Predicte function to filter rows from the dataframe. Returns true/truthy to keep rows, or false/falsy to omit rows.
     *
     * @return Returns a new dataframe containing only the rows from the original dataframe that matched the predicate.
     *
     * @example
     * <pre>
     *
     * const filteredDf = df.where(row => row.CustomerName === "Fred"); // Filter so we only have customers named Fred.
     * </pre>
     */
    DataFrame.prototype.where = function (predicate) {
        var _this = this;
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.where' function to be a function.");
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new where_iterable_1.WhereIterable(content.values, predicate),
                pairs: new where_iterable_1.WhereIterable(content.pairs, function (pair) { return predicate(pair[1]); })
            };
        });
    };
    /**
     * Invoke a callback function for each row in the dataframe.
     *
     * @param callback The calback function to invoke for each row.
     *
     * @return Returns the original dataframe with no modifications.
     *
     * @example
     * <pre>
     *
     * df.forEach(row => {
     *      // ... do something with the row ...
     * });
     * </pre>
     */
    DataFrame.prototype.forEach = function (callback) {
        if (!utils_1.isFunction(callback))
            throw new Error("Expected 'callback' parameter to 'DataFrame.forEach' to be a function.");
        var index = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                callback(value, index++);
            }
        }
        catch (e_38_1) { e_38 = { error: e_38_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_38) throw e_38.error; }
        }
        return this;
        var e_38, _c;
    };
    /**
     * Evaluates a predicate function for every row in the dataframe to determine
     * if some condition is true/truthy for **all** rows in the dataframe.
     *
     * @param predicate Predicate function that receives each row. It should returns true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned true or truthy for every row in the dataframe, otherwise returns false. Returns false for an empty dataframe.
     *
     * @example
     * <pre>
     *
     * const everyoneIsNamedFred = df.all(row => row.CustomerName === "Fred"); // Check if all customers are named Fred.
     * </pre>
     */
    DataFrame.prototype.all = function (predicate) {
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'DataFrame.all' to be a function.");
        var count = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (!predicate(value)) {
                    return false;
                }
                ++count;
            }
        }
        catch (e_39_1) { e_39 = { error: e_39_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_39) throw e_39.error; }
        }
        return count > 0;
        var e_39, _c;
    };
    /**
     * Evaluates a predicate function for every row in the dataframe to determine
     * if some condition is true/truthy for **any** of rows in the dataframe.
     *
     * If no predicate is specified then it simply checks if the dataframe contains more than zero rows.
     *
     * @param [predicate] Optional predicate function that receives each row. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for any row in the dataframe, otherwise returns false.
     * If no predicate is passed it returns true if the dataframe contains any rows at all.
     * Returns false for an empty dataframe.
     *
     * @example
     * <pre>
     *
     * const anyFreds = df.any(row => row.CustomerName === "Fred"); // Do we have any customers named Fred?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const anyCustomers = df.any(); // Do we have any customers at all?
     * </pre>
     */
    DataFrame.prototype.any = function (predicate) {
        if (predicate) {
            if (!utils_1.isFunction(predicate))
                throw new Error("Expected optional 'predicate' parameter to 'DataFrame.any' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return true;
                    }
                }
            }
            catch (e_40_1) { e_40 = { error: e_40_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_40) throw e_40.error; }
            }
        }
        else {
            // Just check if there is at least one item.
            var iterator = this[Symbol.iterator]();
            return !iterator.next().done;
        }
        return false; // Nothing passed.
        var e_40, _c;
    };
    /**
     * Evaluates a predicate function for every row in the dataframe to determine
     * if some condition is true/truthy for **none** of rows in the dataframe.
     *
     * If no predicate is specified then it simply checks if the dataframe contains zero rows.
     *
     * @param [predicate] Optional predicate function that receives each row. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for zero rows in the dataframe, otherwise returns false. Returns false for an empty dataframe.
     *
     * @example
     * <pre>
     *
     * const noFreds = df.none(row => row.CustomerName === "Fred"); // Do we have zero customers named Fred?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const noCustomers = df.none(); // Do we have zero customers?
     * </pre>
     */
    DataFrame.prototype.none = function (predicate) {
        if (predicate) {
            if (!utils_1.isFunction(predicate))
                throw new Error("Expected 'predicate' parameter to 'DataFrame.none' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return false;
                    }
                }
            }
            catch (e_41_1) { e_41 = { error: e_41_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_41) throw e_41.error; }
            }
        }
        else {
            // Just check if empty.
            var iterator = this[Symbol.iterator]();
            return iterator.next().done;
        }
        return true; // Nothing failed the predicate.
        var e_41, _c;
    };
    //TODO: Improve this example (and subsequent examples, they look like series setup rather than dataframe)..
    /**
     * Gets a new dataframe containing all rows starting at or after the specified index value.
     *
     * @param indexValue The index value at which to start the new dataframe.
     *
     * @return Returns a new dataframe containing all rows starting at or after the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = df.startAt(2);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows starting at (or after) a particular date.
     * const result = timeSeriesDf.startAt(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.startAt = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThan = _this.getIndex().getLessThan();
            return {
                columnNames: content.columnNames,
                index: new skip_while_iterable_1.SkipWhileIterable(content.index, function (index) { return lessThan(index, indexValue); }),
                pairs: new skip_while_iterable_1.SkipWhileIterable(content.pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows up until and including the specified index value (inclusive).
     *
     * @param indexValue The index value at which to end the new dataframe.
     *
     * @return Returns a new dataframe containing all rows up until and including the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = df.endAt(1);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows ending at a particular date.
     * const result = timeSeriesDf.endAt(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.endAt = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                columnNames: content.columnNames,
                index: new take_while_iterable_1.TakeWhileIterable(content.index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new take_while_iterable_1.TakeWhileIterable(content.pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows up to the specified index value (exclusive).
     *
     * @param indexValue The index value at which to end the new dataframe.
     *
     * @return Returns a new dataframe containing all rows up to (but not including) the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = df.before(2);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows before the specified date.
     * const result = timeSeriesDf.before(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.before = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThan = _this.getIndex().getLessThan();
            return {
                columnNames: content.columnNames,
                index: new take_while_iterable_1.TakeWhileIterable(content.index, function (index) { return lessThan(index, indexValue); }),
                pairs: new take_while_iterable_1.TakeWhileIterable(content.pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows after the specified index value (exclusive).
     *
     * @param indexValue The index value after which to start the new dataframe.
     *
     * @return Returns a new dataframe containing all rows after the specified index value.
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = df.before(1);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows after the specified date.
     * const result = timeSeriesDf.after(new Date(2016, 5, 4));
     * </pre>
     */
    DataFrame.prototype.after = function (indexValue) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                columnNames: content.columnNames,
                index: new skip_while_iterable_1.SkipWhileIterable(content.index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new skip_while_iterable_1.SkipWhileIterable(content.pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new dataframe containing all rows between the specified index values (inclusive).
     *
     * @param startIndexValue The index at which to start the new dataframe.
     * @param endIndexValue The index at which to end the new dataframe.
     *
     * @return Returns a new dataframe containing all values between the specified index values (inclusive).
     *
     * @example
     * <pre>
     *
     * const df = new DataFrame({
     *      index: [0, 1, 2, 3, 4, 6], // This is the default index.
     *      values: [10, 20, 30, 40, 50, 60],
     * });
     *
     * const middleSection = df.between(1, 4);
     * expect(middleSection.toArray()).to.eql([20, 30, 40, 50]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeriesDf = ... a dataframe indexed by date/time ...
     *
     * // Get all rows between the start and end dates (inclusive).
     * const result = timeSeriesDf.after(new Date(2016, 5, 4), new Date(2016, 5, 22));
     * </pre>
     */
    DataFrame.prototype.between = function (startIndexValue, endIndexValue) {
        return this.startAt(startIndexValue).endAt(endIndexValue);
    };
    /**
     * Format the dataframe for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @return Generates and returns a string representation of the dataframe.
     *
     * @example
     * <pre>
     *
     * console.log(df.toString());
     * </pre>
     */
    DataFrame.prototype.toString = function () {
        var columnNames = this.getColumnNames();
        var header = ["__index__"].concat(columnNames);
        var table = new easy_table_1.default();
        try {
            //TODO: for (const pair of this.asPairs()) {
            for (var _a = __values(this.toPairs()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                var index = pair[0];
                var value = pair[1];
                table.cell(header[0], index);
                for (var columnIndex = 0; columnIndex < columnNames.length; ++columnIndex) {
                    var columnName = columnNames[columnIndex];
                    table.cell(header[columnIndex + 1], value[columnName]);
                }
                table.newRow();
            }
        }
        catch (e_42_1) { e_42 = { error: e_42_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_42) throw e_42.error; }
        }
        return table.toString();
        var e_42, _c;
    };
    /**
     * Parse a column with string values and convert it to a column with int values.
     *
     * @param columnNameOrNames Specifies the column name or array of column names to parse.
     *
     * @return Returns a new dataframe with values of particular named column(s) parsed from strings to ints.
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseInts("MyIntColumn");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseInts(["MyIntColumnA", "MyIntColumnA"]);
     * </pre>
     */
    DataFrame.prototype.parseInts = function (columnNameOrNames) {
        if (utils_1.isArray(columnNameOrNames)) {
            var working = this;
            try {
                for (var columnNameOrNames_1 = __values(columnNameOrNames), columnNameOrNames_1_1 = columnNameOrNames_1.next(); !columnNameOrNames_1_1.done; columnNameOrNames_1_1 = columnNameOrNames_1.next()) {
                    var columnName = columnNameOrNames_1_1.value;
                    working = working.parseInts(columnName);
                }
            }
            catch (e_43_1) { e_43 = { error: e_43_1 }; }
            finally {
                try {
                    if (columnNameOrNames_1_1 && !columnNameOrNames_1_1.done && (_a = columnNameOrNames_1.return)) _a.call(columnNameOrNames_1);
                }
                finally { if (e_43) throw e_43.error; }
            }
            return working;
        }
        else {
            return this.withSeries(columnNameOrNames, this.getSeries(columnNameOrNames).parseInts());
        }
        var e_43, _a;
    };
    /**
     * Parse a column with string values and convert it to a column with float values.
     *
     * @param columnNameOrNames Specifies the column name or array of column names to parse.
     *
     * @return Returns a new dataframe with values of particular named column(s) parsed from strings to floats.
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseFloats("MyFloatColumn");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseFloats(["MyFloatColumnA", "MyFloatColumnA"]);
     * </pre>
     */
    DataFrame.prototype.parseFloats = function (columnNameOrNames) {
        if (utils_1.isArray(columnNameOrNames)) {
            var working = this;
            try {
                for (var columnNameOrNames_2 = __values(columnNameOrNames), columnNameOrNames_2_1 = columnNameOrNames_2.next(); !columnNameOrNames_2_1.done; columnNameOrNames_2_1 = columnNameOrNames_2.next()) {
                    var columnName = columnNameOrNames_2_1.value;
                    working = working.parseFloats(columnName);
                }
            }
            catch (e_44_1) { e_44 = { error: e_44_1 }; }
            finally {
                try {
                    if (columnNameOrNames_2_1 && !columnNameOrNames_2_1.done && (_a = columnNameOrNames_2.return)) _a.call(columnNameOrNames_2);
                }
                finally { if (e_44) throw e_44.error; }
            }
            return working;
        }
        else {
            return this.withSeries(columnNameOrNames, this.getSeries(columnNameOrNames).parseFloats());
        }
        var e_44, _a;
    };
    /**
     * Parse a column with string values and convert it to a column with date values.
     *
     * @param columnNameOrNames Specifies the column name or array of column names to parse.
     * @param [formatString] Optional formatting string for dates.
     *
     * Moment is used for date parsing.
     * https://momentjs.com
     *
     * @return Returns a new dataframe with values of particular named column(s) parsed from strings to dates.
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseDates("MyDateColumn");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const parsed = df.parseDates(["MyDateColumnA", "MyDateColumnA"]);
     * </pre>
     */
    DataFrame.prototype.parseDates = function (columnNameOrNames, formatString) {
        if (formatString) {
            if (!utils_1.isString(formatString))
                throw new Error("Expected optional 'formatString' parameter to 'DataFrame.parseDates' to be a string (if specified).");
        }
        if (utils_1.isArray(columnNameOrNames)) {
            var working = this;
            try {
                for (var columnNameOrNames_3 = __values(columnNameOrNames), columnNameOrNames_3_1 = columnNameOrNames_3.next(); !columnNameOrNames_3_1.done; columnNameOrNames_3_1 = columnNameOrNames_3.next()) {
                    var columnName = columnNameOrNames_3_1.value;
                    working = working.parseDates(columnName, formatString);
                }
            }
            catch (e_45_1) { e_45 = { error: e_45_1 }; }
            finally {
                try {
                    if (columnNameOrNames_3_1 && !columnNameOrNames_3_1.done && (_a = columnNameOrNames_3.return)) _a.call(columnNameOrNames_3);
                }
                finally { if (e_45) throw e_45.error; }
            }
            return working;
        }
        else {
            return this.withSeries(columnNameOrNames, this.getSeries(columnNameOrNames).parseDates(formatString));
        }
        var e_45, _a;
    };
    /**
     * Convert a column of values of different types to a column of string values.
     *
     * @param columnNames Specifies the column name or array of column names to convert to strings. Can also be a format spec that specifies which columns to convert and what their format should be.
     * @param [formatString] Optional formatting string for dates.
     *
     * Numeral.js is used for number formatting.
     * http://numeraljs.com/
     *
     * Moment is used for date formatting.
     * https://momentjs.com/docs/#/parsing/string-format/
     *
     * @return Returns a new dataframe with a particular named column converted from values to strings.
     *
     * @example
     * <pre>
     *
     * const result = df.toStrings("MyDateColumn", "YYYY-MM-DD");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = df.toStrings("MyFloatColumn", "0.00");
     * </pre>
     */
    DataFrame.prototype.toStrings = function (columnNames, formatString) {
        if (utils_1.isObject(columnNames)) {
            try {
                for (var _a = __values(Object.keys(columnNames)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (!utils_1.isString(columnNames[columnName]))
                        throw new Error("Expected values of 'columnNames' parameter to be strings when a format spec is passed in.");
                }
            }
            catch (e_46_1) { e_46 = { error: e_46_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_46) throw e_46.error; }
            }
            if (!utils_1.isUndefined(formatString))
                throw new Error("Optional 'formatString' parameter to 'DataFrame.toStrings' should not be set when passing in a format spec.");
        }
        else {
            if (!utils_1.isArray(columnNames)) {
                if (!utils_1.isString(columnNames))
                    throw new Error("Expected 'columnNames' parameter to 'DataFrame.toStrings' to be a string, array of strings or format spec that specifes which columns should be converted to strings.");
            }
            if (formatString) {
                if (!utils_1.isString(formatString))
                    throw new Error("Expected optional 'formatString' parameter to 'DataFrame.toStrings' to be a string (if specified).");
            }
        }
        if (utils_1.isObject(columnNames)) {
            var working = this;
            try {
                for (var _d = __values(Object.keys(columnNames)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var columnName = _e.value;
                    working = working.toStrings(columnName, formatString);
                }
            }
            catch (e_47_1) { e_47 = { error: e_47_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                }
                finally { if (e_47) throw e_47.error; }
            }
            return working;
        }
        else if (utils_1.isArray(columnNames)) {
            var working = this;
            try {
                for (var columnNames_9 = __values(columnNames), columnNames_9_1 = columnNames_9.next(); !columnNames_9_1.done; columnNames_9_1 = columnNames_9.next()) {
                    var columnName = columnNames_9_1.value;
                    var columnFormatString = columnNames[columnName];
                    working = working.toStrings(columnName, columnFormatString);
                }
            }
            catch (e_48_1) { e_48 = { error: e_48_1 }; }
            finally {
                try {
                    if (columnNames_9_1 && !columnNames_9_1.done && (_g = columnNames_9.return)) _g.call(columnNames_9);
                }
                finally { if (e_48) throw e_48.error; }
            }
            return working;
        }
        else {
            var singleColumnName = columnNames;
            return this.withSeries(singleColumnName, this.getSeries(singleColumnName).toStrings(formatString));
        }
        var e_46, _c, e_47, _f, e_48, _g;
    };
    /**
     * Produces a new dataframe with all string values truncated to the requested maximum length.
     *
     * @param maxLength The maximum length of the string values after truncation.
     *
     * @return Returns a new dataframe with all strings truncated to the specified maximum length.
     *
     * @example
     * <pre>
     *
     * // Truncate all string columns to 100 characters maximum.
     * const truncatedDf = df.truncateString(100);
     * </pre>
     */
    DataFrame.prototype.truncateStrings = function (maxLength) {
        if (!utils_1.isNumber(maxLength))
            throw new Error("Expected 'maxLength' parameter to 'truncateStrings' to be an integer.");
        return this.select(function (row) {
            var output = {};
            try {
                for (var _a = __values(Object.keys(row)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    var value = row[key];
                    if (utils_1.isString(value)) {
                        output[key] = value.substring(0, maxLength);
                    }
                    else {
                        output[key] = value;
                    }
                }
            }
            catch (e_49_1) { e_49 = { error: e_49_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_49) throw e_49.error; }
            }
            return output;
            var e_49, _c;
        });
    };
    /**
     * Forces lazy evaluation to complete and 'bakes' the dataframe into memory.
     *
     * @return Returns a dataframe that has been 'baked', all lazy evaluation has completed.
     *
     * @example
     * <pre>
     *
     * const baked = df.bake();
     * </pre>
     */
    DataFrame.prototype.bake = function () {
        if (this.getContent().isBaked) {
            // Already baked.
            return this;
        }
        return new DataFrame({
            columnNames: this.getColumnNames(),
            values: this.toArray(),
            pairs: this.toPairs(),
            baked: true,
        });
    };
    /**
     * Gets a new dataframe in reverse order.
     *
     * @return Returns a new dataframe that is the reverse of the input.
     *
     * @example
     * <pre>
     *
     * const reversedDf = df.reverse();
     * </pre>
     */
    DataFrame.prototype.reverse = function () {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new reverse_iterable_1.ReverseIterable(content.values),
                index: new reverse_iterable_1.ReverseIterable(content.index),
                pairs: new reverse_iterable_1.ReverseIterable(content.pairs)
            };
        });
    };
    /**
     * Returns only the set of rows in the dataframe that are distinct according to some criteria.
     * This can be used to remove duplicate rows from the dataframe.
     *
     * @param selector User-defined selector function that specifies the criteria used to make comparisons for duplicate rows.
     *
     * @return Returns a dataframe containing only unique values as determined by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * // Remove duplicate rows by customer id. Will return only a single row per customer.
     * const distinctCustomers = salesDf.distinct(sale => sale.CustomerId);
     * </pre>
     */
    DataFrame.prototype.distinct = function (selector) {
        var _this = this;
        return new DataFrame(function () {
            var content = _this.getContent();
            return {
                columnNames: content.columnNames,
                values: new distinct_iterable_1.DistinctIterable(content.values, selector),
                pairs: new distinct_iterable_1.DistinctIterable(content.pairs, function (pair) { return selector && selector(pair[1]) || pair[1]; })
            };
        });
    };
    /**
     * Collects rows in the dataframe into a series of groups according to the user-defined selector function that defines the group for each row.
     *
     * @param selector User-defined selector function that defines the value to group by.
     *
     * @return Returns a {@link Series} of groups. Each group is a dataframe with values that have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const salesDf = ... product sales ...
     * const salesByProduct = salesDf.groupBy(sale => sale.ProductId);
     * for (const productSalesGroup of salesByProduct) {
     *      // ... do something with each product group ...
     *      const productId = productSalesGroup.first().ProductId;
     *      const totalSalesForProduct = productSalesGroup.deflate(sale => sale.Amount).sum();
     *      console.log(totalSalesForProduct);
     * }
     * </pre>
     */
    DataFrame.prototype.groupBy = function (selector) {
        var _this = this;
        if (!utils_1.isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'DataFrame.groupBy' to be a selector function that determines the value to group the series by.");
        return new series_1.Series(function () {
            var groups = []; // Each group, in order of discovery.
            var groupMap = {}; // Group map, records groups by key.
            var valueIndex = 0;
            try {
                for (var _a = __values(_this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var pair = _b.value;
                    var groupKey = selector(pair[1], valueIndex);
                    ++valueIndex;
                    var existingGroup = groupMap[groupKey];
                    if (existingGroup) {
                        existingGroup.push(pair);
                    }
                    else {
                        var newGroup = [];
                        newGroup.push(pair);
                        groups.push(newGroup);
                        groupMap[groupKey] = newGroup;
                    }
                }
            }
            catch (e_50_1) { e_50 = { error: e_50_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_50) throw e_50.error; }
            }
            return {
                values: groups.map(function (group) { return new DataFrame({ pairs: group }); })
            };
            var e_50, _c;
        });
    };
    /**
     * Collects rows in the dataframe into a series of groups according to a user-defined selector function that identifies adjacent rows that should be in the same group.
     *
     * @param selector Optional selector that defines the value to group by.
     *
     * @return Returns a {@link Series} of groups. Each group is a dataframe with values that have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * // Some ultra simple stock trading strategy backtesting...
     * const dailyStockPriceDf = ... daily stock price for a company ...
     * const priceGroups  = dailyStockPriceDf.groupBy(day => day.close > day.movingAverage);
     * for (const priceGroup of priceGroups) {
     *      // ... do something with each stock price group ...
     *
     *      const firstDay = priceGroup.first();
     *      if (firstDay.close > movingAverage) {
     *          // This group of days has the stock price above its moving average.
     *          // ... maybe enter a long trade here ...
     *      }
     *      else {
     *          // This group of days has the stock price below its moving average.
     *          // ... maybe enter a short trade here ...
     *      }
     * }
     * </pre>
     */
    DataFrame.prototype.groupSequentialBy = function (selector) {
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'DataFrame.groupSequentialBy' to be a selector function that determines the value to group the series by.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); });
    };
    /**
     * Concatenate multiple dataframes into a single dataframe.
     *
     * @param dataframes Array of dataframes to concatenate.
     *
     * @return Returns a single dataframe concatenated from multiple input dataframes.
     *
     * @example
     * <pre>
     *
     * const df1 = ...
     * const df2 = ...
     * const df3 = ...
     * const concatenatedDf = DataFrame.concat([df1, df2, df3]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dfs = [... array of dataframes...];
     * const concatenatedDf = DataFrame.concat(dfs);
     * </pre>
     */
    DataFrame.concat = function (dataframes) {
        if (!utils_1.isArray(dataframes))
            throw new Error("Expected 'dataframes' parameter to 'DataFrame.concat' to be an array of dataframes.");
        return new DataFrame(function () {
            var upcast = dataframes; // Upcast so that we can access private index, values and pairs.
            var contents = upcast.map(function (dataframe) { return dataframe.getContent(); });
            var columnNames = [];
            try {
                for (var contents_1 = __values(contents), contents_1_1 = contents_1.next(); !contents_1_1.done; contents_1_1 = contents_1.next()) {
                    var content = contents_1_1.value;
                    try {
                        for (var _a = __values(content.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var columnName = _b.value;
                            columnNames.push(columnName);
                        }
                    }
                    catch (e_51_1) { e_51 = { error: e_51_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_51) throw e_51.error; }
                    }
                }
            }
            catch (e_52_1) { e_52 = { error: e_52_1 }; }
            finally {
                try {
                    if (contents_1_1 && !contents_1_1.done && (_d = contents_1.return)) _d.call(contents_1);
                }
                finally { if (e_52) throw e_52.error; }
            }
            columnNames = utils_1.makeDistinct(columnNames);
            return {
                columnNames: columnNames,
                values: new concat_iterable_1.ConcatIterable(contents.map(function (content) { return content.values; })),
                pairs: new concat_iterable_1.ConcatIterable(contents.map(function (content) { return content.pairs; })),
            };
            var e_52, _d, e_51, _c;
        });
    };
    /**
     * Concatenate multiple other dataframes onto this dataframe.
     *
     * @param dataframes Multiple arguments. Each can be either a dataframe or an array of dataframes.
     *
     * @return Returns a single dataframes concatenated from multiple input dataframes.
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat(dfB, dfC);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat([dfB, dfC]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenatedDf = dfA.concat(dfB, [dfC, dfD]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const otherDfs = [... array of dataframes...];
     * const concatenatedDf = dfA.concat(otherDfs);
     * </pre>
     */
    DataFrame.prototype.concat = function () {
        var dataframes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dataframes[_i] = arguments[_i];
        }
        var concatInput = [this];
        try {
            for (var dataframes_1 = __values(dataframes), dataframes_1_1 = dataframes_1.next(); !dataframes_1_1.done; dataframes_1_1 = dataframes_1.next()) {
                var input = dataframes_1_1.value;
                if (utils_1.isArray(input)) {
                    try {
                        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                            var subInput = input_1_1.value;
                            concatInput.push(subInput);
                        }
                    }
                    catch (e_53_1) { e_53 = { error: e_53_1 }; }
                    finally {
                        try {
                            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
                        }
                        finally { if (e_53) throw e_53.error; }
                    }
                }
                else {
                    concatInput.push(input);
                }
            }
        }
        catch (e_54_1) { e_54 = { error: e_54_1 }; }
        finally {
            try {
                if (dataframes_1_1 && !dataframes_1_1.done && (_b = dataframes_1.return)) _b.call(dataframes_1);
            }
            finally { if (e_54) throw e_54.error; }
        }
        return DataFrame.concat(concatInput);
        var e_54, _b, e_53, _a;
    };
    /**
    * Zip (or merge) together multiple dataframes to create a new dataframe.
    * Preserves the index of the first dataframe.
    *
    * @param input An iterable of datafames to be zipped.
    * @param zipper User-defined zipper function that merges rows. It produces rows for the new dataframe based-on rows from the input dataframes.
    *
    * @return Returns a single dataframe zipped (or merged) from multiple input dataframes.
    *
    * @example
    * <pre>
    *
    * function produceNewRow (inputRows) {
    *       const outputRow = {
    *           // Produce output row based on the contents of the input rows.
    *       };
    *       return outputRow;
    * }
    *
    * const inputDfs = [... array of input dataframes ...];
    * const zippedDf = DataFrame.zip(inputDfs, produceNewRow);
    *
    * </pre>
    *
    * @example
    * <pre>
    *
    * function produceNewRow (inputRows) {
    *       const outputRow = {
    *           // Produce output row based on the contents of the input rows.
    *       };
    *       return outputRow;
    * }
    *
    * const dfA = new DataFrame([ { Value: 10 }, { Value: 20 }, { Value: 30 }]);
    * const dfB = new DataFrame([ { Value: 100 }, { Value: 200 }, { Value: 300 }]);
    * const zippedDf = DataFrame.zip([dfA, dfB], produceNewRow);
    * </pre>
    */
    DataFrame.zip = function (dataframes, zipper) {
        var input = Array.from(dataframes);
        if (input.length === 0) {
            return new DataFrame();
        }
        var firstSeries = input[0];
        if (firstSeries.none()) {
            return new DataFrame();
        }
        return new DataFrame(function () {
            var firstSeriesUpCast = firstSeries;
            var upcast = input; // Upcast so that we can access private index, values and pairs.
            return {
                index: firstSeriesUpCast.getContent().index,
                values: new zip_iterable_1.ZipIterable(upcast.map(function (s) { return s.getContent().values; }), zipper),
            };
        });
    };
    DataFrame.prototype.zip = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selector = args[args.length - 1];
        var input = [this].concat(args.slice(0, args.length - 1));
        return DataFrame.zip(input, function (values) { return selector.apply(void 0, __spread(values)); });
    };
    /**
     * Sorts the dataframe in ascending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new dataframe that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by amount from least to most.
     * const orderedDf = salesDf.orderBy(sale => sale.Amount);
     * </pre>
     */
    DataFrame.prototype.orderBy = function (selector) {
        var content = this.getContent();
        return new OrderedDataFrame({
            columnNames: content.columnNames,
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Ascending,
            parent: null,
        });
    };
    /**
     * Sorts the dataframe in descending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new dataframe that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by amount from most to least
     * const orderedDf = salesDf.orderByDescending(sale => sale.Amount);
     * </pre>
     */
    DataFrame.prototype.orderByDescending = function (selector) {
        var content = this.getContent();
        return new OrderedDataFrame({
            columnNames: content.columnNames,
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Descending,
            parent: null,
        });
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains the union of rows from the two input dataframes.
     * These are the unique combination of rows in both dataframe.
     * This is basically a concatenation and then elimination of duplicates.
     *
     * @param other The other dataframes to merge.
     * @param [selector] Optional user-defined selector function that selects the value to compare to detemrine distinctness.
     *
     * @return Returns the union of the two dataframes.
     *
     * @example
     * <pre>
     *
     * const dfA = ...
     * const dfB = ...
     * const merged = dfA.union(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records that may contain the same
     * // customer record in each set. This is basically a concatenation
     * // of the dataframes and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA.union(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     *
     *
     * @example
     * <pre>
     *
     * // Note that you can achieve the exact same result as the previous
     * // example by doing a {@link DataFrame.concat) and {@link DataFrame.distinct}
     * // of the dataframes and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA
     *      .concat(customerRecordsB)
     *      .distinct(customerRecord => customerRecord.CustomerId);
     * </pre>
     *
     */
    DataFrame.prototype.union = function (other, selector) {
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected optional 'selector' parameter to 'DataFrame.union' to be a selector function.");
        }
        return this.concat(other).distinct(selector);
    };
    ;
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains the intersection of rows from the two input dataframes.
     * These are only the rows that appear in both dataframes.
     *
     * @param inner The inner dataframe to merge (the dataframe you call the function on is the 'outer' dataframe).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer dataframe that is used to match the two dataframes.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner dataframe that is used to match the two dataframes.
     *
     * @return Returns a new dataframe that contains the intersection of rows from the two input dataframes.
     *
     * @example
     * <pre>
     *
     * const dfA = ...
     * const dfB = ...
     * const mergedDf = dfA.intersection(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records to find only the
     * // customers that appears in both.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const intersectionOfCustomerRecords = customerRecordsA.intersection(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     * */
    DataFrame.prototype.intersection = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!utils_1.isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'DataFrame.intersection' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!utils_1.isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'DataFrame.intersection' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .any();
        });
    };
    ;
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only the rows from the 1st dataframe that don't appear in the 2nd dataframe.
     * This is essentially subtracting the rows from the 2nd dataframe from the 1st and creating a new dataframe with the remaining rows.
     *
     * @param inner The inner dataframe to merge (the dataframe you call the function on is the 'outer' dataframe).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer dataframe that is used to match the two dataframes.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner dataframe that is used to match the two dataframes.
     *
     * @return Returns a new dataframe that contains only the rows from the 1st dataframe that don't appear in the 2nd dataframe.
     *
     * @example
     * <pre>
     *
     * const dfA = ...
     * const dfB = ...
     * const remainingDf = dfA.except(dfB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Find the list of customers haven't bought anything recently.
     * const allCustomers = ... list of all customers ...
     * const recentCustomers = ... list of customers who have purchased recently ...
     * const remainingCustomers = allCustomers.except(
     *      recentCustomers,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     */
    DataFrame.prototype.except = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!utils_1.isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'DataFrame.except' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!utils_1.isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'DataFrame.except' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .none();
        });
    };
    ;
    /**
      * Creates a new dataframe by merging two input dataframes.
      * The resulting dataframe contains only those rows that have matching keys in both input dataframes.
      *
      * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
      * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
      * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
      * @param resultSelector User-defined function that merges outer and inner values.
      *
      * @return Returns the new merged dataframe.
      *
      * @example
      * <pre>
      *
      * // Join together two sets of customers to find those
      * // that have bought both product A and product B.
      * const customerWhoBoughtProductA = ...
      * const customerWhoBoughtProductB = ...
      * const customersWhoBoughtBothProductsDf = customerWhoBoughtProductA.join(
      *          customerWhoBoughtProductB,
      *          customerA => customerA.CustomerId, // Join key.
      *          customerB => customerB.CustomerId, // Join key.
      *          (customerA, customerB) => {
      *              return {
      *                  // ... merge the results ...
      *              };
      *          }
      *      );
      * </pre>
      */
    DataFrame.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.join' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.join' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.join' to be a selector function.");
        var outer = this;
        return new DataFrame(function () {
            var innerMap = inner
                .groupBy(innerKeySelector)
                .toObject(function (group) { return innerKeySelector(group.first()); }, function (group) { return group; });
            var outerContent = outer.getContent();
            var output = [];
            try {
                for (var outer_1 = __values(outer), outer_1_1 = outer_1.next(); !outer_1_1.done; outer_1_1 = outer_1.next()) {
                    var outerValue = outer_1_1.value;
                    var outerKey = outerKeySelector(outerValue);
                    var innerGroup = innerMap[outerKey];
                    if (innerGroup) {
                        try {
                            for (var innerGroup_1 = __values(innerGroup), innerGroup_1_1 = innerGroup_1.next(); !innerGroup_1_1.done; innerGroup_1_1 = innerGroup_1.next()) {
                                var innerValue = innerGroup_1_1.value;
                                output.push(resultSelector(outerValue, innerValue));
                            }
                        }
                        catch (e_55_1) { e_55 = { error: e_55_1 }; }
                        finally {
                            try {
                                if (innerGroup_1_1 && !innerGroup_1_1.done && (_a = innerGroup_1.return)) _a.call(innerGroup_1);
                            }
                            finally { if (e_55) throw e_55.error; }
                        }
                    }
                }
            }
            catch (e_56_1) { e_56 = { error: e_56_1 }; }
            finally {
                try {
                    if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) _b.call(outer_1);
                }
                finally { if (e_56) throw e_56.error; }
            }
            return {
                values: output
            };
            var e_56, _b, e_55, _a;
        });
    };
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only those rows that are only present in or or the other of the dataframes, not both.
     *
     * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged dataframe.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either product A or product B, not not both.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const customersWhoBoughtEitherProductButNotBothDf = customerWhoBoughtProductA.joinOuter(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    DataFrame.prototype.joinOuter = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.joinOuter' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.joinOuter' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.joinOuter' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the results in the inner that are not in the outer.
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .concat(innerResult)
            .resetIndex();
    };
    ;
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only those rows that present either in both dataframes or only in the outer (left) dataframe.
     *
     * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged dataframe.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product A or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterLeft(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    DataFrame.prototype.joinOuterLeft = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.joinOuterLeft' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.joinOuterLeft' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.joinOuterLeft' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .resetIndex();
    };
    ;
    /**
     * Creates a new dataframe by merging two input dataframes.
     * The resulting dataframe contains only those rows that present either in both dataframes or only in the inner (right) dataframe.
     *
     * @param inner The 'inner' dataframe to join (the dataframe you are callling the function on is the 'outer' dataframe).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer dataframe.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner dataframe.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged dataframe.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product B or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterRight(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    DataFrame.prototype.joinOuterRight = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'DataFrame.joinOuterRight' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'DataFrame.joinOuterRight' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'DataFrame.joinOuterRight' to be a selector function.");
        // Get the results in the inner that are not in the outer.
        var outer = this;
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return intersectionResults
            .concat(innerResult)
            .resetIndex();
    };
    /**
     * Produces a summary of dataframe. A bit like the 'aggregate' function but much simpler.
     *
     * @param [spec] Optional parameter that specifies which columns to aggregate and how to aggregate them. Leave this out to produce a default summary of all columns.
     *
     * @returns A object with fields that summary the values in the dataframe.
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize();
     * console.log(summary);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize({ // Summarize using pre-defined functions.
     *      Column1: Series.sum,
     *      Column2: Series.average,
     *      Column3: Series.count,
     * });
     * console.log(summary);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize({ // Summarize using custom functions.
     *      Column1: series => series.sum(),
     *      Column2: series => series.std(),
     *      ColumnN: whateverFunctionYouWant,
     * });
     * console.log(summary);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const summary = df.summarize({ // Multiple output fields per column.
     *      Column1: {
     *          OutputField1: Series.sum,
     *          OutputField2: Series.average,
     *      },
     *      Column2: {
     *          OutputField3: series => series.sum(),
     *          OutputFieldN: whateverFunctionYouWant,
     *      },
     * });
     * console.log(summary);
     * </pre>
     */
    DataFrame.prototype.summarize = function (spec) {
        if (spec && !utils_1.isObject(spec)) {
            throw new Error("Expected 'spec' parameter to 'DataFrame.summarize' to be an object that specifies how to summarize the dataframe.");
        }
        if (!spec) {
            spec = {};
            try {
                for (var _a = __values(this.getColumnNames()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    var columnSpec = {};
                    columnSpec[columnName + "_sum"] = series_1.Series.sum;
                    columnSpec[columnName + "_average"] = series_1.Series.average;
                    columnSpec[columnName + "_count"] = series_1.Series.count;
                    spec[columnName] = columnSpec;
                }
            }
            catch (e_57_1) { e_57 = { error: e_57_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_57) throw e_57.error; }
            }
        }
        try {
            for (var _d = __values(Object.keys(spec)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var inputColumnName = _e.value;
                var inputSpec = spec[inputColumnName];
                if (utils_1.isFunction(inputSpec)) {
                    spec[inputColumnName] = {}; // Expand the spec.
                    spec[inputColumnName][inputColumnName] = inputSpec;
                }
            }
        }
        catch (e_58_1) { e_58 = { error: e_58_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_58) throw e_58.error; }
        }
        var inputColumnNames = Object.keys(spec);
        var outputFieldsMap = utils_1.toMap(inputColumnNames, function (valueColumnName) { return valueColumnName; }, function (inputColumnName) { return Object.keys(spec[inputColumnName]); });
        var output = {};
        try {
            for (var inputColumnNames_3 = __values(inputColumnNames), inputColumnNames_3_1 = inputColumnNames_3.next(); !inputColumnNames_3_1.done; inputColumnNames_3_1 = inputColumnNames_3.next()) {
                var inputColumnName = inputColumnNames_3_1.value;
                var outputFieldNames = outputFieldsMap[inputColumnName];
                try {
                    for (var outputFieldNames_1 = __values(outputFieldNames), outputFieldNames_1_1 = outputFieldNames_1.next(); !outputFieldNames_1_1.done; outputFieldNames_1_1 = outputFieldNames_1.next()) {
                        var outputFieldName = outputFieldNames_1_1.value;
                        var aggregatorFn = spec[inputColumnName][outputFieldName];
                        output[outputFieldName] = aggregatorFn(this.getSeries(inputColumnName));
                    }
                }
                catch (e_59_1) { e_59 = { error: e_59_1 }; }
                finally {
                    try {
                        if (outputFieldNames_1_1 && !outputFieldNames_1_1.done && (_g = outputFieldNames_1.return)) _g.call(outputFieldNames_1);
                    }
                    finally { if (e_59) throw e_59.error; }
                }
            }
        }
        catch (e_60_1) { e_60 = { error: e_60_1 }; }
        finally {
            try {
                if (inputColumnNames_3_1 && !inputColumnNames_3_1.done && (_h = inputColumnNames_3.return)) _h.call(inputColumnNames_3);
            }
            finally { if (e_60) throw e_60.error; }
        }
        return output;
        var e_57, _c, e_58, _f, e_60, _h, e_59, _g;
    };
    /**
     * Reshape (or pivot) a dataframe based on column values.
     * This is a powerful function that combines grouping, aggregation and sorting.
     *
     * @param columnOrColumns Column name whose values make the new DataFrame's columns.
     * @param valueColumnNameOrSpec Column name or column spec that defines the columns whose values should be aggregated.
     * @param [aggregator] Optional function used to aggregate pivotted vales.
     *
     * @return Returns a new dataframe that has been pivoted based on a particular column's values.
     *
     * @example
     * <pre>
     *
     * // Simplest example.
     * // Group by the values in 'PivotColumn'.
     * // The unique set of values in 'PivotColumn' becomes the columns in the resulting dataframe.
     * // The column 'ValueColumn' is aggregated for each group and this becomes the
     * // values in the new output column.
     * const pivottedDf = df.pivot("PivotColumn", "ValueColumn", values => values.average());
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Multiple input column example.
     * // Similar to the previous example except now we are aggregating multiple input columns.
     * // Each group has the average computed for 'ValueColumnA' and the sum for 'ValueColumnB'.
     * const pivottedDf = df.pivot("PivotColumn", {
     *      ValueColumnA: aValues => aValues.average(),
     *      ValueColumnB:  bValues => bValues.sum(),
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Multiple output column example.
     * // Similar to the previous example except now we are doing multiple aggregations for each input column.
     * // The example produces an output dataframe with columns OutputColumnA, B, C and D.
     * // OutputColumnA/B are the sum and average of ValueColumnA across each group as defined by PivotColumn.
     * // OutputColumnC/D are the sum and average of ValueColumnB across each group as defined by PivotColumn.
     * const pivottedDf = df.pivot("PivotColumn", {
     *      ValueColumnA: {
     *          OutputColumnA: aValues => aValues.sum(),
     *          OutputColumnB: aValues => aValues.average(),
     *      },
     *      ValueColumnB: {
     *          OutputColumnC: bValues => aValues.sum(),
     *          OutputColumnD: bValues => aValues.average(),
     *      },
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Full multi-column example.
     * // Similar to the previous example now we are pivotting on multiple columns.
     * // We now group by the 'PivotColumnA' and then by 'PivotColumnB', effectively creating a
     * // multi-level group.
     * const pivottedDf = df.pivot(["PivotColumnA", "PivotColumnB" ], {
     *      ValueColumnA: aValues => aValues.average(),
     *      ValueColumnB:  bValues => bValues.sum(),
     * });
     * </pre>
     *
     * @example
     * <pre>
     *
     * // To help understand the pivot function, let's look at what it does internally.
     * // Take the simplest example:
     * const pivottedDf = df.pivot("PivotColumn", "ValueColumn", values => values.average());
     *
     * // If we expand out the internals of the pivot function, it will look something like this:
     * const pivottedDf = df.groupBy(row => row.PivotColumn)
     *          .select(group => ({
     *              PivotColumn: group.deflate(row.ValueColumn).average()
     *          }))
     *          .orderBy(row  => row.PivotColumn);
     *
     * // You can see that pivoting a dataframe is the same as grouping, aggregating and sorting it.
     * // Does pivoting seem simpler now?
     *
     * // It gets more complicated than that of course, because the pivot function supports multi-level nested
     * // grouping and aggregation of multiple columns. So a full expansion of the pivot function is rather complex.
     * </pre>
     */
    DataFrame.prototype.pivot = function (columnOrColumns, valueColumnNameOrSpec, aggregator) {
        var columnNames;
        if (utils_1.isString(columnOrColumns)) {
            columnNames = [columnOrColumns];
        }
        else {
            if (!utils_1.isArray(columnOrColumns))
                throw new Error("Expected 'columnOrColumns' parameter to 'DataFrame.pivot' to be a string or an array of strings that identifies the column(s) whose values make the new DataFrame's columns.");
            columnNames = Array.from(columnOrColumns);
            if (columnNames.length === 0)
                throw new Error("Expected 'columnOrColumns' parameter to 'DataFrame.pivot' to contain at least one string.");
            try {
                for (var columnNames_10 = __values(columnNames), columnNames_10_1 = columnNames_10.next(); !columnNames_10_1.done; columnNames_10_1 = columnNames_10.next()) {
                    var columnName = columnNames_10_1.value;
                    if (!utils_1.isString(columnName))
                        throw new Error("Expected 'columnOrColumns' parameter to 'DataFrame.pivot' to be an array of strings, each string identifies a column in the DataFrame on which to pivot.");
                }
            }
            catch (e_61_1) { e_61 = { error: e_61_1 }; }
            finally {
                try {
                    if (columnNames_10_1 && !columnNames_10_1.done && (_a = columnNames_10.return)) _a.call(columnNames_10);
                }
                finally { if (e_61) throw e_61.error; }
            }
        }
        var aggSpec;
        if (!utils_1.isObject(valueColumnNameOrSpec)) {
            if (!utils_1.isString(valueColumnNameOrSpec))
                throw new Error("Expected 'value' parameter to 'DataFrame.pivot' to be a string that identifies the column whose values to aggregate or a column spec that defines which column contains the value ot aggregate and the ways to aggregate that value.");
            if (!utils_1.isFunction(aggregator))
                throw new Error("Expected 'aggregator' parameter to 'DataFrame.pivot' to be a function to aggegrate pivoted values.");
            var aggColumnName = valueColumnNameOrSpec;
            var outputSpec = {};
            outputSpec[aggColumnName] = aggregator;
            aggSpec = {};
            aggSpec[aggColumnName] = outputSpec;
        }
        else {
            aggSpec = valueColumnNameOrSpec;
            try {
                for (var _b = __values(Object.keys(aggSpec)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var inputColumnName = _c.value;
                    var columnAggSpec = aggSpec[inputColumnName];
                    if (utils_1.isFunction(columnAggSpec)) {
                        aggSpec[inputColumnName] = {}; // Expand the pivot spec.
                        aggSpec[inputColumnName][inputColumnName] = columnAggSpec;
                    }
                }
            }
            catch (e_62_1) { e_62 = { error: e_62_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                }
                finally { if (e_62) throw e_62.error; }
            }
        }
        var firstColumnName = columnNames[0];
        var working = this.groupBy(function (row) { return row[firstColumnName]; })
            .select(function (group) {
            var output = {};
            output[firstColumnName] = group.first()[firstColumnName];
            output.src = group;
            return output;
        });
        var _loop_1 = function (columnNameIndex) {
            var nextColumnName = columnNames[columnNameIndex];
            working = working.selectMany(function (parentGroup) {
                var src = parentGroup.src;
                return src.groupBy(function (row) { return row[nextColumnName]; })
                    .select(function (subGroup) {
                    var output = Object.assign({}, parentGroup);
                    output[nextColumnName] = subGroup.first()[nextColumnName];
                    output.src = subGroup;
                    return output;
                });
            });
        };
        for (var columnNameIndex = 1; columnNameIndex < columnNames.length; ++columnNameIndex) {
            _loop_1(columnNameIndex);
        }
        var valueColumnNames = Object.keys(aggSpec);
        var outputColumnsMap = utils_1.toMap(valueColumnNames, function (valueColumnName) { return valueColumnName; }, function (valueColumnName) { return Object.keys(aggSpec[valueColumnName]); });
        var pivotted = working.inflate(function (row) {
            var _loop_2 = function (valueColumnName) {
                var outputColumnNames = outputColumnsMap[valueColumnName];
                try {
                    for (var outputColumnNames_1 = __values(outputColumnNames), outputColumnNames_1_1 = outputColumnNames_1.next(); !outputColumnNames_1_1.done; outputColumnNames_1_1 = outputColumnNames_1.next()) {
                        var outputColumName = outputColumnNames_1_1.value;
                        var aggregatorFn = aggSpec[valueColumnName][outputColumName];
                        row[outputColumName] = aggregatorFn(row.src.deflate(function (srcRow) { return srcRow[valueColumnName]; }));
                    }
                }
                catch (e_63_1) { e_63 = { error: e_63_1 }; }
                finally {
                    try {
                        if (outputColumnNames_1_1 && !outputColumnNames_1_1.done && (_a = outputColumnNames_1.return)) _a.call(outputColumnNames_1);
                    }
                    finally { if (e_63) throw e_63.error; }
                }
                var e_63, _a;
            };
            try {
                for (var valueColumnNames_1 = __values(valueColumnNames), valueColumnNames_1_1 = valueColumnNames_1.next(); !valueColumnNames_1_1.done; valueColumnNames_1_1 = valueColumnNames_1.next()) {
                    var valueColumnName = valueColumnNames_1_1.value;
                    _loop_2(valueColumnName);
                }
            }
            catch (e_64_1) { e_64 = { error: e_64_1 }; }
            finally {
                try {
                    if (valueColumnNames_1_1 && !valueColumnNames_1_1.done && (_a = valueColumnNames_1.return)) _a.call(valueColumnNames_1);
                }
                finally { if (e_64) throw e_64.error; }
            }
            delete row.src;
            return row;
            var e_64, _a;
        });
        var ordered = pivotted.orderBy(function (row) { return row[firstColumnName]; });
        var _loop_3 = function (columnNameIndex) {
            var nextColumnName = columnNames[columnNameIndex];
            ordered = ordered.thenBy(function (row) { return row[nextColumnName]; });
        };
        for (var columnNameIndex = 1; columnNameIndex < columnNames.length; ++columnNameIndex) {
            _loop_3(columnNameIndex);
        }
        return ordered;
        var e_61, _a, e_62, _d;
    };
    /**
     * Insert a pair at the start of the dataframe.
     * Doesn't modify the original dataframe! The returned dataframe is entirely new and contains rows from the original dataframe plus the inserted pair.
     *
     * @param pair The pair to insert.
     *
     * @return Returns a new dataframe with the specified pair inserted.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to insert ...
     * const insertedDf = df.insertPair([newIndex, newRows]);
     * </pre>
     */
    DataFrame.prototype.insertPair = function (pair) {
        if (!utils_1.isArray(pair))
            throw new Error("Expected 'pair' parameter to 'DataFrame.insertPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'DataFrame.insertPair' to be an array with two elements. The first element is the index, the second is the value.");
        return (new DataFrame({ pairs: [pair] })).concat(this);
    };
    /**
     * Append a pair to the end of a dataframe.
     * Doesn't modify the original dataframe! The returned dataframe is entirely new and contains rows from the original dataframe plus the appended pair.
     *
     * @param pair - The pair to append.
     *
     * @return Returns a new dataframe with the specified pair appended.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to append ...
     * const appendedDf = df.appendPair([newIndex, newRows]);
     * </pre>
     */
    DataFrame.prototype.appendPair = function (pair) {
        if (!utils_1.isArray(pair))
            throw new Error("Expected 'pair' parameter to 'DataFrame.appendPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'DataFrame.appendPair' to be an array with two elements. The first element is the index, the second is the value.");
        return this.concat(new DataFrame({ pairs: [pair] }));
    };
    /**
     * Fill gaps in a dataframe.
     *
     * @param comparer User-defined comparer function that is passed pairA and pairB, two consecutive rows, return truthy if there is a gap between the rows, or falsey if there is no gap.
     * @param generator User-defined generator function that is passed pairA and pairB, two consecutive rows, returns an array of pairs that fills the gap between the rows.
     *
     * @return Returns a new dataframe with gaps filled in.
     *
     * @example
     * <pre>
     *
     *   var sequenceWithGaps = ...
     *
     *  // Predicate that determines if there is a gap.
     *  var gapExists = (pairA, pairB) => {
     *      // Returns true if there is a gap.
     *      return true;
     *  };
     *
     *  // Generator function that produces new rows to fill the game.
     *  var gapFiller = (pairA, pairB) => {
     *      // Create an array of index, value pairs that fill the gaps between pairA and pairB.
     *      return [
     *          newPair1,
     *          newPair2,
     *          newPair3,
     *      ];
     *  };
     *
     *  var sequenceWithoutGaps = sequenceWithGaps.fillGaps(gapExists, gapFiller);
     * </pre>
     */
    DataFrame.prototype.fillGaps = function (comparer, generator) {
        if (!utils_1.isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'DataFrame.fillGaps' to be a comparer function that compares two values and returns a boolean.");
        if (!utils_1.isFunction(generator))
            throw new Error("Expected 'generator' parameter to 'DataFrame.fillGaps' to be a generator function that takes two values and returns an array of generated pairs to span the gap.");
        return this.rollingWindow(2)
            .selectMany(function (window) {
            var pairs = window.toPairs();
            var pairA = pairs[0];
            var pairB = pairs[1];
            if (!comparer(pairA, pairB)) {
                return [pairA];
            }
            var generatedRows = generator(pairA, pairB);
            if (!utils_1.isArray(generatedRows))
                throw new Error("Expected return from 'generator' parameter to 'DataFrame.fillGaps' to be an array of pairs, instead got a " + typeof (generatedRows));
            return [pairA].concat(generatedRows);
        })
            .withIndex(function (pair) { return pair[0]; })
            .inflate(function (pair) { return pair[1]; })
            .concat(this.tail(1));
    };
    /**
     * Returns the specified default dataframe if the dataframe is empty.
     *
     * @param defaultDataFrame Default dataframe to return if the dataframe is empty.
     *
     * @return Returns 'defaultDataFrame' if the dataframe is empty.
     *
     * @example
     * <pre>
     *
     * const emptyDataFrame = new DataFrame();
     * const defaultDataFrame = new DataFrame([ { A: 1 }, { A: 2 }, { A: 3 } ]);
     * expect(emptyDataFrame.defaultIfEmpty(defaultDataFrame)).to.eql(defaultDataFrame);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const nonEmptyDataFrame = new DataFrame([ { A: 100 }]);
     * const defaultDataFrame = new DataFrame([ { A: 1 }, { A: 2 }, { A: 3 } ]);
     * expect(nonEmptyDataFrame.defaultIfEmpty(defaultDataFrame)).to.eql(nonEmptyDataFrame);
     * </pre>
     */
    DataFrame.prototype.defaultIfEmpty = function (defaultDataFrame) {
        if (this.none()) {
            if (defaultDataFrame instanceof DataFrame) {
                return defaultDataFrame;
            }
            else if (utils_1.isArray(defaultDataFrame)) {
                return new DataFrame(defaultDataFrame);
            }
            else {
                throw new Error("Expected 'defaultSequence' parameter to 'DataFrame.defaultIfEmpty' to be an array or a series.");
            }
        }
        else {
            return this;
        }
    };
    /**
     * Detect the the frequency of the types of the values in the dataframe.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a dataframe with rows that confirm to {@link ITypeFrequency} that describes the data types contained in the original dataframe.
     *
     * @example
     * <pre>
     *
     * const df = dataForge.readFileSync("./my-data.json").parseJSON();
     * const dataTypes = df.detectTypes();
     * console.log(dataTypes.toString());
     * </pre>
     */
    DataFrame.prototype.detectTypes = function () {
        var _this = this;
        return new DataFrame(function () {
            var typeFrequencies = _this.getColumns()
                .selectMany(function (column) {
                return column.series.detectTypes()
                    .select(function (typeFrequency) {
                    var output = Object.assign({}, typeFrequency);
                    output.Column = column.name;
                    return output;
                });
            });
            return {
                columnNames: ["Type", "Frequency", "Column"],
                values: typeFrequencies,
            };
        });
    };
    /**
     * Detect the frequency of the values in the dataframe.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a dataframe with rows that conform to {@link IValueFrequency} that describes the values contained in the dataframe.
     *
     * @example
     * <pre>
     *
     * const df = dataForge.readFileSync("./my-data.json").parseJSON();
     * const dataValues = df.detectedValues();
     * console.log(dataValues.toString());
     * </pre>
     */
    DataFrame.prototype.detectValues = function () {
        var _this = this;
        return new DataFrame(function () {
            var valueFrequencies = _this.getColumns()
                .selectMany(function (column) {
                return column.series.detectValues()
                    .select(function (valueFrequency) {
                    var output = Object.assign({}, valueFrequency);
                    output.Column = column.name;
                    return output;
                });
            });
            return {
                columnNames: ["Value", "Frequency", "Column"],
                values: valueFrequencies,
            };
        });
    };
    /**
     * Serialize the dataframe to the JSON data format.
     *
     * @return Returns a string in the JSON data format that represents the dataframe.
     *
     * @example
     * <pre>
     *
     * const jsonData = df.toJSON();
     * console.log(jsonData);
     * </pre>
     */
    DataFrame.prototype.toJSON = function () {
        return JSON.stringify(this.toArray(), null, 4);
    };
    /**
     * Serialize the dataframe to the CSV data format.
     *
     * @return Returns a string in the CSV data format that represents the dataframe.
     *
     * @example
     * <pre>
     *
     * const csvData = df.toCSV();
     * console.log(csvData);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const csvData = df.toCSV({ header: false });
     * console.log(csvData);
     * </pre>
     */
    DataFrame.prototype.toCSV = function (options) {
        var headerLine = options === undefined || options.header === undefined || options.header
            ? [this.getColumnNames()]
            : [];
        var rows = headerLine.concat(this.toRows());
        return papaparse_1.default.unparse(rows, options);
    };
    /**
     * Serialize the dataframe to HTML.
     *
     * @return Returns a string in HTML format that represents the dataframe.
     */
    DataFrame.prototype.toHTML = function () {
        var columNames = this.getColumnNames();
        var header = columNames.map(function (columnName) { return "            <th>" + columnName + "</th>"; }).join("\n");
        var pairs = this.toPairs();
        return '<table border="1" class="dataframe">\n' +
            '    <thead>\n' +
            '        <tr style="text-align: right;">\n' +
            '            <th></th>\n' +
            header +
            '\n' +
            '       </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            pairs.map(function (pair) {
                var index = pair[0];
                var value = pair[1];
                return '        <tr>\n' +
                    '            <th>' + index + '</th>\n' +
                    columNames.map(function (columName) {
                        return '            <td>' + value[columName] + '</td>';
                    })
                        .join('\n') +
                    '\n' +
                    '        </tr>';
            })
                .join('\n') +
            '\n' +
            '    </tbody>\n' +
            '</table>';
    };
    /**
     * Serialize the dataframe to an ordinary JavaScript data structure.
     * The resulting data structure is suitable for further serialization to JSON and can be used to
     * transmit a DataFrame and its internal structure over the wire.
     * Use the {@link deserialize} function to later reconstitute the serialized dataframe.
     *
     * @return Returns a JavaScript data structure conforming to {@link ISerializedDataFrame} that represents the dataframe and its internal structure.
     *
     * @example
     * <pre>
     *
     * const jsDataStructure = df.serialize();
     * const jsonData = JSON.stringify(jsDataStructure);
     * console.log(jsonData);
     * const deserializedJsDataStructure = JSON.parse(jsonData);
     * const deserializedDf = DataFrame.deserialize(deserializedJsDataStructure); // Reconsituted.
     * </pre>
     */
    DataFrame.prototype.serialize = function () {
        var rows = this.toArray(); // Bake the dataframe to an array.
        var index = this.getIndex(); // Extract the index.
        var indexValues = index.head(rows.length).toArray();
        var columns = this.getColumns();
        var serializedColumns = utils_1.toMap(columns, function (column) { return column.name; }, function (column) { return column.type; });
        var indexType = index.getType();
        if (indexType === "date") {
            indexValues = indexValues.map(function (index) { return dayjs_1.default(index).toISOString(); }); // Manually serialize date value, they aren't supported directly by JSON.
        }
        var cloned = false;
        try {
            // Serialize date values.
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var column = columns_1_1.value;
                if (column.type === "date") {
                    if (!cloned) {
                        rows = rows.map(function (row) { return Object.assign({}, row); }); // Clone so we don't modify any original data.
                        cloned = true;
                    }
                    try {
                        for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                            var row = rows_1_1.value;
                            row[column.name] = dayjs_1.default(row[column.name]).toISOString(); // Manually serialize date value.
                        }
                    }
                    catch (e_65_1) { e_65 = { error: e_65_1 }; }
                    finally {
                        try {
                            if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
                        }
                        finally { if (e_65) throw e_65.error; }
                    }
                }
            }
        }
        catch (e_66_1) { e_66 = { error: e_66_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_b = columns_1.return)) _b.call(columns_1);
            }
            finally { if (e_66) throw e_66.error; }
        }
        return {
            columnOrder: this.getColumnNames(),
            columns: serializedColumns,
            index: {
                type: indexType,
                values: indexValues,
            },
            values: rows,
        };
        var e_66, _b, e_65, _a;
    };
    /**
     * Deserialize the dataframe from an ordinary JavaScript data structure.
     * Can reconstitute a dataframe that previously serialized with the {@link serialize} function.
     * This can rebuilds the dataframe with the exact same internal structure after it has been transmitted over the wire.
     *
     * @param input The serialize JavaScript data structure for the dataframe.
     *
     * @return Returns the deserialized/reconstituted dataframe.
     *
     * @example
     * <pre>
     *
     * const jsDataStructure = df.serialize();
     * const jsonData = JSON.stringify(jsDataStructure);
     * console.log(jsonData);
     * const deserializedJsDataStructure = JSON.parse(jsonData);
     * const deserializedDf = DataFrame.deserialize(deserializedJsDataStructure); // Reconsituted.
     * </pre>
     */
    DataFrame.deserialize = function (input) {
        var indexValues = input.index && input.index.values || [];
        var rows = input.values && input.values || [];
        var cloned = false;
        // Deserialize dates.
        if (input.columns) {
            try {
                for (var _a = __values(Object.keys(input.columns)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    if (input.columns[columnName] !== "date") {
                        continue; // No need to process other types, they are natively supported by JSON.
                    }
                    if (!cloned) {
                        rows = rows.map(function (row) { return Object.assign({}, row); }); // Clone so we don't modify any original data.
                        cloned = true;
                    }
                    try {
                        for (var rows_2 = __values(rows), rows_2_1 = rows_2.next(); !rows_2_1.done; rows_2_1 = rows_2.next()) {
                            var row = rows_2_1.value;
                            row[columnName] = dayjs_1.default(row[columnName]).toDate(); // Manually deserialize data value.
                        }
                    }
                    catch (e_67_1) { e_67 = { error: e_67_1 }; }
                    finally {
                        try {
                            if (rows_2_1 && !rows_2_1.done && (_c = rows_2.return)) _c.call(rows_2);
                        }
                        finally { if (e_67) throw e_67.error; }
                    }
                }
            }
            catch (e_68_1) { e_68 = { error: e_68_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_68) throw e_68.error; }
            }
        }
        if (input.index && input.index.type === "date") {
            indexValues = indexValues.map(function (value) { return dayjs_1.default(value).toDate(); }); // Manually deserialize data value.
        }
        return new DataFrame({
            columnNames: input.columnOrder || [],
            index: indexValues,
            values: rows,
        });
        var e_68, _d, e_67, _c;
    };
    /***
     * Allows the dataframe to be queried to confirm that it is actually a dataframe.
     * Used from JavaScript to tell the difference between a Series and a DataFrame.
     *
     * @return Returns the string "dataframe".
     */
    DataFrame.prototype.getTypeCode = function () {
        return "dataframe";
    };
    DataFrame.defaultCountIterable = new count_iterable_1.CountIterable();
    DataFrame.defaultEmptyIterable = new empty_iterable_1.EmptyIterable();
    return DataFrame;
}());
exports.DataFrame = DataFrame;
/**
 * @hidden
 * Represents a dataframe that has been sorted.
 */
var OrderedDataFrame = /** @class */ (function (_super) {
    __extends(OrderedDataFrame, _super);
    function OrderedDataFrame(config) {
        var _this = this;
        var valueSortSpecs = [];
        var pairSortSpecs = [];
        var sortLevel = 0;
        var parent = config.parent;
        var parents = [];
        while (parent !== null) {
            parents.push(parent);
            parent = parent.config.parent;
        }
        parents.reverse();
        try {
            for (var parents_1 = __values(parents), parents_1_1 = parents_1.next(); !parents_1_1.done; parents_1_1 = parents_1.next()) {
                var parent_1 = parents_1_1.value;
                var parentConfig = parent_1.config;
                valueSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, parentConfig.selector, parentConfig.direction));
                pairSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, OrderedDataFrame.makePairsSelector(parentConfig.selector), parentConfig.direction));
                ++sortLevel;
            }
        }
        catch (e_69_1) { e_69 = { error: e_69_1 }; }
        finally {
            try {
                if (parents_1_1 && !parents_1_1.done && (_a = parents_1.return)) _a.call(parents_1);
            }
            finally { if (e_69) throw e_69.error; }
        }
        valueSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, config.selector, config.direction));
        pairSortSpecs.push(OrderedDataFrame.makeSortSpec(sortLevel, OrderedDataFrame.makePairsSelector(config.selector), config.direction));
        _this = _super.call(this, {
            columnNames: config.columnNames,
            values: new ordered_iterable_1.OrderedIterable(config.values, valueSortSpecs),
            pairs: new ordered_iterable_1.OrderedIterable(config.pairs, pairSortSpecs)
        }) || this;
        _this.config = config;
        return _this;
        var e_69, _a;
    }
    //
    // Helper function to create a sort spec.
    //
    OrderedDataFrame.makeSortSpec = function (sortLevel, selector, direction) {
        return { sortLevel: sortLevel, selector: selector, direction: direction };
    };
    //
    // Helper function to make a sort selector for pairs, this captures the parent correct when generating the closure.
    //
    OrderedDataFrame.makePairsSelector = function (selector) {
        return function (pair, index) { return selector(pair[1], index); };
    };
    /**
     * Applys additional sorting (ascending) to an already sorted dataframe.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new dataframe has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from least to most).
     * const orderedDf = salesDf.orderBy(sale => sale.SalesPerson).thenBy(sale => sale.Amount);
     * </pre>
     */
    OrderedDataFrame.prototype.thenBy = function (selector) {
        return new OrderedDataFrame({
            columnNames: this.config.columnNames,
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Ascending,
            parent: this,
        });
    };
    /**
     * Applys additional sorting (descending) to an already sorted dataframe.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new dataframe has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from most to least).
     * const orderedDf = salesDf.orderBy(sale => sale.SalesPerson).thenByDescending(sale => sale.Amount);
     * </pre>
     */
    OrderedDataFrame.prototype.thenByDescending = function (selector) {
        return new OrderedDataFrame({
            columnNames: this.config.columnNames,
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Descending,
            parent: this,
        });
    };
    return OrderedDataFrame;
}(DataFrame));

},{"./index":5,"./iterables/column-names-iterable":6,"./iterables/concat-iterable":7,"./iterables/count-iterable":8,"./iterables/csv-rows-iterable":9,"./iterables/dataframe-rolling-window-iterable":10,"./iterables/dataframe-variable-window-iterable":11,"./iterables/dataframe-window-iterable":12,"./iterables/distinct-iterable":13,"./iterables/empty-iterable":14,"./iterables/extract-element-iterable":15,"./iterables/multi-iterable":16,"./iterables/ordered-iterable":17,"./iterables/reverse-iterable":18,"./iterables/select-iterable":19,"./iterables/select-many-iterable":20,"./iterables/skip-iterable":24,"./iterables/skip-while-iterable":25,"./iterables/take-iterable":26,"./iterables/take-while-iterable":27,"./iterables/where-iterable":28,"./iterables/zip-iterable":29,"./series":53,"./utils":54,"dayjs":56,"easy-table":59,"papaparse":55}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = require("./series");
// @ts-ignore
var dayjs_1 = __importDefault(require("dayjs"));
var utils_1 = require("./utils");
/**
 * Class that represents an index for a Series.
 */
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index(config) {
        return _super.call(this, config) || this;
    }
    /**
     * Get the type of the index.
     *
     * @returns Returns a string that specifies the type of the index.
     */
    Index.prototype.getType = function () {
        if (!this._type) {
            //
            // Detect the type.
            //
            if (this.any()) {
                this._type = utils_1.determineType(this.first());
            }
            else {
                this._type = 'empty';
            }
        }
        return this._type;
    };
    ;
    /**
     * Get the less than operation for the index.
     *
     * @returns Returns a function that can be used to compare a value against an index value.
     */
    Index.prototype.getLessThan = function () {
        switch (this.getType()) {
            case "date":
                return function (d1, d2) { return dayjs_1.default(d1).isBefore(d2); };
            case "string":
            case "number":
                return function (v1, v2) { return v1 < v2; };
            case "empty":
                return function () { return true; }; // Series is empty, so this makes no difference.
            default:
                throw new Error("No less than operation available for type: " + this.getType());
        }
    };
    ;
    /**
     * Get the less than or equal to operation for the index.
     *
     * @returns Returns a function that can be used to compare a value against an index value.
     */
    Index.prototype.getLessThanOrEqualTo = function () {
        var _this = this;
        return function (v1, v2) { return !_this.getGreaterThan()(v1, v2); }; //TODO: Should expand  this out.
    };
    /**
     * Get the greater than operation for the index.
     *
     * @returns Returns a function that can be used to compare a value against an index value.
     */
    Index.prototype.getGreaterThan = function () {
        switch (this.getType()) {
            case "date":
                return function (d1, d2) { return dayjs_1.default(d1).isAfter(d2); };
            case "string":
            case "number":
                return function (v1, v2) { return v1 > v2; };
            case "empty":
                return function () { return true; }; // Series is empty, so this makes no difference.
            default:
                throw new Error("No greater than operation available for type: " + this.getType());
        }
    };
    ;
    return Index;
}(series_1.Series));
exports.Index = Index;

},{"./series":53,"./utils":54,"dayjs":56}],6:[function(require,module,exports){
"use strict";
//
// An iterable that iterates the column names of lazy dataframe.
//
Object.defineProperty(exports, "__esModule", { value: true });
var column_names_iterator_1 = require("../iterators/column-names-iterator");
var ColumnNamesIterable = /** @class */ (function () {
    function ColumnNamesIterable(values, considerAllRows) {
        this.values = values;
        this.considerAllRows = considerAllRows;
    }
    ColumnNamesIterable.prototype[Symbol.iterator] = function () {
        return new column_names_iterator_1.ColumnNamesIterator(this.values, this.considerAllRows);
    };
    return ColumnNamesIterable;
}());
exports.ColumnNamesIterable = ColumnNamesIterable;

},{"../iterators/column-names-iterator":31}],7:[function(require,module,exports){
"use strict";
//
// An iterable that concatenates multiple iterables.
//
Object.defineProperty(exports, "__esModule", { value: true });
var concat_iterator_1 = require("../iterators/concat-iterator");
var ConcatIterable = /** @class */ (function () {
    function ConcatIterable(iterables) {
        this.iterables = iterables;
    }
    ConcatIterable.prototype[Symbol.iterator] = function () {
        return new concat_iterator_1.ConcatIterator(this.iterables);
    };
    return ConcatIterable;
}());
exports.ConcatIterable = ConcatIterable;

},{"../iterators/concat-iterator":32}],8:[function(require,module,exports){
"use strict";
//
// An iterable that simply counts up from zero.
// This creates the default index in Data-Forge.
//
Object.defineProperty(exports, "__esModule", { value: true });
var count_iterator_1 = require("../iterators/count-iterator");
var CountIterable = /** @class */ (function () {
    function CountIterable() {
    }
    CountIterable.prototype[Symbol.iterator] = function () {
        return new count_iterator_1.CountIterator();
    };
    return CountIterable;
}());
exports.CountIterable = CountIterable;

},{"../iterators/count-iterator":33}],9:[function(require,module,exports){
"use strict";
//
// An iterable that iterates the rows of a CSV file.
//
Object.defineProperty(exports, "__esModule", { value: true });
var csv_rows_iterator_1 = require("../iterators/csv-rows-iterator");
var CsvRowsIterable = /** @class */ (function () {
    function CsvRowsIterable(columnNames, rows) {
        this.columnNames = columnNames;
        this.rows = rows;
    }
    CsvRowsIterable.prototype[Symbol.iterator] = function () {
        return new csv_rows_iterator_1.CsvRowsIterator(this.columnNames, this.rows);
    };
    return CsvRowsIterable;
}());
exports.CsvRowsIterable = CsvRowsIterable;

},{"../iterators/csv-rows-iterator":34}],10:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var dataframe_rolling_window_iterator_1 = require("../iterators/dataframe-rolling-window-iterator");
var DataFrameRollingWindowIterable = /** @class */ (function () {
    function DataFrameRollingWindowIterable(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameRollingWindowIterable.prototype[Symbol.iterator] = function () {
        return new dataframe_rolling_window_iterator_1.DataFrameRollingWindowIterator(this.columnNames, this.iterable, this.period);
    };
    return DataFrameRollingWindowIterable;
}());
exports.DataFrameRollingWindowIterable = DataFrameRollingWindowIterable;

},{"../iterators/dataframe-rolling-window-iterator":35}],11:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var dataframe_variable_window_iterator_1 = require("../iterators/dataframe-variable-window-iterator");
var DataFrameVariableWindowIterable = /** @class */ (function () {
    function DataFrameVariableWindowIterable(columnNames, iterable, comparer) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.comparer = comparer;
    }
    DataFrameVariableWindowIterable.prototype[Symbol.iterator] = function () {
        return new dataframe_variable_window_iterator_1.DataFrameVariableWindowIterator(this.columnNames, this.iterable, this.comparer);
    };
    return DataFrameVariableWindowIterable;
}());
exports.DataFrameVariableWindowIterable = DataFrameVariableWindowIterable;

},{"../iterators/dataframe-variable-window-iterator":36}],12:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var dataframe_window_iterator_1 = require("../iterators/dataframe-window-iterator");
var DataFrameWindowIterable = /** @class */ (function () {
    function DataFrameWindowIterable(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameWindowIterable.prototype[Symbol.iterator] = function () {
        return new dataframe_window_iterator_1.DataFrameWindowIterator(this.columnNames, this.iterable, this.period);
    };
    return DataFrameWindowIterable;
}());
exports.DataFrameWindowIterable = DataFrameWindowIterable;

},{"../iterators/dataframe-window-iterator":37}],13:[function(require,module,exports){
"use strict";
//
// An iterable that iterates the only distinct elements of another iterable.
//
Object.defineProperty(exports, "__esModule", { value: true });
var distinct_iterator_1 = require("../iterators/distinct-iterator");
var DistinctIterable = /** @class */ (function () {
    function DistinctIterable(iterable, selector) {
        this.iterable = iterable;
        this.selector = selector;
    }
    DistinctIterable.prototype[Symbol.iterator] = function () {
        return new distinct_iterator_1.DistinctIterator(this.iterable, this.selector);
    };
    return DistinctIterable;
}());
exports.DistinctIterable = DistinctIterable;

},{"../iterators/distinct-iterator":38}],14:[function(require,module,exports){
"use strict";
//
// An iterable that returns no values.
//
Object.defineProperty(exports, "__esModule", { value: true });
var empty_iterator_1 = require("../iterators/empty-iterator");
var EmptyIterable = /** @class */ (function () {
    function EmptyIterable() {
    }
    EmptyIterable.prototype[Symbol.iterator] = function () {
        return new empty_iterator_1.EmptyIterator();
    };
    return EmptyIterable;
}());
exports.EmptyIterable = EmptyIterable;

},{"../iterators/empty-iterator":39}],15:[function(require,module,exports){
"use strict";
//
// An iterable to extact an element from an array.
//
Object.defineProperty(exports, "__esModule", { value: true });
var extract_element_iterator_1 = require("../iterators/extract-element-iterator");
var ExtractElementIterable = /** @class */ (function () {
    function ExtractElementIterable(arrayIterable, extractIndex) {
        this.arrayIterable = arrayIterable;
        this.extractIndex = extractIndex;
    }
    ExtractElementIterable.prototype[Symbol.iterator] = function () {
        var arrayIterator = this.arrayIterable[Symbol.iterator]();
        return new extract_element_iterator_1.ExtractElementIterator(arrayIterator, this.extractIndex);
    };
    return ExtractElementIterable;
}());
exports.ExtractElementIterable = ExtractElementIterable;

},{"../iterators/extract-element-iterator":40}],16:[function(require,module,exports){
"use strict";
//
// An iterable that allows multiple other iterables to be iterated at once.
// This allows iterables to be composed.
// This is used in Data-Forge to combine iterables for index and values.
//
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multi_iterator_1 = require("../iterators/multi-iterator");
var MultiIterable = /** @class */ (function () {
    function MultiIterable(iterables) {
        this.iterables = iterables;
    }
    MultiIterable.prototype[Symbol.iterator] = function () {
        var iterators = [];
        try {
            for (var _a = __values(this.iterables), _b = _a.next(); !_b.done; _b = _a.next()) {
                var iterable = _b.value;
                iterators.push(iterable[Symbol.iterator]());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new multi_iterator_1.MultiIterator(iterators);
        var e_1, _c;
    };
    return MultiIterable;
}());
exports.MultiIterable = MultiIterable;

},{"../iterators/multi-iterator":41}],17:[function(require,module,exports){
"use strict";
//
// An iterable that sorts it's input before iterating it.
//
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var array_iterator_1 = require("../iterators/array-iterator");
var Direction;
(function (Direction) {
    Direction[Direction["Ascending"] = 0] = "Ascending";
    Direction[Direction["Descending"] = 1] = "Descending";
})(Direction = exports.Direction || (exports.Direction = {}));
var SortOperation = /** @class */ (function () {
    function SortOperation(values, sortSpec) {
        this.values = values;
        this.sortSpec = sortSpec;
        this.keys = [];
    }
    SortOperation.prototype.genKeys = function () {
        if (this.keys.length > 0) {
            // Already cached.
            return;
        }
        var index = 0;
        try {
            for (var _a = __values(this.values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                this.keys.push(this.sortSpec.selector(value, index));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SortOperation.prototype.compare = function (indexA, indexB) {
        this.genKeys();
        var keyA = this.keys[indexA];
        var keyB = this.keys[indexB];
        var comparison = -1;
        if (keyA === keyB) {
            comparison = 0;
        }
        else if (keyA > keyB) {
            comparison = 1;
        }
        return (this.sortSpec.direction === Direction.Descending) ? -comparison : comparison;
    };
    return SortOperation;
}());
;
var OrderedIterable = /** @class */ (function () {
    function OrderedIterable(iterable, sortSpec) {
        this.iterable = iterable;
        this.sortSpec = sortSpec;
    }
    OrderedIterable.prototype[Symbol.iterator] = function () {
        var indexes = [];
        var values = [];
        var index = 0;
        try {
            for (var _a = __values(this.iterable), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                indexes.push(index);
                values.push(value);
                ++index;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var sortOperations = [];
        try {
            for (var _d = __values(this.sortSpec), _e = _d.next(); !_e.done; _e = _d.next()) {
                var sortSpec = _e.value;
                sortOperations.push(new SortOperation(values, sortSpec));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_3) throw e_3.error; }
        }
        sortOperations[0].genKeys();
        indexes.sort(function (indexA, indexB) {
            try {
                for (var sortOperations_1 = __values(sortOperations), sortOperations_1_1 = sortOperations_1.next(); !sortOperations_1_1.done; sortOperations_1_1 = sortOperations_1.next()) {
                    var sortOperation = sortOperations_1_1.value;
                    var comparison = sortOperation.compare(indexA, indexB);
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (sortOperations_1_1 && !sortOperations_1_1.done && (_a = sortOperations_1.return)) _a.call(sortOperations_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return 0;
            var e_4, _a;
        });
        var sortedValues = [];
        try {
            for (var indexes_1 = __values(indexes), indexes_1_1 = indexes_1.next(); !indexes_1_1.done; indexes_1_1 = indexes_1.next()) {
                var index_1 = indexes_1_1.value;
                sortedValues.push(values[index_1]);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (indexes_1_1 && !indexes_1_1.done && (_g = indexes_1.return)) _g.call(indexes_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return new array_iterator_1.ArrayIterator(sortedValues);
        var e_2, _c, e_3, _f, e_5, _g;
    };
    return OrderedIterable;
}());
exports.OrderedIterable = OrderedIterable;

},{"../iterators/array-iterator":30}],18:[function(require,module,exports){
"use strict";
//
// An iterable that iterates the elements in reverse.
//
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var array_iterator_1 = require("../iterators/array-iterator");
var ReverseIterable = /** @class */ (function () {
    function ReverseIterable(iterable) {
        this.iterable = iterable;
    }
    ReverseIterable.prototype[Symbol.iterator] = function () {
        var working = [];
        try {
            for (var _a = __values(this.iterable), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                working.push(value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        working.reverse();
        return new array_iterator_1.ArrayIterator(working);
        var e_1, _c;
    };
    return ReverseIterable;
}());
exports.ReverseIterable = ReverseIterable;

},{"../iterators/array-iterator":30}],19:[function(require,module,exports){
"use strict";
//
// An iterable that applies a selector function to each item.
//
Object.defineProperty(exports, "__esModule", { value: true });
var select_iterator_1 = require("../iterators/select-iterator");
var SelectIterable = /** @class */ (function () {
    function SelectIterable(iterable, selector) {
        this.iterable = iterable;
        this.selector = selector;
    }
    SelectIterable.prototype[Symbol.iterator] = function () {
        var iterator = this.iterable[Symbol.iterator]();
        return new select_iterator_1.SelectIterator(iterator, this.selector);
    };
    return SelectIterable;
}());
exports.SelectIterable = SelectIterable;

},{"../iterators/select-iterator":42}],20:[function(require,module,exports){
"use strict";
//
// An iterable that applies a selector function to each item.
//
Object.defineProperty(exports, "__esModule", { value: true });
var select_many_iterator_1 = require("../iterators/select-many-iterator");
var SelectManyIterable = /** @class */ (function () {
    function SelectManyIterable(iterable, selector) {
        this.iterable = iterable;
        this.selector = selector;
    }
    SelectManyIterable.prototype[Symbol.iterator] = function () {
        var iterator = this.iterable[Symbol.iterator]();
        return new select_many_iterator_1.SelectManyIterator(iterator, this.selector);
    };
    return SelectManyIterable;
}());
exports.SelectManyIterable = SelectManyIterable;

},{"../iterators/select-many-iterator":43}],21:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var series_rolling_window_iterator_1 = require("../iterators/series-rolling-window-iterator");
var SeriesRollingWindowIterable = /** @class */ (function () {
    function SeriesRollingWindowIterable(iterable, period) {
        this.iterable = iterable;
        this.period = period;
    }
    SeriesRollingWindowIterable.prototype[Symbol.iterator] = function () {
        return new series_rolling_window_iterator_1.SeriesRollingWindowIterator(this.iterable, this.period);
    };
    return SeriesRollingWindowIterable;
}());
exports.SeriesRollingWindowIterable = SeriesRollingWindowIterable;

},{"../iterators/series-rolling-window-iterator":44}],22:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var series_variable_window_iterator_1 = require("../iterators/series-variable-window-iterator");
var SeriesVariableWindowIterable = /** @class */ (function () {
    function SeriesVariableWindowIterable(iterable, comparer) {
        this.iterable = iterable;
        this.comparer = comparer;
    }
    SeriesVariableWindowIterable.prototype[Symbol.iterator] = function () {
        return new series_variable_window_iterator_1.SeriesVariableWindowIterator(this.iterable, this.comparer);
    };
    return SeriesVariableWindowIterable;
}());
exports.SeriesVariableWindowIterable = SeriesVariableWindowIterable;

},{"../iterators/series-variable-window-iterator":45}],23:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var series_window_iterator_1 = require("../iterators/series-window-iterator");
var SeriesWindowIterable = /** @class */ (function () {
    function SeriesWindowIterable(iterable, period) {
        this.iterable = iterable;
        this.period = period;
    }
    SeriesWindowIterable.prototype[Symbol.iterator] = function () {
        return new series_window_iterator_1.SeriesWindowIterator(this.iterable, this.period);
    };
    return SeriesWindowIterable;
}());
exports.SeriesWindowIterable = SeriesWindowIterable;

},{"../iterators/series-window-iterator":46}],24:[function(require,module,exports){
"use strict";
//
// An iterable that skips a number of values.
//
Object.defineProperty(exports, "__esModule", { value: true });
var skip_iterator_1 = require("../iterators/skip-iterator");
var SkipIterable = /** @class */ (function () {
    function SkipIterable(iterable, numValues) {
        this.iterable = iterable;
        this.numValues = numValues;
    }
    SkipIterable.prototype[Symbol.iterator] = function () {
        var iterator = this.iterable[Symbol.iterator]();
        return new skip_iterator_1.SkipIterator(iterator, this.numValues);
    };
    return SkipIterable;
}());
exports.SkipIterable = SkipIterable;

},{"../iterators/skip-iterator":47}],25:[function(require,module,exports){
"use strict";
//
// An iterable that skips a sequence of elements while a predicate function returns true.
//
Object.defineProperty(exports, "__esModule", { value: true });
var skip_while_iterator_1 = require("../iterators/skip-while-iterator");
var SkipWhileIterable = /** @class */ (function () {
    function SkipWhileIterable(childIterable, predicate) {
        this.childIterable = childIterable;
        this.predicate = predicate;
    }
    SkipWhileIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new skip_while_iterator_1.SkipWhileIterator(childIterator, this.predicate);
    };
    return SkipWhileIterable;
}());
exports.SkipWhileIterable = SkipWhileIterable;

},{"../iterators/skip-while-iterator":48}],26:[function(require,module,exports){
"use strict";
//
// An iterable that takes a certain number of elements from a child iterable.
//
Object.defineProperty(exports, "__esModule", { value: true });
var take_iterator_1 = require("../iterators/take-iterator");
var TakeIterable = /** @class */ (function () {
    function TakeIterable(childIterable, numElements) {
        this.childIterable = childIterable;
        this.numElements = numElements;
    }
    TakeIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new take_iterator_1.TakeIterator(childIterator, this.numElements);
    };
    return TakeIterable;
}());
exports.TakeIterable = TakeIterable;

},{"../iterators/take-iterator":49}],27:[function(require,module,exports){
"use strict";
//
// An iterable that takes a sequence of elements while a predicate function returns true.
//
Object.defineProperty(exports, "__esModule", { value: true });
var take_while_iterator_1 = require("../iterators/take-while-iterator");
var TakeWhileIterable = /** @class */ (function () {
    function TakeWhileIterable(childIterable, predicate) {
        this.childIterable = childIterable;
        this.predicate = predicate;
    }
    TakeWhileIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new take_while_iterator_1.TakeWhileIterator(childIterator, this.predicate);
    };
    return TakeWhileIterable;
}());
exports.TakeWhileIterable = TakeWhileIterable;

},{"../iterators/take-while-iterator":50}],28:[function(require,module,exports){
"use strict";
//
// An iterable that takes elements from a child iterable based on a predicate function.
//
Object.defineProperty(exports, "__esModule", { value: true });
var where_iterator_1 = require("../iterators/where-iterator");
var WhereIterable = /** @class */ (function () {
    function WhereIterable(childIterable, predicate) {
        this.childIterable = childIterable;
        this.predicate = predicate;
    }
    WhereIterable.prototype[Symbol.iterator] = function () {
        var childIterator = this.childIterable[Symbol.iterator]();
        return new where_iterator_1.WhereIterator(childIterator, this.predicate);
    };
    return WhereIterable;
}());
exports.WhereIterable = WhereIterable;

},{"../iterators/where-iterator":51}],29:[function(require,module,exports){
"use strict";
//
// An iterable that zips together each set of elements in child iterables.
//
Object.defineProperty(exports, "__esModule", { value: true });
var zip_iterator_1 = require("../iterators/zip-iterator");
var ZipIterable = /** @class */ (function () {
    function ZipIterable(iterables, zipper) {
        this.iterables = iterables;
        this.zipper = zipper;
    }
    ZipIterable.prototype[Symbol.iterator] = function () {
        return new zip_iterator_1.ZipIterator(this.iterables, this.zipper);
    };
    return ZipIterable;
}());
exports.ZipIterable = ZipIterable;

},{"../iterators/zip-iterator":52}],30:[function(require,module,exports){
"use strict";
//
// An iterator that iterates the elements of an array.
//
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(arr) {
        this.index = 0;
        this.arr = arr;
    }
    ArrayIterator.prototype.next = function () {
        if (this.index < this.arr.length) {
            return {
                done: false,
                value: this.arr[this.index++],
            };
        }
        else {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
    };
    return ArrayIterator;
}());
exports.ArrayIterator = ArrayIterator;

},{}],31:[function(require,module,exports){
"use strict";
//
// An iterator for the column names of lazy dataframe.
//
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var array_iterator_1 = require("./array-iterator");
var ColumnNamesIterator = /** @class */ (function () {
    function ColumnNamesIterator(values, considerAllRows) {
        this.columnNamesIterator = null;
        this.values = values;
        this.considerAllRows = considerAllRows;
    }
    ColumnNamesIterator.prototype.next = function () {
        if (this.columnNamesIterator === null) {
            if (this.considerAllRows) {
                var combinedFields = {};
                try {
                    // Check all items.
                    for (var _a = __values(this.values), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var value = _b.value;
                        try {
                            for (var _c = __values(Object.keys(value)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var fieldName = _d.value;
                                combinedFields[fieldName] = true;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                this.columnNamesIterator = new array_iterator_1.ArrayIterator(Object.keys(combinedFields));
            }
            else {
                // Just check the first item.
                var valuesIterator = this.values[Symbol.iterator]();
                var firstResult = valuesIterator.next();
                if (firstResult.done) {
                    return {
                        done: true,
                        value: "",
                    };
                }
                this.columnNamesIterator = new array_iterator_1.ArrayIterator(Object.keys(firstResult.value));
            }
        }
        return this.columnNamesIterator.next();
        var e_2, _f, e_1, _e;
    };
    return ColumnNamesIterator;
}());
exports.ColumnNamesIterator = ColumnNamesIterator;

},{"./array-iterator":30}],32:[function(require,module,exports){
"use strict";
//
// An iterator that concatenates multiple iterables.
//
Object.defineProperty(exports, "__esModule", { value: true });
var ConcatIterator = /** @class */ (function () {
    function ConcatIterator(iterables) {
        this.curIterator = null;
        this.iterables = iterables;
        this.iterator = iterables[Symbol.iterator]();
        this.moveToNextIterable();
    }
    //
    // Move onto the next iterable.
    //
    ConcatIterator.prototype.moveToNextIterable = function () {
        var nextIterable = this.iterator.next();
        if (nextIterable.done) {
            this.curIterator = null;
        }
        else {
            this.curIterator = nextIterable.value[Symbol.iterator]();
        }
    };
    ConcatIterator.prototype.next = function () {
        while (true) {
            if (this.curIterator == null) {
                // Finished iterating all sub-iterators.
                // https://github.com/Microsoft/TypeScript/issues/8938
                return { done: true }; // <= explicit cast here!;
            }
            var result = this.curIterator.next();
            if (!result.done) {
                return result; // Found a valid result from the current iterable.    
            }
            // Find the next non empty iterable.
            this.moveToNextIterable();
        }
    };
    return ConcatIterator;
}());
exports.ConcatIterator = ConcatIterator;

},{}],33:[function(require,module,exports){
"use strict";
//
// An iterator that simply counts up from zero.
// This creates the default index in Data-Forge.
//
Object.defineProperty(exports, "__esModule", { value: true });
var CountIterator = /** @class */ (function () {
    function CountIterator() {
        this.index = 0;
    }
    CountIterator.prototype.next = function () {
        return {
            done: false,
            value: this.index++
        };
    };
    return CountIterator;
}());
exports.CountIterator = CountIterator;

},{}],34:[function(require,module,exports){
"use strict";
//
// An iterator that iterates the rows of a CSV file.
//
Object.defineProperty(exports, "__esModule", { value: true });
var CsvRowsIterator = /** @class */ (function () {
    function CsvRowsIterator(columnNames, rowsIterable) {
        this.index = 0;
        this.columnNames = Array.from(columnNames);
        this.rowsIterator = rowsIterable[Symbol.iterator]();
    }
    CsvRowsIterator.prototype.next = function () {
        var result = this.rowsIterator.next();
        if (result.done) {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        var row = result.value;
        var value = {};
        for (var cellIndex = 0; cellIndex < this.columnNames.length; ++cellIndex) {
            var columnName = this.columnNames[cellIndex];
            value[columnName] = row[cellIndex];
        }
        return {
            done: false,
            value: value,
        };
    };
    return CsvRowsIterator;
}());
exports.CsvRowsIterator = CsvRowsIterator;

},{}],35:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var dataframe_1 = require("../dataframe");
var DataFrameRollingWindowIterator = /** @class */ (function () {
    function DataFrameRollingWindowIterator(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameRollingWindowIterator.prototype.next = function () {
        if (!this.curWindow) {
            this.curWindow = [];
            this.iterator = this.iterable[Symbol.iterator]();
            for (var i = 0; i < this.period; ++i) {
                var curPos = this.iterator.next();
                if (curPos.done) {
                    // Underlying iterator doesn't have required number of elements.
                    return { done: true };
                }
                this.curWindow.push(curPos.value);
            }
        }
        else {
            this.curWindow.shift(); // Remove first item from window.
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator doesn't have enough elements left.
                return { done: true };
            }
            this.curWindow.push(curPos.value); // Add next item to window.
        }
        var window = new dataframe_1.DataFrame({
            columnNames: this.columnNames,
            pairs: this.curWindow
        });
        return {
            value: window,
            done: false,
        };
    };
    return DataFrameRollingWindowIterator;
}());
exports.DataFrameRollingWindowIterator = DataFrameRollingWindowIterator;

},{"../dataframe":4}],36:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var dataframe_1 = require("../dataframe");
var DataFrameVariableWindowIterator = /** @class */ (function () {
    function DataFrameVariableWindowIterator(columnNames, iterable, comparer) {
        this.columnNames = columnNames;
        this.iterator = iterable[Symbol.iterator]();
        this.nextValue = this.iterator.next();
        this.comparer = comparer;
    }
    DataFrameVariableWindowIterator.prototype.next = function () {
        if (this.nextValue.done) {
            // Nothing more to read.
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        var pairs = [
            this.nextValue.value,
        ];
        var prevValue = this.nextValue.value;
        // Pull values until there is one that doesn't compare.
        while (true) {
            this.nextValue = this.iterator.next();
            if (this.nextValue.done) {
                break; // No more values.
            }
            if (!this.comparer(prevValue[1], this.nextValue.value[1])) {
                prevValue = this.nextValue.value;
                break; // Doesn't compare. Start a new window.
            }
            pairs.push(this.nextValue.value);
            prevValue = this.nextValue.value;
        }
        var window = new dataframe_1.DataFrame({
            columnNames: this.columnNames,
            pairs: pairs,
        });
        return {
            value: window,
            done: false,
        };
    };
    return DataFrameVariableWindowIterator;
}());
exports.DataFrameVariableWindowIterator = DataFrameVariableWindowIterator;

},{"../dataframe":4}],37:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var dataframe_1 = require("../dataframe");
var DataFrameWindowIterator = /** @class */ (function () {
    function DataFrameWindowIterator(columnNames, iterable, period) {
        this.columnNames = columnNames;
        this.iterable = iterable;
        this.period = period;
    }
    DataFrameWindowIterator.prototype.next = function () {
        if (!this.iterator) {
            this.iterator = this.iterable[Symbol.iterator]();
        }
        var curWindow = [];
        for (var i = 0; i < this.period; ++i) {
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator is finished.
                break;
            }
            curWindow.push(curPos.value);
        }
        if (curWindow.length === 0) {
            // Underlying iterator doesn't have required number of elements.
            return { done: true };
        }
        var window = new dataframe_1.DataFrame({
            columnNames: this.columnNames,
            pairs: curWindow
        });
        return {
            value: window,
            done: false,
        };
    };
    return DataFrameWindowIterator;
}());
exports.DataFrameWindowIterator = DataFrameWindowIterator;

},{"../dataframe":4}],38:[function(require,module,exports){
"use strict";
//
// An iterator that iterates the only distinct elements of another iterable.
//
Object.defineProperty(exports, "__esModule", { value: true });
var DistinctIterator = /** @class */ (function () {
    function DistinctIterator(iterable, selector) {
        this.valuesAlreadySeen = new Set();
        this.iterator = iterable[Symbol.iterator]();
        this.selector = selector;
    }
    DistinctIterator.prototype.next = function () {
        while (true) {
            var result = this.iterator.next();
            if (result.done) {
                return { done: true };
            }
            var potentialOutput = void 0;
            if (this.selector) {
                potentialOutput = this.selector(result.value);
            }
            else {
                potentialOutput = result.value;
            }
            if (this.valuesAlreadySeen.has(potentialOutput)) {
                // Already seen this value.
                // Skip it and continue to next item.
                continue;
            }
            this.valuesAlreadySeen.add(potentialOutput);
            return {
                done: false,
                value: result.value,
            };
        }
    };
    return DistinctIterator;
}());
exports.DistinctIterator = DistinctIterator;

},{}],39:[function(require,module,exports){
"use strict";
//
// An iterator that returns no values.
//
Object.defineProperty(exports, "__esModule", { value: true });
var EmptyIterator = /** @class */ (function () {
    function EmptyIterator() {
    }
    EmptyIterator.prototype.next = function () {
        return {
            done: true,
            value: null
        };
    };
    return EmptyIterator;
}());
exports.EmptyIterator = EmptyIterator;

},{}],40:[function(require,module,exports){
"use strict";
//
// An iterator to extact an element from an array.
//
Object.defineProperty(exports, "__esModule", { value: true });
var ExtractElementIterator = /** @class */ (function () {
    function ExtractElementIterator(iterator, extractIndex) {
        this.iterator = iterator;
        this.extractIndex = extractIndex;
    }
    ExtractElementIterator.prototype.next = function () {
        var result = this.iterator.next();
        if (result.done) {
            return result;
        }
        else {
            return {
                done: false,
                value: result.value[this.extractIndex]
            };
        }
        ;
    };
    return ExtractElementIterator;
}());
exports.ExtractElementIterator = ExtractElementIterator;

},{}],41:[function(require,module,exports){
"use strict";
//
// An iterator that can iterate multiple other iterators at once.
// This allows iterators to be composed.
// This is used in Data-Forge to combine iterators for index and values.
//
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MultiIterator = /** @class */ (function () {
    function MultiIterator(iterators) {
        this.iterators = iterators;
    }
    MultiIterator.prototype.next = function () {
        if (this.iterators.length === 0) {
            return {
                done: true,
                value: [],
            };
        }
        var multiResult = [];
        try {
            for (var _a = __values(this.iterators), _b = _a.next(); !_b.done; _b = _a.next()) {
                var iterator = _b.value;
                var result = iterator.next();
                if (result.done) {
                    return {
                        done: true,
                        value: [],
                    };
                }
                multiResult.push(result.value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            done: false,
            value: multiResult
        };
        var e_1, _c;
    };
    return MultiIterator;
}());
exports.MultiIterator = MultiIterator;

},{}],42:[function(require,module,exports){
"use strict";
//
// An iterator that applies a selector function to each item.
//
Object.defineProperty(exports, "__esModule", { value: true });
var SelectIterator = /** @class */ (function () {
    function SelectIterator(iterator, selector) {
        this.index = 0;
        this.iterator = iterator;
        this.selector = selector;
    }
    SelectIterator.prototype.next = function () {
        var result = this.iterator.next();
        if (result.done) {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        return {
            done: false,
            value: this.selector(result.value, this.index++)
        };
    };
    return SelectIterator;
}());
exports.SelectIterator = SelectIterator;

},{}],43:[function(require,module,exports){
"use strict";
//
// An iterator that applies a selector function to each item.
//
Object.defineProperty(exports, "__esModule", { value: true });
var SelectManyIterator = /** @class */ (function () {
    function SelectManyIterator(iterator, selector) {
        this.index = 0;
        this.iterator = iterator;
        this.selector = selector;
        this.outputIterator = null;
    }
    SelectManyIterator.prototype.next = function () {
        while (true) {
            if (this.outputIterator === null) {
                var result = this.iterator.next();
                if (result.done) {
                    // https://github.com/Microsoft/TypeScript/issues/8938
                    return { done: true }; // <= explicit cast here!;
                }
                var outputIterable = this.selector(result.value, this.index++);
                this.outputIterator = outputIterable[Symbol.iterator]();
            }
            var outputResult = this.outputIterator.next();
            if (outputResult.done) {
                this.outputIterator = null;
                continue;
            }
            else {
                return outputResult;
            }
        }
    };
    return SelectManyIterator;
}());
exports.SelectManyIterator = SelectManyIterator;

},{}],44:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = require("../series");
var SeriesRollingWindowIterator = /** @class */ (function () {
    function SeriesRollingWindowIterator(iterable, period) {
        this.iterable = iterable;
        this.period = period;
    }
    SeriesRollingWindowIterator.prototype.next = function () {
        if (!this.curWindow) {
            this.curWindow = [];
            this.iterator = this.iterable[Symbol.iterator]();
            for (var i = 0; i < this.period; ++i) {
                var curPos = this.iterator.next();
                if (curPos.done) {
                    // Underlying iterator doesn't have required number of elements.
                    return { done: true };
                }
                this.curWindow.push(curPos.value);
            }
        }
        else {
            this.curWindow.shift(); // Remove first item from window.
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator doesn't have enough elements left.
                return { done: true };
            }
            this.curWindow.push(curPos.value); // Add next item to window.
        }
        var window = new series_1.Series({
            pairs: this.curWindow
        });
        return {
            value: window,
            done: false,
        };
    };
    return SeriesRollingWindowIterator;
}());
exports.SeriesRollingWindowIterator = SeriesRollingWindowIterator;

},{"../series":53}],45:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = require("../series");
var SeriesVariableWindowIterator = /** @class */ (function () {
    function SeriesVariableWindowIterator(iterable, comparer) {
        this.iterator = iterable[Symbol.iterator]();
        this.nextValue = this.iterator.next();
        this.comparer = comparer;
    }
    SeriesVariableWindowIterator.prototype.next = function () {
        if (this.nextValue.done) {
            // Nothing more to read.
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        var pairs = [
            this.nextValue.value,
        ];
        var prevValue = this.nextValue.value;
        // Pull values until there is one that doesn't compare.
        while (true) {
            this.nextValue = this.iterator.next();
            if (this.nextValue.done) {
                break; // No more values.
            }
            if (!this.comparer(prevValue[1], this.nextValue.value[1])) {
                prevValue = this.nextValue.value;
                break; // Doesn't compare. Start a new window.
            }
            pairs.push(this.nextValue.value);
            prevValue = this.nextValue.value;
        }
        var window = new series_1.Series({
            pairs: pairs,
        });
        return {
            value: window,
            done: false,
        };
    };
    return SeriesVariableWindowIterator;
}());
exports.SeriesVariableWindowIterator = SeriesVariableWindowIterator;

},{"../series":53}],46:[function(require,module,exports){
"use strict";
//
// Iterates an underlying iterable in the 'windows'.
//
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = require("../series");
var SeriesWindowIterator = /** @class */ (function () {
    function SeriesWindowIterator(iterable, period) {
        this.iterable = iterable;
        this.period = period;
    }
    SeriesWindowIterator.prototype.next = function () {
        if (!this.iterator) {
            this.iterator = this.iterable[Symbol.iterator]();
        }
        var curWindow = [];
        for (var i = 0; i < this.period; ++i) {
            var curPos = this.iterator.next();
            if (curPos.done) {
                // Underlying iterator is finished.
                break;
            }
            curWindow.push(curPos.value);
        }
        if (curWindow.length === 0) {
            // Underlying iterator doesn't have required number of elements.
            return { done: true };
        }
        var window = new series_1.Series({
            pairs: curWindow
        });
        return {
            value: window,
            done: false,
        };
    };
    return SeriesWindowIterator;
}());
exports.SeriesWindowIterator = SeriesWindowIterator;

},{"../series":53}],47:[function(require,module,exports){
"use strict";
//
// An iterator that skips a number of values.
//
Object.defineProperty(exports, "__esModule", { value: true });
var SkipIterator = /** @class */ (function () {
    function SkipIterator(iterator, numValues) {
        this.iterator = iterator;
        this.numValues = numValues;
    }
    SkipIterator.prototype.next = function () {
        while (--this.numValues >= 0) {
            var result = this.iterator.next();
            if (result.done) {
                return result;
            }
        }
        return this.iterator.next();
    };
    return SkipIterator;
}());
exports.SkipIterator = SkipIterator;

},{}],48:[function(require,module,exports){
"use strict";
//
// An iterator that skips a sequence of elements while a predicate function returns true.
//
Object.defineProperty(exports, "__esModule", { value: true });
var SkipWhileIterator = /** @class */ (function () {
    function SkipWhileIterator(childIterator, predicate) {
        this.doneSkipping = false;
        this.childIterator = childIterator;
        this.predicate = predicate;
    }
    SkipWhileIterator.prototype.next = function () {
        while (true) {
            var result = this.childIterator.next();
            if (result.done) {
                return result; // Done.
            }
            if (!this.doneSkipping && this.predicate(result.value)) {
                continue; // Skip it.
            }
            // It matches, stop skipping.
            this.doneSkipping = true;
            return result;
        }
    };
    return SkipWhileIterator;
}());
exports.SkipWhileIterator = SkipWhileIterator;

},{}],49:[function(require,module,exports){
"use strict";
//
// An iterator that a sequence of elements while a predicate function returns true.
//
Object.defineProperty(exports, "__esModule", { value: true });
var TakeIterator = /** @class */ (function () {
    function TakeIterator(childIterator, numElements) {
        this.childIterator = childIterator;
        this.numElements = numElements;
    }
    TakeIterator.prototype.next = function () {
        if (this.numElements <= 0) {
            // https://github.com/Microsoft/TypeScript/issues/8938
            return { done: true }; // <= explicit cast here!;
        }
        --this.numElements;
        return this.childIterator.next();
    };
    return TakeIterator;
}());
exports.TakeIterator = TakeIterator;

},{}],50:[function(require,module,exports){
"use strict";
//
// An iterator that takes a sequence of elements while a predicate function returns true.
//
Object.defineProperty(exports, "__esModule", { value: true });
var TakeWhileIterator = /** @class */ (function () {
    function TakeWhileIterator(childIterator, predicate) {
        this.done = false;
        this.childIterator = childIterator;
        this.predicate = predicate;
    }
    TakeWhileIterator.prototype.next = function () {
        if (!this.done) {
            var result = this.childIterator.next();
            if (result.done) {
                this.done = true;
            }
            else if (this.predicate(result.value)) {
                return result;
            }
            else {
                this.done = true;
            }
        }
        // https://github.com/Microsoft/TypeScript/issues/8938
        return { done: true }; // <= explicit cast here!;
    };
    return TakeWhileIterator;
}());
exports.TakeWhileIterator = TakeWhileIterator;

},{}],51:[function(require,module,exports){
"use strict";
//
// An iterator that takes elements from a child iterator based on a predicate function.
//
Object.defineProperty(exports, "__esModule", { value: true });
var WhereIterator = /** @class */ (function () {
    function WhereIterator(childIterator, predicate) {
        this.childIterator = childIterator;
        this.predicate = predicate;
    }
    WhereIterator.prototype.next = function () {
        while (true) {
            var result = this.childIterator.next();
            if (result.done) {
                return result;
            }
            if (this.predicate(result.value)) {
                // It matches the predicate.
                return result;
            }
        }
    };
    return WhereIterator;
}());
exports.WhereIterator = WhereIterator;

},{}],52:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
// An iterator that zips together each set of elements in child iterables.
//
var series_1 = require("../series");
var ZipIterator = /** @class */ (function () {
    function ZipIterator(iterables, zipper) {
        this.iterators = iterables.map(function (iterable) { return iterable[Symbol.iterator](); });
        this.zipper = zipper;
    }
    ZipIterator.prototype.next = function () {
        var results = this.iterators.map(function (iterator) { return iterator.next(); });
        try {
            for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                var result = results_1_1.value;
                if (result.done) {
                    // If any are done we are all done.
                    // https://github.com/Microsoft/TypeScript/issues/8938
                    return { done: true }; // <= explicit cast here!;                
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var zippedValues = results.map(function (result) { return result.value; });
        var zipperInput = new series_1.Series(zippedValues);
        return {
            done: false,
            value: this.zipper(zipperInput)
        };
        var e_1, _a;
    };
    return ZipIterator;
}());
exports.ZipIterator = ZipIterator;

},{"../series":53}],53:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var empty_iterable_1 = require("./iterables/empty-iterable");
var count_iterable_1 = require("./iterables/count-iterable");
var multi_iterable_1 = require("./iterables/multi-iterable");
var select_iterable_1 = require("./iterables/select-iterable");
var select_many_iterable_1 = require("./iterables/select-many-iterable");
var take_iterable_1 = require("./iterables/take-iterable");
var take_while_iterable_1 = require("./iterables/take-while-iterable");
var where_iterable_1 = require("./iterables/where-iterable");
var concat_iterable_1 = require("./iterables/concat-iterable");
var series_window_iterable_1 = require("./iterables/series-window-iterable");
var reverse_iterable_1 = require("./iterables/reverse-iterable");
var zip_iterable_1 = require("./iterables/zip-iterable");
var distinct_iterable_1 = require("./iterables/distinct-iterable");
var series_rolling_window_iterable_1 = require("./iterables/series-rolling-window-iterable");
var series_variable_window_iterable_1 = require("./iterables/series-variable-window-iterable");
var ordered_iterable_1 = require("./iterables/ordered-iterable");
var index_1 = require("./index");
var extract_element_iterable_1 = require("./iterables/extract-element-iterable");
var skip_iterable_1 = require("./iterables/skip-iterable");
var skip_while_iterable_1 = require("./iterables/skip-while-iterable");
// @ts-ignore
var easy_table_1 = __importDefault(require("easy-table"));
var dataframe_1 = require("./dataframe");
// @ts-ignore
var dayjs_1 = __importDefault(require("dayjs"));
// @ts-ignore
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(customParseFormat_1.default);
var utils_1 = require("./utils");
var __1 = require("..");
var numeral_1 = __importDefault(require("numeral"));
;
/**
 * Class that represents a series containing a sequence of indexed values.
 */
var Series = /** @class */ (function () {
    /**
     * Create a series.
     *
     * @param config This can be an array, a configuration object or a function that lazily produces a configuration object.
     *
     * It can be an array that specifies the values that the series contains.
     *
     * It can be a {@link ISeriesConfig} that defines the values and configuration of the series.
     *
     * Or it can be a function that lazily produces a {@link ISeriesConfig}.
     *
     * @example
     * <pre>
     *
     * const series = new Series();
     * </pre>
     *
     * @example
     * <pre>
     *
     * const series = new Series([10, 20, 30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const series = new Series({ index: [1, 2, 3, 4], values: [10, 20, 30, 40]});
     * </pre>
     *
     * @example
     * <pre>
     *
     * const lazyInit = () => ({ index: [1, 2, 3, 4], values: [10, 20, 30, 40] });
     * const series = new Series(lazyInit);
     * </pre>
     */
    function Series(config) {
        //
        // Function to lazy evaluate the configuration of the series.
        //
        this.configFn = null;
        //
        // The content of the series.
        // When this is null it means the series is yet to be lazy initialised.
        //
        this.content = null;
        if (config) {
            if (utils_1.isFunction(config)) {
                this.configFn = config;
            }
            else if (utils_1.isArray(config) ||
                utils_1.isFunction(config[Symbol.iterator])) {
                this.content = Series.initFromArray(config);
            }
            else {
                this.content = Series.initFromConfig(config);
            }
        }
        else {
            this.content = Series.initEmpty();
        }
    }
    //
    // Initialise series content from an array of values.
    //
    Series.initFromArray = function (arr) {
        return {
            index: Series.defaultCountIterable,
            values: arr,
            pairs: new multi_iterable_1.MultiIterable([Series.defaultCountIterable, arr]),
            isBaked: true,
        };
    };
    //
    // Initialise an empty series.
    //
    Series.initEmpty = function () {
        return {
            index: Series.defaultEmptyIterable,
            values: Series.defaultEmptyIterable,
            pairs: Series.defaultEmptyIterable,
            isBaked: true,
        };
    };
    //
    // Check that a value is an interable.
    //
    Series.checkIterable = function (input, fieldName) {
        if (utils_1.isArray(input)) {
            // Ok
        }
        else if (utils_1.isFunction(input[Symbol.iterator])) {
            // Assume it's an iterable.
            // Ok
        }
        else {
            // Not ok
            throw new Error("Expected '" + fieldName + "' field of Series config object to be an array of values or an iterable of values.");
        }
    };
    ;
    //
    // Initialise series content from a config object.
    //
    Series.initFromConfig = function (config) {
        var index;
        var values;
        var pairs;
        var isBaked = false;
        if (config.pairs) {
            Series.checkIterable(config.pairs, "pairs");
            pairs = config.pairs;
        }
        if (config.index) {
            Series.checkIterable(config.index, "index");
            index = config.index;
        }
        else if (pairs) {
            index = new extract_element_iterable_1.ExtractElementIterable(pairs, 0);
        }
        else {
            index = Series.defaultCountIterable;
        }
        if (config.values) {
            Series.checkIterable(config.values, "values");
            values = config.values;
        }
        else if (pairs) {
            values = new extract_element_iterable_1.ExtractElementIterable(pairs, 1);
        }
        else {
            values = Series.defaultEmptyIterable;
        }
        if (!pairs) {
            pairs = new multi_iterable_1.MultiIterable([index, values]);
        }
        if (config.baked !== undefined) {
            isBaked = config.baked;
        }
        return {
            index: index,
            values: values,
            pairs: pairs,
            isBaked: isBaked,
        };
    };
    //
    // Ensure the series content has been initialised.
    //
    Series.prototype.lazyInit = function () {
        if (this.content === null && this.configFn !== null) {
            this.content = Series.initFromConfig(this.configFn());
        }
    };
    //
    // Ensure the series content is lazy initalised and return it.
    //
    Series.prototype.getContent = function () {
        this.lazyInit();
        return this.content;
    };
    /**
     * Get an iterator to enumerate the values of the series.
     * Enumerating the iterator forces lazy evaluation to complete.
     * This function is automatically called by `for...of`.
     *
     * @return An iterator for the series.
     *
     * @example
     * <pre>
     *
     * for (const value of series) {
     *     // ... do something with the value ...
     * }
     * </pre>
     */
    Series.prototype[Symbol.iterator] = function () {
        return this.getContent().values[Symbol.iterator]();
    };
    /**
     * Cast the value of the series to a new type.
     * This operation has no effect but to retype the values that the series contains.
     *
     * @return The same series, but with the type changed.
     *
     * @example
     * <pre>
     *
     * const castSeries = series.cast<SomeOtherType>();
     * </pre>
     */
    Series.prototype.cast = function () {
        return this;
    };
    /**
     * Get the index for the series.
     *
     * @return The {@link Index} for the series.
     *
     * @example
     * <pre>
     *
     * const index = series.getIndex();
     * </pre>
     */
    Series.prototype.getIndex = function () {
        var _this = this;
        return new index_1.Index(function () { return ({ values: _this.getContent().index }); });
    };
    /**
     * Apply a new {@link Index} to the series.
     *
     * @param newIndex The new array or iterable to be the new {@link Index} of the series. Can also be a selector to choose the {@link Index} for each value in the series.
     *
     * @return Returns a new series with the specified {@link Index} attached.
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex([10, 20, 30]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex(someOtherSeries);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex(value => computeIndexFromValue(value));
     * </pre>
     *
     * @example
     * <pre>
     *
     * const indexedSeries = series.withIndex(value => value + 20);
     * </pre>
     */
    Series.prototype.withIndex = function (newIndex) {
        var _this = this;
        if (utils_1.isFunction(newIndex)) {
            return new Series(function () { return ({
                values: _this.getContent().values,
                index: _this.select(newIndex),
            }); });
        }
        else {
            Series.checkIterable(newIndex, 'newIndex');
            return new Series(function () { return ({
                values: _this.getContent().values,
                index: newIndex,
            }); });
        }
    };
    ;
    /**
     * Resets the {@link Index} of the series back to the default zero-based sequential integer index.
     *
     * @return Returns a new series with the {@link Index} reset to the default zero-based index.
     *
     * @example
     * <pre>
     *
     * const seriesWithResetIndex = series.resetIndex();
     * </pre>
     */
    Series.prototype.resetIndex = function () {
        var _this = this;
        return new Series(function () { return ({
            values: _this.getContent().values // Just strip the index.
        }); });
    };
    /**
     * Merge multiple series into a single series.
     * Values are merged by index.
     * Values at each index are combined into arrays in the resulting series.
     *
     * @param series An array or series of series to merge.
     *
     * @returns The merged series.
     *
     * @example
     * <pre>
     *
     * const mergedSeries = Series.merge([series1, series2, etc]);
     * </pre>
     */
    Series.merge = function (series) {
        var rowMap = new Map();
        var numSeries = Array.from(series).length; //TODO: Be nice not to have to do this.
        var seriesIndex = 0;
        try {
            for (var series_1 = __values(series), series_1_1 = series_1.next(); !series_1_1.done; series_1_1 = series_1.next()) {
                var workingSeries = series_1_1.value;
                try {
                    for (var _a = __values(workingSeries.toPairs()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var pair = _b.value;
                        var index = pair[0];
                        if (!rowMap.has(index)) {
                            rowMap.set(index, new Array(numSeries));
                        }
                        rowMap.get(index)[seriesIndex] = pair[1];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                ++seriesIndex;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (series_1_1 && !series_1_1.done && (_d = series_1.return)) _d.call(series_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var mergedPairs = Array.from(rowMap.keys())
            .map(function (index) { return [index, rowMap.get(index)]; });
        mergedPairs.sort(function (a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else if (a[0] > b[0]) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return new Series({
            pairs: mergedPairs,
        });
        var e_2, _d, e_1, _c;
    };
    /**
      * Merge one or more series into this series.
      * Values are merged by index.
      * Values at each index are combined into arrays in the resulting series.
      *
      * @param series... One or more other series to merge into the series.
      *
      * @returns The merged series.
      *
      * @example
      * <pre>
      *
      * const mergedSeries = series1.merge(series2);
      * </pre>
      *
      * <pre>
      *
      * const mergedSeries = series1.merge(series2, series3, etc);
      * </pre>
      */
    Series.prototype.merge = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Series.merge([this].concat(args));
    };
    /**
    * Extract values from the series as an array.
    * This forces lazy evaluation to complete.
    *
    * @return Returns an array of the values contained within the series.
    *
    * @example
    * <pre>
    * const values = series.toArray();
    * </pre>
    */
    Series.prototype.toArray = function () {
        var values = [];
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (value !== undefined) {
                    values.push(value);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return values;
        var e_3, _c;
    };
    /**
     * Retreive the index, values pairs from the series as an array.
     * Each pair is [index, value].
     * This forces lazy evaluation to complete.
     *
     * @return Returns an array of pairs that contains the series values. Each pair is a two element array that contains an index and a value.
     *
     * @example
     * <pre>
     * const pairs = series.toPairs();
     * </pre>
     */
    Series.prototype.toPairs = function () {
        var pairs = [];
        try {
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[1] != undefined) {
                    pairs.push(pair);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return pairs;
        var e_4, _c;
    };
    /**
     * Convert the series to a JavaScript object.
     *
     * @param keySelector User-defined selector function that selects keys for the resulting object.
     * @param valueSelector User-defined selector function that selects values for the resulting object.
     *
     * @return Returns a JavaScript object generated from the series by applying the key and value selector functions.
     *
     * @example
     * <pre>
     *
     * const someObject = series.toObject(
     *      value => value, // Specify the value to use for field names in the output object.
     *      value => value // Specify the value to use as the value for each field.
     * );
     * </pre>
     */
    Series.prototype.toObject = function (keySelector, valueSelector) {
        if (!utils_1.isFunction(keySelector))
            throw new Error("Expected 'keySelector' parameter to Series.toObject to be a function.");
        if (!utils_1.isFunction(valueSelector))
            throw new Error("Expected 'valueSelector' parameter to Series.toObject to be a function.");
        return utils_1.toMap(this, keySelector, valueSelector);
    };
    /**
     * Generates a new series by repeatedly calling a user-defined selector function on each value in the original series.
     *
     * @param selector A user-defined selector function that transforms each row to create the new dataframe.
     *
     * @return Returns a new series with each value transformed by the selector function.
     *
     * @example
     * <pre>
     *
     * function transformValue (inputValue) {
     *      const outputValue = {
     *          // ... construct output value derived from input value ...
     *      };
     *
     *      return outputValue;
     * }
     *
     * const transformedSeries = series.select(value => transformValue(value));
     * </pre>
     */
    Series.prototype.select = function (selector) {
        var _this = this;
        if (!utils_1.isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'Series.select' function to be a function.");
        return new Series(function () { return ({
            values: new select_iterable_1.SelectIterable(_this.getContent().values, selector),
            index: _this.getContent().index,
        }); });
    };
    /**
     * Generates a new series by repeatedly calling a user-defined selector function on each row in the original series.
     *
     * Similar to the {@link select} function, but in this case the selector function produces a collection of output values that are flattened and merged to create the new series.
     *
     * @param selector A user-defined selector function that transforms each value into a collection of output values.
     *
     * @return Returns a new series where each value has been transformed into 0 or more new values by the selector function.
     *
     * @example
     * <pre>
     *
     * function produceOutputValues (inputValue) {
     *      const outputValues = [];
     *      while (someCondition) {
     *          // ... generate zero or more output values ...
     *          outputValues.push(... some generated value ...);
     *      }
     *      return outputValues;
     * }
     *
     * const modifiedSeries = series.selectMany(value => produceOutputValues(value));
     * </pre>
     */
    Series.prototype.selectMany = function (selector) {
        var _this = this;
        if (!utils_1.isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'Series.selectMany' to be a function.");
        return new Series(function () { return ({
            pairs: new select_many_iterable_1.SelectManyIterable(_this.getContent().pairs, function (pair, index) {
                var outputPairs = [];
                try {
                    for (var _a = __values(selector(pair[1], index)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var transformed = _b.value;
                        outputPairs.push([
                            pair[0],
                            transformed
                        ]);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                return outputPairs;
                var e_5, _c;
            })
        }); });
    };
    /**
     * Partition a series into a {@link Series} of *data windows*.
     * Each value in the new series is a chunk of data from the original series.
     *
     * @param period The number of values to include in each data window.
     *
     * @return Returns a new series, each value of which is a chunk (data window) of the original series.
     *
     * @example
     * <pre>
     *
     * const windows = series.window(2); // Get values in pairs.
     * const pctIncrease = windows.select(pair => (pair.last() - pair.first()) / pair.first());
     * console.log(pctIncrease.toString());
     * </pre>
     *
     * @example
     * <pre>
     *
     * const salesDf = ... // Daily sales data.
     * const weeklySales = salesDf.window(7); // Partition up into weekly data sets.
     * console.log(weeklySales.toString());
     * </pre>
     */
    Series.prototype.window = function (period) {
        var _this = this;
        if (!utils_1.isNumber(period))
            throw new Error("Expected 'period' parameter to 'Series.window' to be a number.");
        return new Series(function () { return ({
            values: new series_window_iterable_1.SeriesWindowIterable(_this.getContent().pairs, period)
        }); });
    };
    /**
     * Partition a series into a new series of *rolling data windows*.
     * Each value in the new series is a rolling chunk of data from the original series.
     *
     * @param period The number of data values to include in each data window.
     *
     * @return Returns a new series, each value of which is a rolling chunk of the original series.
     *
     * @example
     * <pre>
     *
     * const salesData = ... // Daily sales data.
     * const rollingWeeklySales = salesData.rollingWindow(7); // Get rolling window over weekly sales data.
     * console.log(rollingWeeklySales.toString());
     * </pre>
     */
    Series.prototype.rollingWindow = function (period) {
        var _this = this;
        if (!utils_1.isNumber(period))
            throw new Error("Expected 'period' parameter to 'Series.rollingWindow' to be a number.");
        return new Series(function () { return ({
            values: new series_rolling_window_iterable_1.SeriesRollingWindowIterable(_this.getContent().pairs, period)
        }); });
    };
    /**
     * Partition a series into a new series of variable-length *data windows*
     * where the divisions between the data chunks are
     * defined by a user-provided *comparer* function.
     *
     * @param comparer Function that compares two adjacent data values and returns true if they should be in the same window.
     *
     * @return Returns a new series, each value of which is a chunk of data from the original series.
     *
     * @example
     * <pre>
     *
     * function rowComparer (valueA, valueB) {
     *      if (... valueA should be in the same data window as valueB ...) {
     *          return true;
     *      }
     *      else {
     *          return false;
     *      }
     * };
     *
     * const variableWindows = series.variableWindow(rowComparer);
     */
    Series.prototype.variableWindow = function (comparer) {
        var _this = this;
        if (!utils_1.isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'Series.variableWindow' to be a function.");
        return new Series(function () { return ({
            values: new series_variable_window_iterable_1.SeriesVariableWindowIterable(_this.getContent().pairs, comparer)
        }); });
    };
    ;
    /**
     * Eliminates adjacent duplicate values.
     *
     * For each group of adjacent values that are equivalent only returns the last index/row for the group,
     * thus ajacent equivalent values are collapsed down to the last value.
     *
     * @param [selector] Optional selector function to determine the value used to compare for equivalence.
     *
     * @return Returns a new series with groups of adjacent duplicate vlaues collapsed to a single value per group.
     *
     * @example
     * <pre>
     *
     * const seriesWithDuplicateRowsRemoved = series.sequentialDistinct(value => value);
     *
     * // Or
     * const seriesWithDuplicateRowsRemoved = series.sequentialDistinct(value => value.someNestedField);
     * </pre>
     */
    Series.prototype.sequentialDistinct = function (selector) {
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'Series.sequentialDistinct' to be a selector function that determines the value to compare for duplicates.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); })
            .select(function (window) {
            return [window.getIndex().first(), window.first()];
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; });
    };
    /**
     * Aggregate the values in the series to a single result.
     *
     * @param [seed] Optional seed value for producing the aggregation.
     * @param selector Function that takes the seed and then each value in the series and produces the aggregated value.
     *
     * @return Returns a new value that has been aggregated from the series using the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const dailySales = ... daily sales figures for the past month ...
     * const totalSalesForthisMonth = dailySales.aggregate(
     *      0, // Seed - the starting value.
     *      (accumulator, salesAmount) => accumulator + salesAmount // Aggregation function.
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * const totalSalesAllTime = 500; // We'll seed the aggregation with this value.
     * const dailySales = ... daily sales figures for the past month ...
     * const updatedTotalSalesAllTime = dailySales.aggregate(
     *      totalSalesAllTime,
     *      (accumulator, salesAmount) => accumulator + salesAmount
     * );
     * </pre>
     *
     * @example
     * <pre>
     *
     * var salesDataSummary = salesData.aggregate({
     *      TotalSales: series => series.count(),
     *      AveragePrice: series => series.average(),
     *      TotalRevenue: series => series.sum(),
     * });
     * </pre>
    */
    Series.prototype.aggregate = function (seedOrSelector, selector) {
        if (utils_1.isFunction(seedOrSelector) && !selector) {
            return this.skip(1).aggregate(this.first(), seedOrSelector);
        }
        else {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to aggregate to be a function.");
            var accum = seedOrSelector;
            try {
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    accum = selector(accum, value);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return accum;
        }
        var e_6, _c;
    };
    /**
     * Compute the amount of change between pairs or sets of values in the series.
     *
     * @param [period] Optional period for computing the change - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the amount of change from the previous number value in the original series.
     *
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const amountChanged = salesFigures.amountChanged(); // Amount that sales has changed, day to day.
     * </pre>
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const amountChanged = salesFigures.amountChanged(7); // Amount that sales has changed, week to week.
     * </pre>
     */
    Series.prototype.amountChange = function (period) {
        return this // Have to assume this is a number series.
            .rollingWindow(period === undefined ? 2 : period)
            .select(function (window) {
            var first = window.first();
            var last = window.last();
            var amountChange = last - first; // Compute amount of change.
            return [window.getIndex().last(), amountChange]; // Return new index and value.
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; });
    };
    /**
     * Compute the proportion change between pairs or sets of values in the series.
     * Proportions are expressed as 0-1 values.
     *
     * @param [period] Optional period for computing the proportion - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the proportion change from the previous number value in the original series.
     *
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const proportionChanged = salesFigures.amountChanged(); // Proportion that sales has changed, day to day.
     * </pre>
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const proportionChanged = salesFigures.amountChanged(7); // Proportion that sales has changed, week to week.
     * </pre>
     */
    Series.prototype.proportionChange = function (period) {
        return this // Have to assume this is a number series.
            .rollingWindow(period === undefined ? 2 : period)
            .select(function (window) {
            var first = window.first();
            var last = window.last();
            var amountChange = last - first; // Compute amount of change.
            var pctChange = amountChange / first; // Compute proportion change.
            return [window.getIndex().last(), pctChange]; // Return new index and value.
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; });
    };
    /**
     * Compute the percentage change between pairs or sets of values in the series.
     * Percentages are expressed as 0-100 values.
     *
     * @param [period] Optional period for computing the percentage - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the percent change from the previous number value in the original series.
     *
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const percentChanged = salesFigures.amountChanged(); // Percent that sales has changed, day to day.
     * </pre>
     * @example
     * <pre>
     *
     * const saleFigures = ... running series of daily sales figures ...
     * const percentChanged = salesFigures.amountChanged(7); // Percent that sales has changed, week to week.
     * </pre>
     */
    Series.prototype.percentChange = function (period) {
        return this.proportionChange(period).select(function (v) { return v * 100; });
    };
    /**
     * For each period, compute the proportion of values that are less than the last value in the period.
     * Proportions are expressed as 0-1 values.
     *
     * @param [period] Optional period for computing the proportion rank - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the proportion rank value for that period.
     *
     * @example
     * <pre>
     *
     * const proportionRank = series.proportionRank();
     * </pre>
     * @example
     * <pre>
     *
     * const proportionRank = series.proportionRank(100);
     * </pre>
     */
    Series.prototype.proportionRank = function (period) {
        if (period === undefined) {
            period = 2;
        }
        if (!utils_1.isNumber(period)) {
            throw new Error("Expected 'period' parameter to 'Series.proportionRank' to be a number that specifies the time period for the ranking.");
        }
        return this.rollingWindow(period + 1) // +1 to account for the last value being used.
            .select(function (window) {
            var latestValue = window.last();
            var numLowerValues = window.head(-1).where(function (prevMomentum) { return prevMomentum < latestValue; }).count();
            var proportionRank = numLowerValues / period;
            return [
                window.getIndex().last(),
                proportionRank
            ];
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; });
    };
    /**
     * For each period, compute the percent of values that are less than the last value in the period.
     * Percent are expressed as 0-100 values.
     *
     * @param [period] Optional period for computing the percent rank - defaults to 2.
     *
     * @returns Returns a new series where each value indicates the percent rank value for that period.
     *
     * @example
     * <pre>
     *
     * const percentRank = series.percentRank();
     * </pre>
     * @example
     * <pre>
     *
     * const percentRank = series.percentRank(100);
     * </pre>
     */
    Series.prototype.percentRank = function (period) {
        if (period === undefined) {
            period = 2;
        }
        if (!utils_1.isNumber(period)) {
            throw new Error("Expected 'period' parameter to 'Series.percentRank' to be a number that specifies the time period for the ranking.");
        }
        return this.proportionRank(period).select(function (proportion) { return proportion * 100; });
    };
    /**
     * Skip a number of values in the series.
     *
     * @param numValues Number of values to skip.
     *
     * @return Returns a new series with the specified number of values skipped.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsSkipped = series.skip(10); // Skip 10 rows in the original series.
     * </pre>
     */
    Series.prototype.skip = function (numValues) {
        var _this = this;
        return new Series(function () { return ({
            values: new skip_iterable_1.SkipIterable(_this.getContent().values, numValues),
            index: new skip_iterable_1.SkipIterable(_this.getContent().index, numValues),
            pairs: new skip_iterable_1.SkipIterable(_this.getContent().pairs, numValues),
        }); });
    };
    /**
     * Skips values in the series while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to skip values in the original series.
     *
     * @return Returns a new series with all initial sequential values removed while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsSkipped = series.skipWhile(salesFigure => salesFigure > 100); // Skip initial sales figure that are less than 100.
     * </pre>
     */
    Series.prototype.skipWhile = function (predicate) {
        var _this = this;
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.skipWhile' function to be a predicate function that returns true/false.");
        return new Series(function () { return ({
            values: new skip_while_iterable_1.SkipWhileIterable(_this.getContent().values, predicate),
            pairs: new skip_while_iterable_1.SkipWhileIterable(_this.getContent().pairs, function (pair) { return predicate(pair[1]); }),
        }); });
    };
    /**
     * Skips values in the series untils a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop skipping values in the original series.
     *
     * @return Returns a new series with all initial sequential values removed until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsSkipped = series.skipUntil(salesFigure => salesFigure > 100); // Skip initial sales figures unitl we see one greater than 100.
     * </pre>
     */
    Series.prototype.skipUntil = function (predicate) {
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.skipUntil' function to be a predicate function that returns true/false.");
        return this.skipWhile(function (value) { return !predicate(value); });
    };
    /**
     * Take a number of  values from the series.
     *
     * @param numValues Number of values to take.
     *
     * @return Returns a new series with only the specified number of values taken from the original series.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsTaken = series.take(15); // Take only the first 15 values from the original series.
     * </pre>
     */
    Series.prototype.take = function (numRows) {
        var _this = this;
        if (!utils_1.isNumber(numRows))
            throw new Error("Expected 'numRows' parameter to 'Series.take' function to be a number.");
        return new Series(function () { return ({
            index: new take_iterable_1.TakeIterable(_this.getContent().index, numRows),
            values: new take_iterable_1.TakeIterable(_this.getContent().values, numRows),
            pairs: new take_iterable_1.TakeIterable(_this.getContent().pairs, numRows)
        }); });
    };
    ;
    /**
     * Takes values from the series while a condition evaluates to true or truthy.
     *
     * @param predicate Returns true/truthy to continue to take values from the original series.
     *
     * @return Returns a new series with only the initial sequential values that were taken while the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsTaken = series.takeWhile(salesFigure => salesFigure > 100); // Take only initial sales figures that are greater than 100.
     * </pre>
     */
    Series.prototype.takeWhile = function (predicate) {
        var _this = this;
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.takeWhile' function to be a predicate function that returns true/false.");
        return new Series(function () { return ({
            values: new take_while_iterable_1.TakeWhileIterable(_this.getContent().values, predicate),
            pairs: new take_while_iterable_1.TakeWhileIterable(_this.getContent().pairs, function (pair) { return predicate(pair[1]); })
        }); });
    };
    /**
     * Takes values from the series until a condition evaluates to true or truthy.
     *
     * @param predicate Return true/truthy to stop taking values in the original series.
     *
     * @return Returns a new series with only the initial sequential values taken until the predicate returned true/truthy.
     *
     * @example
     * <pre>
     *
     * const seriesWithRowsTaken = series.takeUntil(salesFigure => salesFigure > 100); // Take all initial sales figures until we see one that is greater than 100.
     * </pre>
     */
    Series.prototype.takeUntil = function (predicate) {
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.takeUntil' function to be a predicate function that returns true/false.");
        return this.takeWhile(function (value) { return !predicate(value); });
    };
    /**
     * Static version of the count function for use with summarize and pivot functions.
     *
     * @param series Input series to be counted.
     *
     * @returns Returns the count of values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      ColumnToBeCounted: Series.count,
     * });
     * </pre>
     */
    Series.count = function (series) {
        return series.count();
    };
    /**
     * Count the number of values in the seriese
     *
     * @return Returns the count of all values.
     *
     * @example
     * <pre>
     *
     * const numValues = series.count();
     * </pre>
     */
    Series.prototype.count = function () {
        var total = 0;
        try {
            for (var _a = __values(this.getContent().values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                ++total;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return total;
        var e_7, _c;
    };
    /**
     * Get the first value of the series.
     *
     * @return Returns the first value of the series.
     *
     * @example
     * <pre>
     *
     * const firstValue = series.first();
     * </pre>
     */
    Series.prototype.first = function () {
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                return value; // Only need the first value.
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_8) throw e_8.error; }
        }
        throw new Error("Series.first: No values in Series.");
        var e_8, _c;
    };
    /**
     * Get the last value of the series.
     *
     * @return Returns the last value of the series.
     *
     * @example
     * <pre>
     *
     * const lastValue = series.last();
     * </pre>
     */
    Series.prototype.last = function () {
        var lastValue = null;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                lastValue = value; // Throw away all values until we get to the last one.
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_9) throw e_9.error; }
        }
        if (lastValue === null) {
            throw new Error("Series.last: No values in Series.");
        }
        return lastValue;
        var e_9, _c;
    };
    /**
     * Get the value, if there is one, with the specified index.
     *
     * @param index Index to for which to retreive the value.
     *
     * @return Returns the value from the specified index in the series or undefined if there is no such index in the present in the series.
     *
     * @example
     * <pre>
     *
     * const value = series.at(5); // Get the value at index 5 (with a default 0-based index).
     * </pre>
     *
     * @example
     * <pre>
     *
     * const date = ... some date ...
     * // Retreive the value with specified date from a time-series (assuming date indexed has been applied).
     * const value = series.at(date);
     * </pre>
     */
    Series.prototype.at = function (index) {
        if (this.none()) {
            return undefined;
        }
        try {
            //
            // This is pretty expensive.
            // A specialised index could improve this.
            //
            for (var _a = __values(this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pair = _b.value;
                if (pair[0] === index) {
                    return pair[1];
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return undefined;
        var e_10, _c;
    };
    /**
     * Get X value from the start of the series.
     * Pass in a negative value to get all values at the head except for X values at the tail.
     *
     * @param numValues Number of values to take.
     *
     * @return Returns a new series that has only the specified number of values taken from the start of the original series.
     *
     * @examples
     * <pre>
     *
     * const sample = series.head(10); // Take a sample of 10 values from the start of the series.
     * </pre>
     */
    Series.prototype.head = function (numValues) {
        if (!utils_1.isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'Series.head' function to be a number.");
        if (numValues === 0) {
            return new Series(); // Empty series.
        }
        var toTake = numValues < 0 ? this.count() - Math.abs(numValues) : numValues;
        return this.take(toTake);
    };
    /**
     * Get X values from the end of the series.
     * Pass in a negative value to get all values at the tail except X values at the head.
     *
     * @param numValues Number of values to take.
     *
     * @return Returns a new series that has only the specified number of values taken from the end of the original series.
     *
     * @examples
     * <pre>
     *
     * const sample = series.tail(12); // Take a sample of 12 values from the end of the series.
     * </pre>
     */
    Series.prototype.tail = function (numValues) {
        if (!utils_1.isNumber(numValues))
            throw new Error("Expected 'numValues' parameter to 'Series.tail' function to be a number.");
        if (numValues === 0) {
            return new Series(); // Empty series.
        }
        var toSkip = numValues > 0 ? this.count() - numValues : Math.abs(numValues);
        return this.skip(toSkip);
    };
    /**
     * Filter the series using user-defined predicate function.
     *
     * @param predicate Predicte function to filter values from the series. Returns true/truthy to keep values, or false/falsy to omit values.
     *
     * @return Returns a new series containing only the values from the original series that matched the predicate.
     *
     * @example
     * <pre>
     *
     * const filtered = series.where(salesFigure => salesFigure > 100); // Filter so we only have sales figures greater than 100.
     * </pre>
     */
    Series.prototype.where = function (predicate) {
        var _this = this;
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.where' function to be a function.");
        return new Series(function () { return ({
            values: new where_iterable_1.WhereIterable(_this.getContent().values, predicate),
            pairs: new where_iterable_1.WhereIterable(_this.getContent().pairs, function (pair) { return predicate(pair[1]); })
        }); });
    };
    /**
     * Invoke a callback function for each value in the series.
     *
     * @param callback The calback function to invoke for each value.
     *
     * @return Returns the original series with no modifications.
     *
     * @example
     * <pre>
     *
     * series.forEach(value => {
     *      // ... do something with the value ...
     * });
     * </pre>
     */
    Series.prototype.forEach = function (callback) {
        if (!utils_1.isFunction(callback))
            throw new Error("Expected 'callback' parameter to 'Series.forEach' to be a function.");
        var index = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                callback(value, index++);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return this;
        var e_11, _c;
    };
    ;
    /**
     * Evaluates a predicate function for every value in the series to determine
     * if some condition is true/truthy for **all** values in the series.
     *
     * @param predicate Predicate function that receives each value. It should returns true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned true or truthy for every value in the series, otherwise returns false. Returns false for an empty series.
     *
     * @example
     * <pre>
     *
     * const result = series.all(salesFigure => salesFigure > 100); // Returns true if all sales figures are greater than 100.
     * </pre>
     */
    Series.prototype.all = function (predicate) {
        if (!utils_1.isFunction(predicate))
            throw new Error("Expected 'predicate' parameter to 'Series.all' to be a function.");
        var count = 0;
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (!predicate(value)) {
                    return false;
                }
                ++count;
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return count > 0;
        var e_12, _c;
    };
    /**
     * Evaluates a predicate function for every value in the series to determine
     * if some condition is true/truthy for **any** of values in the series.
     *
     * If no predicate is specified then it simply checks if the series contains more than zero values.
     *
     * @param [predicate] Optional predicate function that receives each value. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for any value in the series, otherwise returns false.
     * If no predicate is passed it returns true if the series contains any values at all.
     * Returns false for an empty series.
     *
     * @example
     * <pre>
     *
     * const result = series.any(salesFigure => salesFigure > 100); // Do we have any sales figures greater than 100?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = series.any(); // Do we have any sales figures at all?
     * </pre>
     */
    Series.prototype.any = function (predicate) {
        if (predicate) {
            if (!utils_1.isFunction(predicate))
                throw new Error("Expected 'predicate' parameter to 'Series.any' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return true;
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        else {
            // Just check if there is at least one item.
            var iterator = this[Symbol.iterator]();
            return !iterator.next().done;
        }
        return false; // Nothing passed.
        var e_13, _c;
    };
    /**
     * Evaluates a predicate function for every value in the series to determine
     * if some condition is true/truthy for **none** of values in the series.
     *
     * If no predicate is specified then it simply checks if the series contains zero values.
     *
     * @param [predicate] Optional predicate function that receives each value. It should return true/truthy for a match, otherwise false/falsy.
     *
     * @return Returns true if the predicate has returned truthy for zero values in the series, otherwise returns false. Returns false for an empty series.
     *
     * @example
     * <pre>
     *
     * const result = series.none(salesFigure => salesFigure > 100); // Do we have zero sales figures greater than 100?
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = series.none(); // Do we have zero sales figures?
     * </pre>
     */
    Series.prototype.none = function (predicate) {
        if (predicate) {
            if (!utils_1.isFunction(predicate))
                throw new Error("Expected 'predicate' parameter to 'Series.none' to be a function.");
        }
        if (predicate) {
            try {
                // Use the predicate to check each value.
                for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var value = _b.value;
                    if (predicate(value)) {
                        return false;
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_14) throw e_14.error; }
            }
        }
        else {
            // Just check if empty.
            var iterator = this[Symbol.iterator]();
            return iterator.next().done;
        }
        return true; // Nothing failed the predicate.
        var e_14, _c;
    };
    /**
     * Gets a new series containing all values starting at or after the specified index value.
     *
     * @param indexValue The index value at which to start the new series.
     *
     * @return Returns a new series containing all values starting at or after the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = series.startAt(2);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values starting at (or after) a particular date.
     * const result = timeSeries.startAt(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.startAt = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThan = _this.getIndex().getLessThan();
            return {
                index: new skip_while_iterable_1.SkipWhileIterable(_this.getContent().index, function (index) { return lessThan(index, indexValue); }),
                pairs: new skip_while_iterable_1.SkipWhileIterable(_this.getContent().pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values up until and including the specified index value (inclusive).
     *
     * @param indexValue The index value at which to end the new series.
     *
     * @return Returns a new series containing all values up until and including the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = series.endAt(1);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values ending at a particular date.
     * const result = timeSeries.endAt(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.endAt = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                index: new take_while_iterable_1.TakeWhileIterable(_this.getContent().index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new take_while_iterable_1.TakeWhileIterable(_this.getContent().pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values up to the specified index value (exclusive).
     *
     * @param indexValue The index value at which to end the new series.
     *
     * @return Returns a new series containing all values up to (but not including) the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const firstHalf = series.before(2);
     * expect(firstHalf.toArray()).to.eql([10, 20]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values before the specified date.
     * const result = timeSeries.before(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.before = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThan = _this.getIndex().getLessThan();
            return {
                index: new take_while_iterable_1.TakeWhileIterable(_this.getContent().index, function (index) { return lessThan(index, indexValue); }),
                pairs: new take_while_iterable_1.TakeWhileIterable(_this.getContent().pairs, function (pair) { return lessThan(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values after the specified index value (exclusive).
     *
     * @param indexValue The index value after which to start the new series.
     *
     * @return Returns a new series containing all values after the specified index value.
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3], // This is the default index.
     *      values: [10, 20, 30, 40],
     * });
     *
     * const lastHalf = df.before(1);
     * expect(lastHalf.toArray()).to.eql([30, 40]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSerie = ... a series indexed by date/time ...
     *
     * // Get all values after the specified date.
     * const result = timeSeries.after(new Date(2016, 5, 4));
     * </pre>
     */
    Series.prototype.after = function (indexValue) {
        var _this = this;
        return new Series(function () {
            var lessThanOrEqualTo = _this.getIndex().getLessThanOrEqualTo();
            return {
                index: new skip_while_iterable_1.SkipWhileIterable(_this.getContent().index, function (index) { return lessThanOrEqualTo(index, indexValue); }),
                pairs: new skip_while_iterable_1.SkipWhileIterable(_this.getContent().pairs, function (pair) { return lessThanOrEqualTo(pair[0], indexValue); }),
            };
        });
    };
    /**
     * Gets a new series containing all values between the specified index values (inclusive).
     *
     * @param startIndexValue The index at which to start the new series.
     * @param endIndexValue The index at which to end the new series.
     *
     * @return Returns a new series containing all values between the specified index values (inclusive).
     *
     * @example
     * <pre>
     *
     * const series = new Series({
     *      index: [0, 1, 2, 3, 4, 6], // This is the default index.
     *      values: [10, 20, 30, 40, 50, 60],
     * });
     *
     * const middleSection = series.between(1, 4);
     * expect(middleSection.toArray()).to.eql([20, 30, 40, 50]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const timeSeries = ... a series indexed by date/time ...
     *
     * // Get all values between the start and end dates (inclusive).
     * const result = timeSeries.after(new Date(2016, 5, 4), new Date(2016, 5, 22));
     * </pre>
     */
    Series.prototype.between = function (startIndexValue, endIndexValue) {
        return this.startAt(startIndexValue).endAt(endIndexValue);
    };
    /**
     * Format the series for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @return Generates and returns a string representation of the series.
     *
     * @example
     * <pre>
     *
     * console.log(series.toString());
     * </pre>
     */
    Series.prototype.toString = function () {
        var header = ["__index__", "__value__"];
        var rows = this.toPairs();
        var table = new easy_table_1.default();
        for (var rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
            var row = rows[rowIndex];
            for (var cellIndex = 0; cellIndex < row.length; ++cellIndex) {
                var cell = row[cellIndex];
                table.cell(header[cellIndex], cell);
            }
            table.newRow();
        }
        return table.toString();
    };
    ;
    //
    // Helper function to parse a string to an int.
    //
    Series.parseInt = function (value, valueIndex) {
        if (value === undefined) {
            return undefined;
        }
        else {
            if (!utils_1.isString(value))
                throw new Error("Called Series.parseInts, expected all values in the series to be strings, instead found a '" + typeof (value) + "' at index " + valueIndex);
            if (value.length === 0) {
                return undefined;
            }
            return parseInt(value);
        }
    };
    /**
     * Parse a series with string values and convert it to a series with int values.
     *
     * @return Returns a new series with values parsed from strings to ints.
     *
     * @example
     * <pre>
     *
     * const parsed = series.parseInts();
     * </pre>
     */
    Series.prototype.parseInts = function () {
        return this.select(Series.parseInt);
    };
    ;
    //
    // Helper function to parse a string to a float.
    //
    Series.parseFloat = function (value, valueIndex) {
        if (value === undefined) {
            return undefined;
        }
        else {
            if (!utils_1.isString(value))
                throw new Error("Called Series.parseFloats, expected all values in the series to be strings, instead found a '" + typeof (value) + "' at index " + valueIndex);
            if (value.length === 0) {
                return undefined;
            }
            return parseFloat(value);
        }
    };
    /**
     * Parse a series with string values and convert it to a series with float values.
     *
     * @return Returns a new series with values parsed from strings to floats.
     *
     * @example
     * <pre>
     *
     * const parsed = series.parseFloats();
     * </pre>
     */
    Series.prototype.parseFloats = function () {
        return this.select(Series.parseFloat);
    };
    ;
    //
    // Helper function to parse a string to a date.
    //
    Series.parseDate = function (value, valueIndex, formatString) {
        if (value === undefined) {
            return undefined;
        }
        else {
            if (!utils_1.isString(value))
                throw new Error("Called Series.parseDates, expected all values in the series to be strings, instead found a '" + typeof (value) + "' at index " + valueIndex);
            if (value.length === 0) {
                return undefined;
            }
            return dayjs_1.default(value, formatString).toDate();
        }
    };
    /**
     * Parse a series with string values and convert it to a series with date values.
     *
     * @param [formatString] Optional formatting string for dates.
     *
     * Moment is used for date parsing.
     * https://momentjs.com
     *
     * @return Returns a new series with values parsed from strings to dates.
     *
     * @example
     * <pre>
     *
     * const parsed = series.parseDates();
     * </pre>
     */
    Series.prototype.parseDates = function (formatString) {
        if (formatString) {
            if (!utils_1.isString(formatString))
                throw new Error("Expected optional 'formatString' parameter to Series.parseDates to be a string (if specified).");
        }
        return this.select(function (value, valueIndex) { return Series.parseDate(value, valueIndex, formatString); });
    };
    //
    // Helper function to convert a value to a string.
    //
    Series.toString = function (value, formatString) {
        if (value === undefined) {
            return undefined;
        }
        else if (value === null) {
            return null;
        }
        else if (formatString && utils_1.isDate(value)) {
            return dayjs_1.default(value).format(formatString);
        }
        else if (formatString && utils_1.isNumber(value)) {
            return numeral_1.default(value).format(formatString);
        }
        else {
            return value.toString();
        }
    };
    /**
     * Convert a series of values of different types to a series containing string values.
     *
     * @param [formatString] Optional formatting string for dates.
     *
     * Numeral.js is used for number formatting.
     * http://numeraljs.com/
     *
     * Moment is used for date formatting.
     * https://momentjs.com/docs/#/parsing/string-format/
     *
     * @return Returns a new series values converted from values to strings.
     *
     * @example
     * <pre>
     *
     * const result = series.toStrings("YYYY-MM-DD");
     * </pre>
     *
     * @example
     * <pre>
     *
     * const result = series.toStrings("0.00");
     * </pre>
     */
    Series.prototype.toStrings = function (formatString) {
        if (formatString) {
            if (!utils_1.isString(formatString))
                throw new Error("Expected optional 'formatString' parameter to Series.toStrings to be a string (if specified).");
        }
        return this.select(function (value) { return Series.toString(value, formatString); });
    };
    /**
     * Forces lazy evaluation to complete and 'bakes' the series into memory.
     *
     * @return Returns a series that has been 'baked', all lazy evaluation has completed.
     *
     * @example
     * <pre>
     *
     * const baked = series.bake();
     * </pre>
     */
    Series.prototype.bake = function () {
        if (this.getContent().isBaked) {
            // Already baked.
            return this;
        }
        return new Series({
            values: this.toArray(),
            pairs: this.toPairs(),
            baked: true,
        });
    };
    ;
    /**
     * Converts (inflates) a series to a {@link DataFrame}.
     *
     * @param [selector] Optional user-defined selector function that transforms each value to produce the dataframe.
     *
     * @returns Returns a dataframe that was created from the original series.
     *
     * @example
     * <pre>
     *
     * const dataframe = series.inflate(); // Inflate a series of objects to a dataframe.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dataframe = series.inflate(value => { AColumn:  value }); // Produces a dataframe with 1 column from a series of values.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const dataframe = series.inflate(value => { AColumn:  value.NestedValue }); // Extract a nested value and produce a dataframe from it.
     * </pre>
     */
    Series.prototype.inflate = function (selector) {
        var _this = this;
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to Series.inflate to be a selector function.");
            return new dataframe_1.DataFrame(function () {
                var content = _this.getContent();
                return {
                    values: new select_iterable_1.SelectIterable(content.values, selector),
                    index: content.index,
                    pairs: new select_iterable_1.SelectIterable(content.pairs, function (pair, index) { return [pair[0], selector(pair[1], index)]; }),
                };
            });
        }
        else {
            return new dataframe_1.DataFrame(function () {
                var content = _this.getContent();
                return {
                    values: content.values,
                    index: content.index,
                    pairs: content.pairs,
                };
            });
        }
    };
    /**
     * Static version of the sum function for use with summarize and pivot functions.
     *
     * @param series Input series to be summed.
     *
     * @returns Returns the sum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      ColumnToBeSummed: Series.sum,
     * });
     * </pre>
     */
    Series.sum = function (series) {
        return series.sum();
    };
    /**
     * Sum the values in a series and returns the result.
     *
     * @returns Returns the sum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const totalSales = salesFigures.sum();
     * </pre>
     */
    Series.prototype.sum = function () {
        if (this.none()) {
            return 0;
        }
        var numberSeries = this; // Have to assume we are working with a number series here.
        return numberSeries.aggregate(function (prev, value) { return prev + value; });
    };
    /**
     * Static version of the average function for use with summarize and pivot functions.
     *
     * @param series Input series to be averaged.
     *
     * @returns Returns the average of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      ColumnToBeAveraged: Series.average,
     * });
     * </pre>
     */
    Series.average = function (series) {
        return series.average();
    };
    /**
     * Average the values in a series and returns the result
     *
     * @returns Returns the average of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const averageSales = salesFigures.average();
     * </pre>
     */
    Series.prototype.average = function () {
        var count = this.count();
        if (count > 0) {
            return this.sum() / count;
        }
        else {
            return 0;
        }
    };
    /**
     * Static version of the median function for use with summarize and pivot functions.
     *
     * @param series Input series to find the median of.
     *
     * @returns Returns the median of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      InputColumn: Series.median,
     * });
     * </pre>
     */
    Series.median = function (series) {
        return series.median();
    };
    /**
     * Get the median value in the series.
     * Note that this sorts the series, which can be expensive.
     *
     * @returns Returns the median of the values in the series.
     *
     * @example
     * <pre>
     *
     * const medianSales = salesFigures.median();
     * </pre>
     */
    Series.prototype.median = function () {
        //
        // From here: http://stackoverflow.com/questions/5275115/add-a-median-method-to-a-list
        //
        var numberSeries = this; // Have to assume we are working with a number series here.
        var count = numberSeries.count();
        if (count === 0) {
            return 0;
        }
        var ordered = numberSeries.orderBy(function (value) { return value; }).toArray();
        if ((count % 2) == 0) {
            // Even.
            var a = ordered[count / 2 - 1];
            var b = ordered[count / 2];
            return (a + b) / 2;
        }
        // Odd
        return ordered[Math.floor(count / 2)];
    };
    /**
     * Static version of the standard deviation function for use with summarize and pivot functions.
     *
     * @param series Input series to find the standard deviation of.
     *
     * @returns Returns the standard deviation of the values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      InputColumn: Series.std,
     * });
     * </pre>
     */
    Series.std = function (series) {
        return series.std();
    };
    /**
     * Get the standard deviation of number values in the series.
     *
     * @returns Returns the standard deviation of the values in the series.
     *
     * @example
     * <pre>
     *
     * const salesStdDev = salesFigures.std();
     * </pre>
     */
    Series.prototype.std = function () {
        // Have to assume we are working with a number series here.
        // Bake so we don't evaluate multiple times.
        // TODO: Caching can help here.
        var numberSeries = this.bake();
        var valueCount = numberSeries.count();
        if (valueCount === 0) {
            return 0;
        }
        // https://en.wikipedia.org/wiki/Standard_deviation
        var mean = numberSeries.average();
        var sumOfSquaredDiffs = numberSeries
            .select(function (value) {
            var diffFromMean = value - mean;
            return diffFromMean * diffFromMean;
        })
            .sum();
        return Math.sqrt(sumOfSquaredDiffs / valueCount);
    };
    /**
     * Static version of the min function for use with summarize and pivot functions.
     *
     * @param series Input series to find the minimum of.
     *
     * @returns Returns the minimum of number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      Column: Series.min,
     * });
     * </pre>
     */
    Series.min = function (series) {
        return series.min();
    };
    /**
     * Get the min value in the series.
     *
     * @returns Returns the minimum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const minSales = salesFigures.min();
     * </pre>
     */
    Series.prototype.min = function () {
        var numberSeries = this; // Have to assume we are working with a number series here.
        return numberSeries.aggregate(function (prev, value) { return Math.min(prev, value); });
    };
    /**
     * Static version of the max function for use with summarize and pivot functions.
     *
     * @param series Input series to find the maximum of.
     *
     * @returns Returns the maximum of number values in the series.
     *
     * @example
     * <pre>
     *
     * const summary = dataFrame.summarize({
     *      Column: Series.max,
     * });
     * </pre>
     */
    Series.max = function (series) {
        return series.max();
    };
    /**
     * Get the max value in the series.
     *
     * @returns Returns the maximum of the number values in the series.
     *
     * @example
     * <pre>
     *
     * const maxSales = salesFigures.max();
     * </pre>
     */
    Series.prototype.max = function () {
        var numberSeries = this; // Have to assume we are working with a number series here.
        return numberSeries.aggregate(function (prev, value) { return Math.max(prev, value); });
    };
    /**
     * Invert the sign of every number value in the series.
     * This assumes that the input series contains numbers.
     *
     * @returns Returns a new series with all number values inverted.
     *
     * @example
     * <pre>
     *
     * const inverted = series.invert();
     * </pre>
     */
    Series.prototype.invert = function () {
        var inputSeries = this;
        return inputSeries.select(function (value) { return -value; });
    };
    /**
     * Counts the number of sequential values where the predicate evaluates to truthy.
     * Outputs 0 for values when the predicate evaluates to falsy.
     *
     * @param predicate User-defined function. Should evaluate to truthy to activate the counter or falsy to deactivate it.
     *
     * @returns Returns a new series that counts up the number of sequential values where the predicate evaluates to truthy. 0 values appear when the prediate evaluates to falsy.
     *
     * @example
     * <pre>
     *
     * const series = new Series([ 1, 10, 3, 15, 8, 5 ]);
     * const counted = series.counter(value => value >= 3);
     * console.log(counted.toString());
     * </pre>
     */
    Series.prototype.counter = function (predicate) {
        return this.groupSequentialBy(predicate)
            .selectMany(function (group, i) {
            if (predicate(group.first())) {
                // This group matches the predicate.
                return __1.range(1, group.count())
                    .withIndex(group.getIndex())
                    .toPairs(); //TODO: selectMany wipes the index. It needs to respect it!
            }
            else {
                // This group doesn't match the predicate.
                return __1.replicate(0, group.count())
                    .withIndex(group.getIndex())
                    .toPairs(); //TODO: selectMany wipes the index. It needs to respect it!
            }
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; });
    };
    /**
     * Gets a new series in reverse order.
     *
     * @return Returns a new series that is the reverse of the original.
     *
     * @example
     * <pre>
     *
     * const reversed = series.reverse();
     * </pre>
     */
    Series.prototype.reverse = function () {
        var _this = this;
        return new Series(function () { return ({
            values: new reverse_iterable_1.ReverseIterable(_this.getContent().values),
            index: new reverse_iterable_1.ReverseIterable(_this.getContent().index),
            pairs: new reverse_iterable_1.ReverseIterable(_this.getContent().pairs)
        }); });
    };
    /**
     * Returns only the set of values in the series that are distinct.
     * Provide a user-defined selector to specify criteria for determining the distinctness.
     * This can be used to remove duplicate values from the series.
     *
     * @param [selector] Optional user-defined selector function that specifies the criteria used to make comparisons for duplicate values.
     *
     * @return Returns a series containing only unique values in the series.
     *
     * @example
     * <pre>
     *
     * const uniqueValues = series.distinct(); // Get only non-duplicated value in the series.
     * </pre>
     *
     * @example
     * <pre>
     *
     * const bucketedValues = series.distinct(value => Math.floor(value / 10)); // Lump values into buckets of 10.
     * </pre>
     */
    Series.prototype.distinct = function (selector) {
        var _this = this;
        return new Series(function () { return ({
            values: new distinct_iterable_1.DistinctIterable(_this.getContent().values, selector),
            pairs: new distinct_iterable_1.DistinctIterable(_this.getContent().pairs, function (pair) { return selector && selector(pair[1]) || pair[1]; })
        }); });
    };
    /**
     * Collects values in the series into a new series of groups according to a user-defined selector function.
     *
     * @param selector User-defined selector function that specifies the criteriay to group by.
     *
     * @return Returns a new series of groups. Each group is a series with values that have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * const sales = ... product sales ...
     * const salesByProduct = sales.groupBy(sale => sale.ProductId);
     * for (const productSalesGroup of salesByProduct) {
     *      // ... do something with each product group ...
     *      const productId = productSalesGroup.first().ProductId;
     *      const totalSalesForProduct = productSalesGroup.deflate(sale => sale.Amount).sum();
     *      console.log(totalSalesForProduct);
     * }
     * </pre>
     */
    Series.prototype.groupBy = function (selector) {
        var _this = this;
        if (!utils_1.isFunction(selector))
            throw new Error("Expected 'selector' parameter to 'Series.groupBy' to be a selector function that determines the value to group the series by.");
        return new Series(function () {
            var groups = []; // Each group, in order of discovery.
            var groupMap = {}; // Group map, records groups by key.
            var valueIndex = 0;
            try {
                for (var _a = __values(_this.getContent().pairs), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var pair = _b.value;
                    var groupKey = selector(pair[1], valueIndex);
                    ++valueIndex;
                    var existingGroup = groupMap[groupKey];
                    if (existingGroup) {
                        existingGroup.push(pair);
                    }
                    else {
                        var newGroup = [];
                        newGroup.push(pair);
                        groups.push(newGroup);
                        groupMap[groupKey] = newGroup;
                    }
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return {
                values: groups.map(function (group) { return new Series({ pairs: group }); })
            };
            var e_15, _c;
        });
    };
    /**
     * Collects values in the series into a new series of groups based on if the values are the same or according to a user-defined selector function.
     *
     * @param [selector] Optional selector that specifies the criteria for grouping.
     *
     * @return Returns a new series of groups. Each group is a series with values that are the same or have been grouped by the 'selector' function.
     *
     * @example
     * <pre>
     *
     * // Some ultra simple stock trading strategy backtesting...
     * const dailyStockPrice = ... daily stock price for a company ...
     * const priceGroups  = dailyStockPrice.groupBy(day => day.close > day.movingAverage);
     * for (const priceGroup of priceGroups) {
     *      // ... do something with each stock price group ...
     *
     *      const firstDay = priceGroup.first();
     *      if (firstDay.close > movingAverage) {
     *          // This group of days has the stock price above its moving average.
     *          // ... maybe enter a long trade here ...
     *      }
     *      else {
     *          // This group of days has the stock price below its moving average.
     *          // ... maybe enter a short trade here ...
     *      }
     * }
     * </pre>
     */
    Series.prototype.groupSequentialBy = function (selector) {
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected 'selector' parameter to 'Series.groupSequentialBy' to be a selector function that determines the value to group the series by.");
        }
        else {
            selector = function (value) { return value; };
        }
        return this.variableWindow(function (a, b) { return selector(a) === selector(b); });
    };
    /**
     * Concatenate multiple series into a single series.
     *
     * @param series - Array of series to concatenate.
     *
     * @returns Returns a single series concatenated from multiple input series.
     */
    Series.concat = function (series) {
        if (!utils_1.isArray(series))
            throw new Error("Expected 'series' parameter to 'Series.concat' to be an array of series.");
        return new Series(function () {
            var upcast = series; // Upcast so that we can access private index, values and pairs.
            var contents = upcast.map(function (series) { return series.getContent(); });
            return {
                values: new concat_iterable_1.ConcatIterable(contents.map(function (content) { return content.values; })),
                pairs: new concat_iterable_1.ConcatIterable(contents.map(function (content) { return content.pairs; })),
            };
        });
    };
    /**
     * Concatenate multiple other series onto this series.
     *
     * @param series Multiple arguments. Each can be either a series or an array of series.
     *
     * @return Returns a single series concatenated from multiple input series.
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat(b);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat(b, c);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat([b, c]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const concatenated = a.concat(b, [c, d]);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const otherSeries = [... array of series...];
     * const concatenated = a.concat(otherSeries);
     * </pre>
     */
    Series.prototype.concat = function () {
        var series = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            series[_i] = arguments[_i];
        }
        var concatInput = [this];
        try {
            for (var series_2 = __values(series), series_2_1 = series_2.next(); !series_2_1.done; series_2_1 = series_2.next()) {
                var input = series_2_1.value;
                if (utils_1.isArray(input)) {
                    try {
                        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                            var subInput = input_1_1.value;
                            concatInput.push(subInput);
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                }
                else {
                    concatInput.push(input);
                }
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (series_2_1 && !series_2_1.done && (_b = series_2.return)) _b.call(series_2);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return Series.concat(concatInput);
        var e_17, _b, e_16, _a;
    };
    /**
    * Zip together multiple series to create a new series.
    * Preserves the index of the first series.
    *
    * @param series - An iterable of series to be zipped.
    * @param zipper - Selector function that produces a new series based on the input series.
    *
    * @returns Returns a single series zipped from multiple input series.
    */
    Series.zip = function (series, zipper) {
        var input = Array.from(series);
        if (input.length === 0) {
            return new Series();
        }
        var firstSeries = input[0];
        if (firstSeries.none()) {
            return new Series();
        }
        return new Series(function () {
            var firstSeriesUpCast = firstSeries;
            var upcast = input; // Upcast so that we can access private index, values and pairs.
            return {
                index: firstSeriesUpCast.getContent().index,
                values: new zip_iterable_1.ZipIterable(upcast.map(function (s) { return s.getContent().values; }), zipper),
            };
        });
    };
    Series.prototype.zip = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selector = args[args.length - 1];
        var input = [this].concat(args.slice(0, args.length - 1));
        return Series.zip(input, function (values) { return selector.apply(void 0, __spread(values)); });
    };
    /**
     * Sorts the series in ascending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new series that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderBy(value => value);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderBy(value => value.NestedValue);
     * </pre>
     */
    Series.prototype.orderBy = function (selector) {
        var content = this.getContent();
        return new OrderedSeries({
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Ascending,
            parent: null,
        });
    };
    /**
     * Sorts the series in descending order by a value defined by the user-defined selector function.
     *
     * @param selector User-defined selector function that selects the value to sort by.
     *
     * @return Returns a new series that has been ordered accorrding to the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderByDescending(value => value);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const orderedSeries = series.orderByDescending(value => value.NestedValue);
     * </pre>
     */
    Series.prototype.orderByDescending = function (selector) {
        var content = this.getContent();
        return new OrderedSeries({
            values: content.values,
            pairs: content.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Descending,
            parent: null,
        });
    };
    /**
     * Creates a new series by merging two input dataframes.
     * The resulting series contains the union of value from the two input series.
     * These are the unique combination of values in both series.
     * This is basically a concatenation and then elimination of duplicates.
     *
     * @param other The other series to merge.
     * @param [selector] Optional user-defined selector function that selects the value to compare to determine distinctness.
     *
     * @return Returns the union of the two series.
     *
     * @example
     * <pre>
     *
     * const seriesA = ...
     * const seriesB = ...
     * const merged = seriesA.union(seriesB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records that may contain the same
     * // customer record in each set. This is basically a concatenation
     * // of the series and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA.union(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     *
     *
     * @example
     * <pre>
     *
     * // Note that you can achieve the exact same result as the previous
     * // example by doing a {@link Series.concat) and {@link Series.distinct}
     * // of the input series and then an elimination of any duplicate records
     * // that result.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const mergedCustomerRecords = customerRecordsA
     *      .concat(customerRecordsB)
     *      .distinct(customerRecord => customerRecord.CustomerId);
     * </pre>
     *
     */
    Series.prototype.union = function (other, selector) {
        if (selector) {
            if (!utils_1.isFunction(selector))
                throw new Error("Expected optional 'selector' parameter to 'Series.union' to be a selector function.");
        }
        return this.concat(other).distinct(selector);
    };
    ;
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains the intersection of values from the two input series.
     * These are only the values that appear in both series.
     *
     * @param inner The inner series to merge (the series you call the function on is the 'outer' series).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer series that is used to match the two series.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner series that is used to match the two series.
     *
     * @return Returns a new series that contains the intersection of values from the two input series.
     *
     * @example
     * <pre>
     *
     * const seriesA = ...
     * const seriesB = ...
     * const mergedDf = seriesA.intersection(seriesB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Merge two sets of customer records to find only the
     * // customers that appears in both.
     * const customerRecordsA = ...
     * const customerRecordsB = ...
     * const intersectionOfCustomerRecords = customerRecordsA.intersection(
     *      customerRecordsB,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     */
    Series.prototype.intersection = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!utils_1.isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'Series.intersection' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!utils_1.isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'Series.intersection' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .any();
        });
    };
    ;
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only the values from the 1st series that don't appear in the 2nd series.
     * This is essentially subtracting the values from the 2nd series from the 1st and creating a new series with the remaining values.
     *
     * @param inner The inner series to merge (the series you call the function on is the 'outer' series).
     * @param [outerSelector] Optional user-defined selector function that selects the key from the outer series that is used to match the two series.
     * @param [innerSelector] Optional user-defined selector function that selects the key from the inner series that is used to match the two series.
     *
     * @return Returns a new series that contains only the values from the 1st series that don't appear in the 2nd series.
     *
     * @example
     * <pre>
     *
     * const seriesA = ...
     * const seriesB = ...
     * const remainingDf = seriesA.except(seriesB);
     * </pre>
     *
     * @example
     * <pre>
     *
     * // Find the list of customers haven't bought anything recently.
     * const allCustomers = ... list of all customers ...
     * const recentCustomers = ... list of customers who have purchased recently ...
     * const remainingCustomers = allCustomers.except(
     *      recentCustomers,
     *      customerRecord => customerRecord.CustomerId
     * );
     * </pre>
     */
    Series.prototype.except = function (inner, outerSelector, innerSelector) {
        if (outerSelector) {
            if (!utils_1.isFunction(outerSelector))
                throw new Error("Expected optional 'outerSelector' parameter to 'Series.except' to be a function.");
        }
        else {
            outerSelector = function (value) { return value; };
        }
        if (innerSelector) {
            if (!utils_1.isFunction(innerSelector))
                throw new Error("Expected optional 'innerSelector' parameter to 'Series.except' to be a function.");
        }
        else {
            innerSelector = function (value) { return value; };
        }
        var outer = this;
        return outer.where(function (outerValue) {
            var outerKey = outerSelector(outerValue);
            return inner
                .where(function (innerValue) { return outerKey === innerSelector(innerValue); })
                .none();
        });
    };
    ;
    /**
      * Creates a new series by merging two input series.
      * The resulting dataframe contains only those value that have matching keys in both input series.
      *
      * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
      * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
      * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
      * @param resultSelector User-defined function that merges outer and inner values.
      *
      * @return Returns the new merged series.
      *
      * @example
      * <pre>
      *
      * // Join together two sets of customers to find those
      * // that have bought both product A and product B.
      * const customerWhoBoughtProductA = ...
      * const customerWhoBoughtProductB = ...
      * const customersWhoBoughtBothProductsDf = customerWhoBoughtProductA.join(
      *          customerWhoBoughtProductB,
      *          customerA => customerA.CustomerId, // Join key.
      *          customerB => customerB.CustomerId, // Join key.
      *          (customerA, customerB) => {
      *              return {
      *                  // ... merge the results ...
      *              };
      *          }
      *      );
      * </pre>
      */
    Series.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.join' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.join' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.join' to be a selector function.");
        var outer = this;
        return new Series(function () {
            var innerMap = inner
                .groupBy(innerKeySelector)
                .toObject(function (group) { return innerKeySelector(group.first()); }, function (group) { return group; });
            var outerContent = outer.getContent();
            var output = [];
            try {
                for (var outer_1 = __values(outer), outer_1_1 = outer_1.next(); !outer_1_1.done; outer_1_1 = outer_1.next()) {
                    var outerValue = outer_1_1.value;
                    var outerKey = outerKeySelector(outerValue);
                    var innerGroup = innerMap[outerKey];
                    if (innerGroup) {
                        try {
                            for (var innerGroup_1 = __values(innerGroup), innerGroup_1_1 = innerGroup_1.next(); !innerGroup_1_1.done; innerGroup_1_1 = innerGroup_1.next()) {
                                var innerValue = innerGroup_1_1.value;
                                output.push(resultSelector(outerValue, innerValue));
                            }
                        }
                        catch (e_18_1) { e_18 = { error: e_18_1 }; }
                        finally {
                            try {
                                if (innerGroup_1_1 && !innerGroup_1_1.done && (_a = innerGroup_1.return)) _a.call(innerGroup_1);
                            }
                            finally { if (e_18) throw e_18.error; }
                        }
                    }
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) _b.call(outer_1);
                }
                finally { if (e_19) throw e_19.error; }
            }
            return {
                values: output
            };
            var e_19, _b, e_18, _a;
        });
    };
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only those values that are only present in or or the other of the series, not both.
     *
     * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged series.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either product A or product B, not not both.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const customersWhoBoughtEitherProductButNotBothDf = customerWhoBoughtProductA.joinOuter(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    Series.prototype.joinOuter = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.joinOuter' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.joinOuter' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.joinOuter' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the results in the inner that are not in the outer.
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .concat(innerResult)
            .resetIndex();
    };
    ;
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only those values that are present either in both series or only in the outer (left) series.
     *
     * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged series.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product A or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterLeft(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    Series.prototype.joinOuterLeft = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.joinOuterLeft' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.joinOuterLeft' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.joinOuterLeft' to be a selector function.");
        // Get the results in the outer that are not in the inner.
        var outer = this;
        var outerResult = outer.except(inner, outerKeySelector, innerKeySelector)
            .select(function (outer) { return resultSelector(outer, null); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return outerResult
            .concat(intersectionResults)
            .resetIndex();
    };
    ;
    /**
     * Creates a new series by merging two input series.
     * The resulting series contains only those values that are present either in both series or only in the inner (right) series.
     *
     * @param inner The 'inner' series to join (the series you are callling the function on is the 'outer' series).
     * @param outerKeySelector User-defined selector function that chooses the join key from the outer series.
     * @param innerKeySelector User-defined selector function that chooses the join key from the inner series.
     * @param resultSelector User-defined function that merges outer and inner values.
     *
     * Implementation from here:
     *
     * 	http://blogs.geniuscode.net/RyanDHatch/?p=116
     *
     * @return Returns the new merged series.
     *
     * @example
     * <pre>
     *
     * // Join together two sets of customers to find those
     * // that have bought either just product B or both product A and product B.
     * const customerWhoBoughtProductA = ...
     * const customerWhoBoughtProductB = ...
     * const boughtJustAorAandB = customerWhoBoughtProductA.joinOuterRight(
     *          customerWhoBoughtProductB,
     *          customerA => customerA.CustomerId, // Join key.
     *          customerB => customerB.CustomerId, // Join key.
     *          (customerA, customerB) => {
     *              return {
     *                  // ... merge the results ...
     *              };
     *          }
     *      );
     * </pre>
     */
    Series.prototype.joinOuterRight = function (inner, outerKeySelector, innerKeySelector, resultSelector) {
        if (!utils_1.isFunction(outerKeySelector))
            throw new Error("Expected 'outerKeySelector' parameter of 'Series.joinOuterRight' to be a selector function.");
        if (!utils_1.isFunction(innerKeySelector))
            throw new Error("Expected 'innerKeySelector' parameter of 'Series.joinOuterRight' to be a selector function.");
        if (!utils_1.isFunction(resultSelector))
            throw new Error("Expected 'resultSelector' parameter of 'Series.joinOuterRight' to be a selector function.");
        // Get the results in the inner that are not in the outer.
        var outer = this;
        var innerResult = inner.except(outer, innerKeySelector, outerKeySelector)
            .select(function (inner) { return resultSelector(null, inner); })
            .resetIndex();
        // Get the intersection of results between inner and outer.
        var intersectionResults = outer.join(inner, outerKeySelector, innerKeySelector, resultSelector);
        return intersectionResults
            .concat(innerResult)
            .resetIndex();
    };
    /**
     * Produces a new series with all string values truncated to the requested maximum length.
     *
     * @param maxLength - The maximum length of the string values after truncation.
     *
     * @returns Returns a new series with strings that are truncated to the specified maximum length.
     *
     * @example
     * <pre>
     *
     * const truncated = series.truncateStrings(10); // Truncate all string values to max length of 10 characters.
     * </pre>
     */
    Series.prototype.truncateStrings = function (maxLength) {
        if (!utils_1.isNumber(maxLength))
            throw new Error("Expected 'maxLength' parameter to 'Series.truncateStrings' to be a number.");
        return this.select(function (value) {
            if (utils_1.isString(value)) {
                if (value.length > maxLength) {
                    return value.substring(0, maxLength);
                }
            }
            return value;
        });
    };
    ;
    /**
     * Insert a pair at the start of the series.
     * Doesn't modify the original series! The returned series is entirely new and contains values from the original series plus the inserted pair.
     *
     * @param pair The index/value pair to insert.
     *
     * @return Returns a new series with the specified pair inserted.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to insert ...
     * const insertedSeries = series.insertPair([newIndex, newRows]);
     * </pre>
     */
    Series.prototype.insertPair = function (pair) {
        if (!utils_1.isArray(pair))
            throw new Error("Expected 'pair' parameter to 'Series.insertPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'Series.insertPair' to be an array with two elements. The first element is the index, the second is the value.");
        return (new Series({ pairs: [pair] })).concat(this);
    };
    /**
     * Append a pair to the end of a series.
     * Doesn't modify the original series! The returned series is entirely new and contains values from the original series plus the appended pair.
     *
     * @param pair The index/value pair to append.
     *
     * @return Returns a new series with the specified pair appended.
     *
     * @example
     * <pre>
     *
     * const newIndex = ... index of the new row ...
     * const newRow = ... the new data row to append ...
     * const appendedSeries = series.appendPair([newIndex, newRows]);
     * </pre>
     */
    Series.prototype.appendPair = function (pair) {
        if (!utils_1.isArray(pair))
            throw new Error("Expected 'pair' parameter to 'Series.appendPair' to be an array.");
        if (pair.length !== 2)
            throw new Error("Expected 'pair' parameter to 'Series.appendPair' to be an array with two elements. The first element is the index, the second is the value.");
        return this.concat(new Series({ pairs: [pair] }));
    };
    /**
     * Fill gaps in a series.
     *
     * @param comparer User-defined comparer function that is passed pairA and pairB, two consecutive values, return truthy if there is a gap between the value, or falsey if there is no gap.
     * @param generator User-defined generator function that is passed pairA and pairB, two consecutive values, returns an array of pairs that fills the gap between the values.
     *
     * @return Returns a new series with gaps filled in.
     *
     * @example
     * <pre>
     *
     *   var sequenceWithGaps = ...
     *
     *  // Predicate that determines if there is a gap.
     *  var gapExists = (pairA, pairB) => {
     *      // Returns true if there is a gap.
     *      return true;
     *  };
     *
     *  // Generator function that produces new rows to fill the game.
     *  var gapFiller = (pairA, pairB) => {
     *      // Create an array of index, value pairs that fill the gaps between pairA and pairB.
     *      return [
     *          newPair1,
     *          newPair2,
     *          newPair3,
     *      ];
     *  };
     *
     *  var sequenceWithoutGaps = sequenceWithGaps.fillGaps(gapExists, gapFiller);
     * </pre>
     */
    Series.prototype.fillGaps = function (comparer, generator) {
        if (!utils_1.isFunction(comparer))
            throw new Error("Expected 'comparer' parameter to 'Series.fillGaps' to be a comparer function that compares two values and returns a boolean.");
        if (!utils_1.isFunction(generator))
            throw new Error("Expected 'generator' parameter to 'Series.fillGaps' to be a generator function that takes two values and returns an array of generated pairs to span the gap.");
        return this.rollingWindow(2)
            .selectMany(function (window) {
            var pairs = window.toPairs();
            var pairA = pairs[0];
            var pairB = pairs[1];
            if (!comparer(pairA, pairB)) {
                return [pairA];
            }
            var generatedRows = generator(pairA, pairB);
            if (!utils_1.isArray(generatedRows))
                throw new Error("Expected return from 'generator' parameter to 'Series.fillGaps' to be an array of pairs, instead got a " + typeof (generatedRows));
            return [pairA].concat(generatedRows);
        })
            .withIndex(function (pair) { return pair[0]; })
            .select(function (pair) { return pair[1]; })
            .concat(this.tail(1));
    };
    /**
     * Returns the specified default series if the input series is empty.
     *
     * @param defaultSequence Default series to return if the input series is empty.
     *
     * @return Returns 'defaultSequence' if the input series is empty.
     *
     * @example
     * <pre>
     *
     * const emptySeries = new Series();
     * const defaultSeries = new Series([ 1, 2, 3 ]);
     * expect(emptyDataFrame.defaultIfEmpty(defaultSeries)).to.eql(defaultSeries);
     * </pre>
     *
     * @example
     * <pre>
     *
     * const nonEmptySeries = new Series([ 100 ]);
     * const defaultSeries = new Series([ 1, 2, 3 ]);
     * expect(nonEmptySeries.defaultIfEmpty(defaultSeries)).to.eql(nonEmptySeries);
     * </pre>
     */
    Series.prototype.defaultIfEmpty = function (defaultSequence) {
        if (this.none()) {
            if (defaultSequence instanceof Series) {
                return defaultSequence;
            }
            else if (utils_1.isArray(defaultSequence)) {
                return new Series(defaultSequence);
            }
            else {
                throw new Error("Expected 'defaultSequence' parameter to 'Series.defaultIfEmpty' to be an array or a series.");
            }
        }
        else {
            return this;
        }
    };
    /**
     * Detect the the frequency of the types of the values in the series.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a {@link DataFrame} with rows that confirm to {@link ITypeFrequency} that describes the data types contained in the original series.
     *
     * @example
     * <pre>
     *
     * const dataTypes = series.detectTypes();
     * console.log(dataTypes.toString());
     * </pre>
     */
    Series.prototype.detectTypes = function () {
        var _this = this;
        return new dataframe_1.DataFrame(function () {
            var totalValues = _this.count();
            var typeFrequencies = _this.select(function (value) {
                var valueType = typeof (value);
                if (valueType === "object") {
                    if (utils_1.isDate(value)) {
                        valueType = "date";
                    }
                }
                return valueType;
            })
                .aggregate({}, function (accumulated, valueType) {
                var typeInfo = accumulated[valueType];
                if (!typeInfo) {
                    typeInfo = {
                        count: 0
                    };
                    accumulated[valueType] = typeInfo;
                }
                ++typeInfo.count;
                return accumulated;
            });
            return {
                columnNames: ["Type", "Frequency"],
                rows: Object.keys(typeFrequencies)
                    .map(function (valueType) {
                    return [
                        valueType,
                        (typeFrequencies[valueType].count / totalValues) * 100
                    ];
                })
            };
        });
    };
    /**
     * Detect the frequency of the values in the series.
     * This is a good way to understand the shape of your data.
     *
     * @return Returns a {@link DataFrame} with rows that conform to {@link IValueFrequency} that describes the values contained in the original series.
     *
     * @example
     * <pre>
     *
     * const dataValues = series.detectValues();
     * console.log(dataValues.toString());
     * </pre>
     */
    Series.prototype.detectValues = function () {
        var _this = this;
        return new dataframe_1.DataFrame(function () {
            var totalValues = _this.count();
            var valueFrequencies = _this.aggregate(new Map(), function (accumulated, value) {
                var valueInfo = accumulated.get(value);
                if (!valueInfo) {
                    valueInfo = {
                        count: 0,
                        value: value,
                    };
                    accumulated.set(value, valueInfo);
                }
                ++valueInfo.count;
                return accumulated;
            });
            return {
                columnNames: ["Value", "Frequency"],
                rows: Array.from(valueFrequencies.keys())
                    .map(function (value) {
                    var valueInfo = valueFrequencies.get(value);
                    return [
                        valueInfo.value,
                        (valueInfo.count / totalValues) * 100
                    ];
                }),
            };
        });
    };
    /**
     * Organise all values in the series into the specified number of buckets.
     * Assumes that the series is a series of numbers.
     *
     * @param numBuckets - The number of buckets to create.
     *
     * @returns Returns a dataframe containing bucketed values. The input values are divided up into these buckets.
     *
     * @example
     * <pre>
     *
     * const buckets = series.bucket(20); // Distribute values into 20 evenly spaced buckets.
     * console.log(buckets.toString());
     * </pre>
     */
    Series.prototype.bucket = function (numBuckets) {
        if (!utils_1.isNumber(numBuckets)) {
            throw new Error("Expected 'numBuckets' parameter to 'Series.bucket' to be a number.");
        }
        if (this.none()) {
            return new dataframe_1.DataFrame();
        }
        var numberSeries = this;
        var min = numberSeries.min();
        var max = numberSeries.max();
        var range = max - min;
        var width = range / (numBuckets - 1);
        return numberSeries.select(function (v) {
            var bucket = Math.floor((v - min) / width);
            var bucketMin = (bucket * width) + min;
            return {
                Value: v,
                Bucket: bucket,
                Min: bucketMin,
                Mid: bucketMin + (width * 0.5),
                Max: bucketMin + width,
            };
        })
            .inflate();
    };
    /***
     * Allows the series to be queried to confirm that it is actually a series.
     * Used from JavaScript to tell the difference between a Series and a DataFrame.
     *
     * @return Returns the string "series".
     */
    Series.prototype.getTypeCode = function () {
        return "series";
    };
    Series.defaultCountIterable = new count_iterable_1.CountIterable();
    Series.defaultEmptyIterable = new empty_iterable_1.EmptyIterable();
    return Series;
}());
exports.Series = Series;
/**
 * @hidden
 * A series that has been ordered.
 */
var OrderedSeries = /** @class */ (function (_super) {
    __extends(OrderedSeries, _super);
    function OrderedSeries(config) {
        var _this = this;
        var valueSortSpecs = [];
        var pairSortSpecs = [];
        var sortLevel = 0;
        var parent = config.parent;
        while (parent !== null) {
            var parentConfig = parent.config;
            valueSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, parentConfig.selector, parentConfig.direction));
            pairSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, OrderedSeries.makePairsSelector(parentConfig.selector), parentConfig.direction));
            ++sortLevel;
            parent = parentConfig.parent;
        }
        valueSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, config.selector, config.direction));
        pairSortSpecs.push(OrderedSeries.makeSortSpec(sortLevel, OrderedSeries.makePairsSelector(config.selector), config.direction));
        _this = _super.call(this, {
            values: new ordered_iterable_1.OrderedIterable(config.values, valueSortSpecs),
            pairs: new ordered_iterable_1.OrderedIterable(config.pairs, pairSortSpecs)
        }) || this;
        _this.config = config;
        return _this;
    }
    //
    // Helper function to create a sort spec.
    //
    OrderedSeries.makeSortSpec = function (sortLevel, selector, direction) {
        return { sortLevel: sortLevel, selector: selector, direction: direction };
    };
    //
    // Helper function to make a sort selector for pairs, this captures the parent correct when generating the closure.
    //
    OrderedSeries.makePairsSelector = function (selector) {
        return function (pair, index) { return selector(pair[1], index); };
    };
    /**
     * Applys additional sorting (ascending) to an already sorted series.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new series has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from least to most).
     * const ordered = sales.orderBy(sale => sale.SalesPerson).thenBy(sale => sale.Amount);
     * </pre>
     */
    OrderedSeries.prototype.thenBy = function (selector) {
        return new OrderedSeries({
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Ascending,
            parent: this,
        });
    };
    /**
     * Applys additional sorting (descending) to an already sorted series.
     *
     * @param selector User-defined selector that selects the additional value to sort by.
     *
     * @return Returns a new series has been additionally sorted by the value chosen by the selector function.
     *
     * @example
     * <pre>
     *
     * // Order sales by salesperson and then by amount (from most to least).
     * const ordered = sales.orderBy(sale => sale.SalesPerson).thenByDescending(sale => sale.Amount);
     * </pre>
     */
    OrderedSeries.prototype.thenByDescending = function (selector) {
        return new OrderedSeries({
            values: this.config.values,
            pairs: this.config.pairs,
            selector: selector,
            direction: ordered_iterable_1.Direction.Descending,
            parent: this
        });
    };
    return OrderedSeries;
}(Series));

},{"..":3,"./dataframe":4,"./index":5,"./iterables/concat-iterable":7,"./iterables/count-iterable":8,"./iterables/distinct-iterable":13,"./iterables/empty-iterable":14,"./iterables/extract-element-iterable":15,"./iterables/multi-iterable":16,"./iterables/ordered-iterable":17,"./iterables/reverse-iterable":18,"./iterables/select-iterable":19,"./iterables/select-many-iterable":20,"./iterables/series-rolling-window-iterable":21,"./iterables/series-variable-window-iterable":22,"./iterables/series-window-iterable":23,"./iterables/skip-iterable":24,"./iterables/skip-while-iterable":25,"./iterables/take-iterable":26,"./iterables/take-while-iterable":27,"./iterables/where-iterable":28,"./iterables/zip-iterable":29,"./utils":54,"dayjs":56,"dayjs/plugin/customParseFormat":57,"easy-table":59,"numeral":60}],54:[function(require,module,exports){
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var typy_1 = __importDefault(require("typy"));
//
// Various shared utility functions.
//
function mapIterable(items, mapFn) {
    var iterator, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                iterator = items[Symbol.iterator]();
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                result = iterator.next();
                if (result.done) {
                    return [3 /*break*/, 3];
                }
                return [4 /*yield*/, mapFn(result.value)];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
exports.mapIterable = mapIterable;
//
// Helper function to only return distinct items.
//
function makeDistinct(items, selector) {
    var set = {};
    var output = [];
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            var key = selector && selector(item) || item;
            if (!set[key]) {
                // Haven't yet seen this key.
                set[key] = true;
                output.push(item);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output;
    var e_1, _a;
}
exports.makeDistinct = makeDistinct;
//
// Helper function to map an array of objects.
//
function toMap(items, keySelector, valueSelector) {
    var output = {};
    try {
        for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
            var item = items_2_1.value;
            var key = keySelector(item);
            output[key] = valueSelector(item);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return output;
    var e_2, _a;
}
exports.toMap = toMap;
//
// Helper function to map an array of objects.
//
function toMap2(items, keySelector, valueSelector) {
    var output = new Map();
    try {
        for (var items_3 = __values(items), items_3_1 = items_3.next(); !items_3_1.done; items_3_1 = items_3.next()) {
            var item = items_3_1.value;
            output.set(keySelector(item), valueSelector(item));
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (items_3_1 && !items_3_1.done && (_a = items_3.return)) _a.call(items_3);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return output;
    var e_3, _a;
}
exports.toMap2 = toMap2;
//
// Determine the type of a value.
//
function determineType(value) {
    if (value === undefined) {
        return "undefined";
    }
    else if (isNumber(value)) {
        return "number";
    }
    else if (isString(value)) {
        return "string";
    }
    else if (value instanceof Date) {
        return "date";
    }
    else if (isBoolean(value)) {
        return "boolean";
    }
    else {
        return "unsupported";
    }
}
exports.determineType = determineType;
function isObject(v) {
    return typy_1.default(v).isObject && !isDate(v);
}
exports.isObject = isObject;
function isFunction(v) {
    return typy_1.default(v).isFunction;
}
exports.isFunction = isFunction;
function isString(v) {
    return typy_1.default(v).isString;
}
exports.isString = isString;
function isDate(v) {
    return Object.prototype.toString.call(v) === "[object Date]";
}
exports.isDate = isDate;
function isBoolean(v) {
    return typy_1.default(v).isBoolean;
}
exports.isBoolean = isBoolean;
function isNumber(v) {
    return typy_1.default(v).isNumber;
}
exports.isNumber = isNumber;
function isArray(v) {
    return typy_1.default(v).isArray;
}
exports.isArray = isArray;
function isUndefined(v) {
    return v === undefined;
}
exports.isUndefined = isUndefined;

},{"typy":62}],55:[function(require,module,exports){
/*@license
	Papa Parse
	v4.4.0
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	/* globals define */
	if (typeof define === 'function' && define.amd)
	{
		// AMD. Register as an anonymous module.
		define([], factory);
	}
	else if (typeof module === 'object' && typeof exports !== 'undefined')
	{
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
	else
	{
		// Browser globals (root is window)
		root.Papa = factory();
	}
}(this, function()
{
	'use strict';

	var global = (function() {
		// alternative method, similar to `Function('return this')()`
		// but without using `eval` (which is disabled when
		// using Content Security Policy).

		if (typeof self !== 'undefined') { return self; }
		if (typeof window !== 'undefined') { return window; }
		if (typeof global !== 'undefined') { return global; }

		// When running tests none of the above have been defined
		return {};
	})();


	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = '\ufeff';
	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;
	Papa.ReadableStreamStreamer = ReadableStreamStreamer;

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
								&& $(this).attr('type').toLowerCase() === 'file'
								&& global.FileReader;

				if (!supported || !this.files || this.files.length === 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length === 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action === 'abort')
						{
							error('AbortError', f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned === 'skip')
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		};
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function() {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};
		var dynamicTyping = _config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			_config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		_config.dynamicTyping = dynamicTyping;

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
		{
			streamer = new ReadableStreamStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  _input.data[0] instanceof Array
						? _input.fields
						: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length === 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;

			if (typeof _config.quoteChar === 'string')
				_quoteChar = _config.quoteChar;

			if (typeof _config.header === 'boolean')
				_writeHeader = _config.header;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader && _writeHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			str = str.toString().replace(quoteCharRegex, _quoteChar + _quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) === ' '
							|| str.charAt(str.length - 1) === ' ';

			return needsQuotes ? _quoteChar + str + _quoteChar : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._finished = false;
		this._completed = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk, isFakeChunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = '';

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

			if (this._handle.paused() || this._handle.aborted())
				return;

			var lastIndex = results.meta.cursor;

			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk) && !isFakeChunk)
			{
				this._config.chunk(results, this._handle);
				if (this._handle.paused() || this._handle.aborted())
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
				this._config.complete(this._completeResults, this._input);
				this._completed = true;
			}

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();

			if (this._config.withCredentials)
			{
				xhr.withCredentials = this._config.withCredentials;
			}

			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open('GET', this._input, !IS_WORKER);
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders)
			{
				var headers = this._config.downloadRequestHeaders;

				for (var headerName in headers)
				{
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader('Range', 'bytes=' + this._start + '-' + end);
				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status === 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		};

		this._chunkLoaded = function()
		{
			if (xhr.readyState !== 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		};

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(new Error(errorText));
		};

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader('Content-Range');
			if (contentRange === null) { // no content range, then finish!
				return -1;
			}
			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		};

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		};

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		};

		this._chunkError = function()
		{
			this._sendError(reader.error);
		};

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var remaining;
		this.stream = function(s)
		{
			remaining = s;
			return this._nextChunk();
		};
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		};
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;


	function ReadableStreamStreamer(config)
	{
		config = config || {};

		ChunkStreamer.call(this, config);

		var queue = [];
		var parseOnData = true;
		var streamHasEnded = false;

		this.pause = function()
		{
			ChunkStreamer.prototype.pause.apply(this, arguments);
			this._input.pause();
		};

		this.resume = function()
		{
			ChunkStreamer.prototype.resume.apply(this, arguments);
			this._input.resume();
		};

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		};

		this._checkIsFinished = function()
		{
			if (streamHasEnded && queue.length === 1) {
				this._finished = true;
			}
		};

		this._nextChunk = function()
		{
			this._checkIsFinished();
			if (queue.length)
			{
				this.parseChunk(queue.shift());
			}
			else
			{
				parseOnData = true;
			}
		};

		this._streamData = bindFunction(function(chunk)
		{
			try
			{
				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

				if (parseOnData)
				{
					parseOnData = false;
					this._checkIsFinished();
					this.parseChunk(queue.shift());
				}
			}
			catch (error)
			{
				this._streamError(error);
			}
		}, this);

		this._streamError = bindFunction(function(error)
		{
			this._streamCleanUp();
			this._sendError(error);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			streamHasEnded = true;
			this._streamData('');
		}, this);

		this._streamCleanUp = bindFunction(function()
		{
			this._input.removeListener('data', this._streamData);
			this._input.removeListener('end', this._streamEnd);
			this._input.removeListener('error', this._streamError);
		}, this);
	}
	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;	// Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length === 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}
			else if(isFunction(_config.delimiter))
			{
				_config.delimiter = _config.delimiter(input);
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input, true);
		};

		this.aborted = function()
		{
			return _aborted;
		};

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = '';
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \'' + Papa.DefaultDelimiter + '\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length === 1 && _results.data[i][0] === '')
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length === 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
				{
					var header = _results.data[i][j];

					if (_config.trimHeaders) {
						header = header.trim();
					}

					_fields.push(header);
				}
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else if(FLOAT.test(value)) {
					return parseFloat(value);
				}
				else {
					return (value === '' ? null : value);
				}
			}
			return value;
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				var j;
				for (j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					value = parseDynamic(field, value);

					if (field === '__parsed_extra')
					{
						row[field] = row[field] || [];
						row[field].push(value);
					}
					else
						row[field] = value;
				}

				_results.data[i] = row;

				if (_config.header)
				{
					if (j > _fields.length)
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
						emptyLinesCount++;
						continue;
					}
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= (preview.data.length - emptyLinesCount);

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			};
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024 * 1024);	// max length 1 MB

			var r = input.split('\r');

			var n = input.split('\n');

			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

			if (r.length === 1 || nAppearsFirst)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] === '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;
		var quoteChar;
		/** Allows for no quoteChar by setting quoteChar to undefined in config */
		if (config.quoteChar === undefined) {
			quoteChar = '"';
		} else {
			quoteChar = config.quoteChar;
		}
		var escapeChar = quoteChar;
		if (config.escapeChar !== undefined) {
			escapeChar = config.escapeChar;
		}

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ',';

		// Comment character must be valid
		if (comments === delim)
			throw 'Comment character same as delimiter';
		else if (comments === true)
			comments = '#';
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline !== '\n' && newline !== '\r' && newline !== '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw 'Input must be a string';

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = isFunction(step);

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) === comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);
			var quoteCharRegex = new RegExp(escapeChar.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&') + quoteChar, 'g');
			var quoteSearch;

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						quoteSearch = input.indexOf(quoteChar, quoteSearch + 1);

						//No other quotes are found - no other delimiters
						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: 'Quotes',
									code: 'MissingQuotes',
									message: 'Quoted field unterminated',
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						// Closing quote at EOF
						if (quoteSearch === inputLen - 1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						// If the quote character is the escape character, then check if the next character is the escape character
						if (quoteChar === escapeChar &&  input[quoteSearch + 1] === escapeChar)
						{
							quoteSearch++;
							continue;
						}

						// If the quote character is not the escape character, then check if the previous character was the escape character
						if (quoteChar !== escapeChar && quoteSearch !== 0 && input[quoteSearch - 1] === escapeChar)
						{
							continue;
						}

						var spacesBetweenQuoteAndDelimiter = extraSpaces(nextDelim);

						// Closing quote followed by delimiter or 'unnecessary steps + delimiter'
						if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						var spacesBetweenQuoteAndNewLine = extraSpaces(nextNewline);

						// Closing quote followed by newline or 'unnecessary spaces + newLine'
						if (input.substr(quoteSearch + 1 + spacesBetweenQuoteAndNewLine, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}

							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}


						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
						errors.push({
							type: 'Quotes',
							code: 'InvalidQuotes',
							message: 'Trailing quote on quoted field is malformed',
							row: data.length,	// row has yet to be inserted
							index: cursor
						});

						quoteSearch++;
						continue;

					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline === -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
             * checks if there are extra spaces after closing quote and given index without any text
             * if Yes, returns the number of spaces
             */
			function extraSpaces(index) {
				var spaceLength = 0;
				if (index !== -1) {
					var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
					if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === '') {
						spaceLength = textBetweenClosingQuoteAndIndex.length;
					}
				}
				return spaceLength;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [];
				errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw 'Not implemented.';
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}

	return Papa;
}));

},{}],56:[function(require,module,exports){
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.dayjs=n()}(this,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},d={s:c,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),i=e%60;return(n<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,u),i=n-r<0,s=t.clone().add(e+(i?-1:1),u);return Number(-(e+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,h:r,m:e,s:n,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,n,e){var r;if(!t)return null;if("string"==typeof t)m[t]&&(r=t),n&&(m[t]=n,r=t);else{var i=t.name;m[i]=t,r=i}return e||(l=r),r},g=function(t,n,e){if(y(t))return t.clone();var r=n?"string"==typeof n?{format:n,pl:e}:n:{};return r.date=t,new v(r)},D=d;D.l=M,D.i=y,D.w=function(t,n){return g(t,{locale:n.$L,utc:n.$u})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0)||l,this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(D.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(n)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,n){var e=g(t);return this.startOf(n)<=e&&e<=this.endOf(n)},d.isAfter=function(t,n){return g(t)<this.startOf(n)},d.isBefore=function(t,n){return this.endOf(n)<g(t)},d.$g=function(t,n,e){return D.u(t)?this[n]:this.set(e,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",e)},d.second=function(t){return this.$g(t,"$s",n)},d.millisecond=function(n){return this.$g(n,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,n){var e=D.w(h.$u?Date.UTC(h.$y,n,t):new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return D.w(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case e:return $(M+"Seconds",2);case n:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[e]=c+"Minutes",h[n]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,n){return this.clone().$set(t,n)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(n){var e=g(f);return D.w(e.date(e.date()+Math.round(n*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,l=this.valueOf()+t*$;return D.w(l,this)},d.subtract=function(t,n){return this.add(-1*t,n)},d.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(n,e))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,n,e){var r=t<12?"AM":"PM";return e?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:h[o]||h(this,e),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return e.replace(f,function(t,n){return n||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[e]=m/6e4,c[n]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,n){if(!t)return this.$L;var e=this.clone();return e.$L=M(t,n,!0),e},d.clone=function(){return D.w(this.toDate(),this)},d.toDate=function(){return new Date(this.$d)},d.toJSON=function(){return this.toISOString()},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,n){return t(n,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});

},{}],57:[function(require,module,exports){
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.dayjs_plugin_customParseFormat=n()}(this,function(){"use strict";var t,n=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,e=/\d\d/,r=/\d\d?/,o=/\d*[^\s\d-:/.()]+/;var s=function(t){return function(n){this[t]=+n}},i=[/[+-]\d\d:?\d\d/,function(t){var n,e;(this.zone||(this.zone={})).offset=(n=t.match(/([+-]|\d\d)/g),0===(e=60*n[1]+ +n[2])?0:"+"===n[0]?-e:e)}],a={A:[/[AP]M/,function(t){this.afternoon="PM"===t}],a:[/[ap]m/,function(t){this.afternoon="pm"===t}],S:[/\d/,function(t){this.milliseconds=100*+t}],SS:[e,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[r,s("seconds")],ss:[r,s("seconds")],m:[r,s("minutes")],mm:[r,s("minutes")],H:[r,s("hours")],h:[r,s("hours")],HH:[r,s("hours")],hh:[r,s("hours")],D:[r,s("day")],DD:[e,s("day")],Do:[o,function(n){var e=t.ordinal,r=n.match(/\d+/);if(this.day=r[0],e)for(var o=1;o<=31;o+=1)e(o).replace(/\[|\]/g,"")===n&&(this.day=o)}],M:[r,s("month")],MM:[e,s("month")],MMM:[o,function(n){var e=t,r=e.months,o=e.monthsShort,s=o?o.findIndex(function(t){return t===n}):r.findIndex(function(t){return t.substr(0,3)===n});if(s<0)throw new Error;this.month=s+1}],MMMM:[o,function(n){var e=t.months.indexOf(n);if(e<0)throw new Error;this.month=e+1}],Y:[/[+-]?\d+/,s("year")],YY:[e,function(t){t=+t,this.year=t+(t>68?1900:2e3)}],YYYY:[/\d{4}/,s("year")],Z:i,ZZ:i};var u=function(t,e,r){try{var o=function(t){for(var e=t.match(n),r=e.length,o=0;o<r;o+=1){var s=e[o],i=a[s],u=i&&i[0],f=i&&i[1];e[o]=f?{regex:u,parser:f}:s.replace(/^\[|\]$/g,"")}return function(t){for(var n={},o=0,s=0;o<r;o+=1){var i=e[o];if("string"==typeof i)s+=i.length;else{var a=i.regex,u=i.parser,f=t.substr(s),h=a.exec(f)[0];u.call(n,h),t=t.replace(h,"")}}return function(t){var n=t.afternoon;if(void 0!==n){var e=t.hours;n?e<12&&(t.hours+=12):12===e&&(t.hours=0),delete t.afternoon}}(n),n}}(e)(t),s=o.year,i=o.month,u=o.day,f=o.hours,h=o.minutes,d=o.seconds,c=o.milliseconds,m=o.zone;if(m)return new Date(Date.UTC(s,i-1,u,f||0,h||0,d||0,c||0)+60*m.offset*1e3);var l=new Date,v=s||l.getFullYear(),p=i>0?i-1:l.getMonth(),M=u||l.getDate(),y=f||0,D=h||0,Y=d||0,g=c||0;return r?new Date(Date.UTC(v,p,M,y,D,Y,g)):new Date(v,p,M,y,D,Y,g)}catch(t){return new Date("")}};return function(n,e,r){var o=e.prototype,s=o.parse;o.parse=function(n){var e=n.date,o=n.format,i=n.pl,a=n.utc;this.$u=a,o?(t=i?r.Ls[i]:this.$locale(),this.$d=u(e,o,a),this.init(n)):s.call(this,n)}}});

},{}],58:[function(require,module,exports){
var clone = require('clone');

module.exports = function(options, defaults) {
  options = options || {};

  Object.keys(defaults).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = clone(defaults[key]);
    }
  });

  return options;
};
},{"clone":2}],59:[function(require,module,exports){
var wcwidth

try {
  wcwidth = require('wcwidth')
} catch(e) {}

module.exports = Table

function Table() {
  this.rows = []
  this.row = {__printers : {}}
}

/**
 * Push the current row to the table and start a new one
 *
 * @returns {Table} `this`
 */

Table.prototype.newRow = function() {
  this.rows.push(this.row)
  this.row = {__printers : {}}
  return this
}

/**
 * Write cell in the current row
 *
 * @param {String} col          - Column name
 * @param {Any} val             - Cell value
 * @param {Function} [printer]  - Printer function to format the value
 * @returns {Table} `this`
 */

Table.prototype.cell = function(col, val, printer) {
  this.row[col] = val
  this.row.__printers[col] = printer || string
  return this
}

/**
 * String to separate columns
 */

Table.prototype.separator = '  '

function string(val) {
  return val === undefined ? '' : ''+val
}

function length(str) {
  var s = str.replace(/\u001b\[\d+m/g, '')
  return wcwidth == null ? s.length : wcwidth(s)
}

/**
 * Default printer
 */

Table.string = string

/**
 * Create a printer which right aligns the content by padding with `ch` on the left
 *
 * @param {String} ch
 * @returns {Function}
 */

Table.leftPadder = leftPadder

function leftPadder(ch) {
  return function(val, width) {
    var str = string(val)
    var len = length(str)
    var pad = width > len ? Array(width - len + 1).join(ch) : ''
    return pad + str
  }
}

/**
 * Printer which right aligns the content
 */

var padLeft = Table.padLeft = leftPadder(' ')

/**
 * Create a printer which pads with `ch` on the right
 *
 * @param {String} ch
 * @returns {Function}
 */

Table.rightPadder = rightPadder

function rightPadder(ch) {
  return function padRight(val, width) {
    var str = string(val)
    var len = length(str)
    var pad = width > len ? Array(width - len + 1).join(ch) : ''
    return str + pad
  }
}

var padRight = rightPadder(' ')

/**
 * Create a printer for numbers
 *
 * Will do right alignment and optionally fix the number of digits after decimal point
 *
 * @param {Number} [digits] - Number of digits for fixpoint notation
 * @returns {Function}
 */

Table.number = function(digits) {
  return function(val, width) {
    if (val == null) return ''
    if (typeof val != 'number')
      throw new Error(''+val + ' is not a number')
    var str = digits == null ? val+'' : val.toFixed(digits)
    return padLeft(str, width)
  }
}

function each(row, fn) {
  for(var key in row) {
    if (key == '__printers') continue
    fn(key, row[key])
  }
}

/**
 * Get list of columns in printing order
 *
 * @returns {string[]}
 */

Table.prototype.columns = function() {
  var cols = {}
  for(var i = 0; i < 2; i++) { // do 2 times
    this.rows.forEach(function(row) {
      var idx = 0
      each(row, function(key) {
        idx = Math.max(idx, cols[key] || 0)
        cols[key] = idx
        idx++
      })
    })
  }
  return Object.keys(cols).sort(function(a, b) {
    return cols[a] - cols[b]
  })
}

/**
 * Format just rows, i.e. print the table without headers and totals
 *
 * @returns {String} String representaion of the table
 */

Table.prototype.print = function() {
  var cols = this.columns()
  var separator = this.separator
  var widths = {}
  var out = ''

  // Calc widths
  this.rows.forEach(function(row) {
    each(row, function(key, val) {
      var str = row.__printers[key].call(row, val)
      widths[key] = Math.max(length(str), widths[key] || 0)
    })
  })

  // Now print
  this.rows.forEach(function(row) {
    var line = ''
    cols.forEach(function(key) {
      var width = widths[key]
      var str = row.hasOwnProperty(key)
        ? ''+row.__printers[key].call(row, row[key], width)
        : ''
      line += padRight(str, width) + separator
    })
    line = line.slice(0, -separator.length)
    out += line + '\n'
  })

  return out
}

/**
 * Format the table
 *
 * @returns {String}
 */

Table.prototype.toString = function() {
  var cols = this.columns()
  var out = new Table()

  // copy options
  out.separator = this.separator

  // Write header
  cols.forEach(function(col) {
    out.cell(col, col)
  })
  out.newRow()
  out.pushDelimeter(cols)

  // Write body
  out.rows = out.rows.concat(this.rows)

  // Totals
  if (this.totals && this.rows.length) {
    out.pushDelimeter(cols)
    this.forEachTotal(out.cell.bind(out))
    out.newRow()
  }

  return out.print()
}

/**
 * Push delimeter row to the table (with each cell filled with dashs during printing)
 *
 * @param {String[]} [cols]
 * @returns {Table} `this`
 */

Table.prototype.pushDelimeter = function(cols) {
  cols = cols || this.columns()
  cols.forEach(function(col) {
    this.cell(col, undefined, leftPadder('-'))
  }, this)
  return this.newRow()
}

/**
 * Compute all totals and yield the results to `cb`
 *
 * @param {Function} cb - Callback function with signature `(column, value, printer)`
 */

Table.prototype.forEachTotal = function(cb) {
  for(var key in this.totals) {
    var aggr = this.totals[key]
    var acc = aggr.init
    var len = this.rows.length
    this.rows.forEach(function(row, idx) {
      acc = aggr.reduce.call(row, acc, row[key], idx, len)
    })
    cb(key, acc, aggr.printer)
  }
}

/**
 * Format the table so that each row represents column and each column represents row
 *
 * @param {Object} [opts]
 * @param {String} [ops.separator] - Column separation string
 * @param {Function} [opts.namePrinter] - Printer to format column names
 * @returns {String}
 */

Table.prototype.printTransposed = function(opts) {
  opts = opts || {}
  var out = new Table
  out.separator = opts.separator || this.separator
  this.columns().forEach(function(col) {
    out.cell(0, col, opts.namePrinter)
    this.rows.forEach(function(row, idx) {
      out.cell(idx+1, row[col], row.__printers[col])
    })
    out.newRow()
  }, this)
  return out.print()
}

/**
 * Sort the table
 *
 * @param {Function|string[]} [cmp] - Either compare function or a list of columns to sort on
 * @returns {Table} `this`
 */

Table.prototype.sort = function(cmp) {
  if (typeof cmp == 'function') {
    this.rows.sort(cmp)
    return this
  }

  var keys = Array.isArray(cmp) ? cmp : this.columns()

  var comparators = keys.map(function(key) {
    var order = 'asc'
    var m = /(.*)\|\s*(asc|des)\s*$/.exec(key)
    if (m) {
      key = m[1]
      order = m[2]
    }
    return function (a, b) {
      return order == 'asc'
        ? compare(a[key], b[key])
        : compare(b[key], a[key])
    }
  })

  return this.sort(function(a, b) {
    for (var i = 0; i < comparators.length; i++) {
      var order = comparators[i](a, b)
      if (order != 0) return order
    }
    return 0
  })
}

function compare(a, b) {
  if (a === b) return 0
  if (a === undefined) return 1
  if (b === undefined) return -1
  if (a === null) return 1
  if (b === null) return -1
  if (a > b) return 1
  if (a < b) return -1
  return compare(String(a), String(b))
}

/**
 * Add a total for the column
 *
 * @param {String} col - column name
 * @param {Object} [opts]
 * @param {Function} [opts.reduce = sum] - reduce(acc, val, idx, length) function to compute the total value
 * @param {Function} [opts.printer = padLeft] - Printer to format the total cell
 * @param {Any} [opts.init = 0] - Initial value for reduction
 * @returns {Table} `this`
 */

Table.prototype.total = function(col, opts) {
  opts = opts || {}
  this.totals = this.totals || {}
  this.totals[col] = {
    reduce: opts.reduce || Table.aggr.sum,
    printer: opts.printer || padLeft,
    init: opts.init == null ? 0 : opts.init
  }
  return this
}

/**
 * Predefined helpers for totals
 */

Table.aggr = {}

/**
 * Create a printer which formats the value with `printer`,
 * adds the `prefix` to it and right aligns the whole thing
 *
 * @param {String} prefix
 * @param {Function} printer
 * @returns {printer}
 */

Table.aggr.printer = function(prefix, printer) {
  printer = printer || string
  return function(val, width) {
    return padLeft(prefix + printer(val), width)
  }
}

/**
 * Sum reduction
 */

Table.aggr.sum = function(acc, val) {
  return acc + val
}

/**
 * Average reduction
 */

Table.aggr.avg = function(acc, val, idx, len) {
  acc = acc + val
  return idx + 1 == len ? acc/len : acc
}

/**
 * Print the array or object
 *
 * @param {Array|Object} obj - Object to print
 * @param {Function|Object} [format] - Format options
 * @param {Function} [cb] - Table post processing and formating
 * @returns {String}
 */

Table.print = function(obj, format, cb) {
  var opts = format || {}

  format = typeof format == 'function'
    ? format
    : function(obj, cell) {
      for(var key in obj) {
        if (!obj.hasOwnProperty(key)) continue
        var params = opts[key] || {}
        cell(params.name || key, obj[key], params.printer)
      }
    }

  var t = new Table
  var cell = t.cell.bind(t)

  if (Array.isArray(obj)) {
    cb = cb || function(t) { return t.toString() }
    obj.forEach(function(item) {
      format(item, cell)
      t.newRow()
    })
  } else {
    cb = cb || function(t) { return t.printTransposed({separator: ' : '}) }
    format(obj, cell)
    t.newRow()
  }

  return cb(t)
}

/**
 * Same as `Table.print()` but yields the result to `console.log()`
 */

Table.log = function(obj, format, cb) {
  console.log(Table.print(obj, format, cb))
}

/**
 * Same as `.toString()` but yields the result to `console.log()`
 */

Table.prototype.log = function() {
  console.log(this.toString())
}

},{"wcwidth":66}],60:[function(require,module,exports){
/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.numeral = factory();
    }
}(this, function () {
    /************************************
        Variables
    ************************************/

    var numeral,
        _,
        VERSION = '2.0.6',
        formats = {},
        locales = {},
        defaults = {
            currentLocale: 'en',
            zeroFormat: null,
            nullFormat: null,
            defaultFormat: '0,0',
            scalePercentBy100: true
        },
        options = {
            currentLocale: defaults.currentLocale,
            zeroFormat: defaults.zeroFormat,
            nullFormat: defaults.nullFormat,
            defaultFormat: defaults.defaultFormat,
            scalePercentBy100: defaults.scalePercentBy100
        };


    /************************************
        Constructors
    ************************************/

    // Numeral prototype object
    function Numeral(input, number) {
        this._input = input;

        this._value = number;
    }

    numeral = function(input) {
        var value,
            kind,
            unformatFunction,
            regexp;

        if (numeral.isNumeral(input)) {
            value = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            value = 0;
        } else if (input === null || _.isNaN(input)) {
            value = null;
        } else if (typeof input === 'string') {
            if (options.zeroFormat && input === options.zeroFormat) {
                value = 0;
            } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
                value = null;
            } else {
                for (kind in formats) {
                    regexp = typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;

                    if (regexp && input.match(regexp)) {
                        unformatFunction = formats[kind].unformat;

                        break;
                    }
                }

                unformatFunction = unformatFunction || numeral._.stringToNumber;

                value = unformatFunction(input);
            }
        } else {
            value = Number(input)|| null;
        }

        return new Numeral(input, value);
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function(obj) {
        return obj instanceof Numeral;
    };

    // helper functions
    numeral._ = _ = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function(value, format, roundingFunction) {
            var locale = locales[numeral.options.currentLocale],
                negP = false,
                optDec = false,
                leadingCount = 0,
                abbr = '',
                trillion = 1000000000000,
                billion = 1000000000,
                million = 1000000,
                thousand = 1000,
                decimal = '',
                neg = false,
                abbrForce, // force abbreviation
                abs,
                min,
                max,
                power,
                int,
                precision,
                signed,
                thousands,
                output;

            // make sure we never format a null value
            value = value || 0;

            abs = Math.abs(value);

            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if (numeral._.includes(format, '(')) {
                negP = true;
                format = format.replace(/[\(|\)]/g, '');
            } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
                signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
                format = format.replace(/[\+|\-]/g, '');
            }

            // see if abbreviation is wanted
            if (numeral._.includes(format, 'a')) {
                abbrForce = format.match(/a(k|m|b|t)?/);

                abbrForce = abbrForce ? abbrForce[1] : false;

                // check for space before abbreviation
                if (numeral._.includes(format, ' a')) {
                    abbr = ' ';
                }

                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

                if (abs >= trillion && !abbrForce || abbrForce === 't') {
                    // trillion
                    abbr += locale.abbreviations.trillion;
                    value = value / trillion;
                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
                    // billion
                    abbr += locale.abbreviations.billion;
                    value = value / billion;
                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
                    // million
                    abbr += locale.abbreviations.million;
                    value = value / million;
                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
                    // thousand
                    abbr += locale.abbreviations.thousand;
                    value = value / thousand;
                }
            }

            // check for optional decimals
            if (numeral._.includes(format, '[.]')) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            // break number and format
            int = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');
            leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

            if (precision) {
                if (numeral._.includes(precision, '[')) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    decimal = numeral._.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    decimal = numeral._.toFixed(value, precision.length, roundingFunction);
                }

                int = decimal.split('.')[0];

                if (numeral._.includes(decimal, '.')) {
                    decimal = locale.delimiters.decimal + decimal.split('.')[1];
                } else {
                    decimal = '';
                }

                if (optDec && Number(decimal.slice(1)) === 0) {
                    decimal = '';
                }
            } else {
                int = numeral._.toFixed(value, 0, roundingFunction);
            }

            // check abbreviation again after rounding
            if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
                int = String(Number(int) / 1000);

                switch (abbr) {
                    case locale.abbreviations.thousand:
                        abbr = locale.abbreviations.million;
                        break;
                    case locale.abbreviations.million:
                        abbr = locale.abbreviations.billion;
                        break;
                    case locale.abbreviations.billion:
                        abbr = locale.abbreviations.trillion;
                        break;
                }
            }


            // format number
            if (numeral._.includes(int, '-')) {
                int = int.slice(1);
                neg = true;
            }

            if (int.length < leadingCount) {
                for (var i = leadingCount - int.length; i > 0; i--) {
                    int = '0' + int;
                }
            }

            if (thousands > -1) {
                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                int = '';
            }

            output = int + decimal + (abbr ? abbr : '');

            if (negP) {
                output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
            } else {
                if (signed >= 0) {
                    output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
                } else if (neg) {
                    output = '-' + output;
                }
            }

            return output;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function(string) {
            var locale = locales[options.currentLocale],
                stringOriginal = string,
                abbreviations = {
                    thousand: 3,
                    million: 6,
                    billion: 9,
                    trillion: 12
                },
                abbreviation,
                value,
                i,
                regexp;

            if (options.zeroFormat && string === options.zeroFormat) {
                value = 0;
            } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length) {
                value = null;
            } else {
                value = 1;

                if (locale.delimiters.decimal !== '.') {
                    string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
                }

                for (abbreviation in abbreviations) {
                    regexp = new RegExp('[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$');

                    if (stringOriginal.match(regexp)) {
                        value *= Math.pow(10, abbreviations[abbreviation]);
                        break;
                    }
                }

                // check for negative number
                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;

                // remove non numbers
                string = string.replace(/[^0-9\.]+/g, '');

                value *= Number(string);
            }

            return value;
        },
        isNaN: function(value) {
            return typeof value === 'number' && isNaN(value);
        },
        includes: function(string, search) {
            return string.indexOf(search) !== -1;
        },
        insert: function(string, subString, start) {
            return string.slice(0, start) + subString + string.slice(start);
        },
        reduce: function(array, callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var t = Object(array),
                len = t.length >>> 0,
                k = 0,
                value;

            if (arguments.length === 3) {
                value = arguments[2];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }

                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }

                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function (x) {
            var parts = x.toString().split('.');

            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function () {
            var args = Array.prototype.slice.call(arguments);

            return args.reduce(function(accum, next) {
                var mn = _.multiplier(next);
                return accum > mn ? accum : mn;
            }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
            var splitValue = value.toString().split('.'),
                minDecimals = maxDecimals - (optionals || 0),
                boundedPrecision,
                optionalsRegExp,
                power,
                output;

            // Use the smallest precision value possible to avoid errors from floating point representation
            if (splitValue.length === 2) {
              boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
            } else {
              boundedPrecision = minDecimals;
            }

            power = Math.pow(10, boundedPrecision);

            // Multiply up by precision, round accurately, then divide and use native toFixed():
            output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

            if (optionals > maxDecimals - boundedPrecision) {
                optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
                output = output.replace(optionalsRegExp, '');
            }

            return output;
        }
    };

    // avaliable options
    numeral.options = options;

    // avaliable formats
    numeral.formats = formats;

    // avaliable formats
    numeral.locales = locales;

    // This function sets the current locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    numeral.locale = function(key) {
        if (key) {
            options.currentLocale = key.toLowerCase();
        }

        return options.currentLocale;
    };

    // This function provides access to the loaded locale data.  If
    // no arguments are passed in, it will simply return the current
    // global locale object.
    numeral.localeData = function(key) {
        if (!key) {
            return locales[options.currentLocale];
        }

        key = key.toLowerCase();

        if (!locales[key]) {
            throw new Error('Unknown locale : ' + key);
        }

        return locales[key];
    };

    numeral.reset = function() {
        for (var property in defaults) {
            options[property] = defaults[property];
        }
    };

    numeral.zeroFormat = function(format) {
        options.zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.nullFormat = function (format) {
        options.nullFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function(format) {
        options.defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    numeral.register = function(type, name, format) {
        name = name.toLowerCase();

        if (this[type + 's'][name]) {
            throw new TypeError(name + ' ' + type + ' already registered.');
        }

        this[type + 's'][name] = format;

        return format;
    };


    numeral.validate = function(val, culture) {
        var _decimalSep,
            _thousandSep,
            _currSymbol,
            _valArray,
            _abbrObj,
            _thousandRegEx,
            localeData,
            temp;

        //coerce val to string
        if (typeof val !== 'string') {
            val += '';

            if (console.warn) {
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
            }
        }

        //trim whitespaces from either sides
        val = val.trim();

        //if val is just digits return true
        if (!!val.match(/^\d+$/)) {
            return true;
        }

        //if val is empty return false
        if (val === '') {
            return false;
        }

        //get the decimal and thousands separator from numeral.localeData
        try {
            //check if the culture is understood by numeral. if not, default it to current locale
            localeData = numeral.localeData(culture);
        } catch (e) {
            localeData = numeral.localeData(numeral.locale());
        }

        //setup the delimiters and currency symbol based on culture/locale
        _currSymbol = localeData.currency.symbol;
        _abbrObj = localeData.abbreviations;
        _decimalSep = localeData.delimiters.decimal;
        if (localeData.delimiters.thousands === '.') {
            _thousandSep = '\\.';
        } else {
            _thousandSep = localeData.delimiters.thousands;
        }

        // validating currency symbol
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
                return false;
            }
        }

        //validating abbreviation symbol
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
            }
        }

        _thousandRegEx = new RegExp(_thousandSep + '{2}');

        if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
                return false;
            } else {
                if (_valArray.length < 2) {
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
                } else {
                    if (_valArray[0].length === 1) {
                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    } else {
                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    }
                }
            }
        }

        return false;
    };


    /************************************
        Numeral Prototype
    ************************************/

    numeral.fn = Numeral.prototype = {
        clone: function() {
            return numeral(this);
        },
        format: function(inputString, roundingFunction) {
            var value = this._value,
                format = inputString || options.defaultFormat,
                kind,
                output,
                formatFunction;

            // make sure we have a roundingFunction
            roundingFunction = roundingFunction || Math.round;

            // format based on value
            if (value === 0 && options.zeroFormat !== null) {
                output = options.zeroFormat;
            } else if (value === null && options.nullFormat !== null) {
                output = options.nullFormat;
            } else {
                for (kind in formats) {
                    if (format.match(formats[kind].regexps.format)) {
                        formatFunction = formats[kind].format;

                        break;
                    }
                }

                formatFunction = formatFunction || numeral._.numberToFormat;

                output = formatFunction(value, format, roundingFunction);
            }

            return output;
        },
        value: function() {
            return this._value;
        },
        input: function() {
            return this._input;
        },
        set: function(value) {
            this._value = Number(value);

            return this;
        },
        add: function(value) {
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum + Math.round(corrFactor * curr);
            }

            this._value = _.reduce([this._value, value], cback, 0) / corrFactor;

            return this;
        },
        subtract: function(value) {
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum - Math.round(corrFactor * curr);
            }

            this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;

            return this;
        },
        multiply: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback, 1);

            return this;
        },
        divide: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback);

            return this;
        },
        difference: function(value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }
    };

    /************************************
        Default Locale && Format
    ************************************/

    numeral.register('locale', 'en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function(number) {
            var b = number % 10;
            return (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    

(function() {
        numeral.register('format', 'bps', {
            regexps: {
                format: /(BPS)/,
                unformat: /(BPS)/
            },
            format: function(value, format, roundingFunction) {
                var space = numeral._.includes(format, ' BPS') ? ' ' : '',
                    output;

                value = value * 10000;

                // check for space before BPS
                format = format.replace(/\s?BPS/, '');

                output = numeral._.numberToFormat(value, format, roundingFunction);

                if (numeral._.includes(output, ')')) {
                    output = output.split('');

                    output.splice(-1, 0, space + 'BPS');

                    output = output.join('');
                } else {
                    output = output + space + 'BPS';
                }

                return output;
            },
            unformat: function(string) {
                return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
            }
        });
})();


(function() {
        var decimal = {
            base: 1000,
            suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        },
        binary = {
            base: 1024,
            suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        };

    var allSuffixes =  decimal.suffixes.concat(binary.suffixes.filter(function (item) {
            return decimal.suffixes.indexOf(item) < 0;
        }));
        var unformatRegex = allSuffixes.join('|');
        // Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)
        unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';

    numeral.register('format', 'bytes', {
        regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(unformatRegex)
        },
        format: function(value, format, roundingFunction) {
            var output,
                bytes = numeral._.includes(format, 'ib') ? binary : decimal,
                suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
                power,
                min,
                max;

            // check for space before
            format = format.replace(/\s?i?b/, '');

            for (power = 0; power <= bytes.suffixes.length; power++) {
                min = Math.pow(bytes.base, power);
                max = Math.pow(bytes.base, power + 1);

                if (value === null || value === 0 || value >= min && value < max) {
                    suffix += bytes.suffixes[power];

                    if (min > 0) {
                        value = value / min;
                    }

                    break;
                }
            }

            output = numeral._.numberToFormat(value, format, roundingFunction);

            return output + suffix;
        },
        unformat: function(string) {
            var value = numeral._.stringToNumber(string),
                power,
                bytesMultiplier;

            if (value) {
                for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                    if (numeral._.includes(string, decimal.suffixes[power])) {
                        bytesMultiplier = Math.pow(decimal.base, power);

                        break;
                    }

                    if (numeral._.includes(string, binary.suffixes[power])) {
                        bytesMultiplier = Math.pow(binary.base, power);

                        break;
                    }
                }

                value *= (bytesMultiplier || 1);
            }

            return value;
        }
    });
})();


(function() {
        numeral.register('format', 'currency', {
        regexps: {
            format: /(\$)/
        },
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                symbols = {
                    before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                    after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
                },
                output,
                symbol,
                i;

            // strip format of spaces and $
            format = format.replace(/\s?\$\s?/, '');

            // format the number
            output = numeral._.numberToFormat(value, format, roundingFunction);

            // update the before and after based on value
            if (value >= 0) {
                symbols.before = symbols.before.replace(/[\-\(]/, '');
                symbols.after = symbols.after.replace(/[\-\)]/, '');
            } else if (value < 0 && (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))) {
                symbols.before = '-' + symbols.before;
            }

            // loop through each before symbol
            for (i = 0; i < symbols.before.length; i++) {
                symbol = symbols.before[i];

                switch (symbol) {
                    case '$':
                        output = numeral._.insert(output, locale.currency.symbol, i);
                        break;
                    case ' ':
                        output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
                        break;
                }
            }

            // loop through each after symbol
            for (i = symbols.after.length - 1; i >= 0; i--) {
                symbol = symbols.after[i];

                switch (symbol) {
                    case '$':
                        output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                        break;
                    case ' ':
                        output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                        break;
                }
            }


            return output;
        }
    });
})();


(function() {
        numeral.register('format', 'exponential', {
        regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/
        },
        format: function(value, format, roundingFunction) {
            var output,
                exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
                parts = exponential.split('e');

            format = format.replace(/e[\+|\-]{1}0/, '');

            output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);

            return output + 'e' + parts[1];
        },
        unformat: function(string) {
            var parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
                value = Number(parts[0]),
                power = Number(parts[1]);

            power = numeral._.includes(string, 'e-') ? power *= -1 : power;

            function cback(accum, curr, currI, O) {
                var corrFactor = numeral._.correctionFactor(accum, curr),
                    num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
                return num;
            }

            return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
        }
    });
})();


(function() {
        numeral.register('format', 'ordinal', {
        regexps: {
            format: /(o)/
        },
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                output,
                ordinal = numeral._.includes(format, ' o') ? ' ' : '';

            // check for space before
            format = format.replace(/\s?o/, '');

            ordinal += locale.ordinal(value);

            output = numeral._.numberToFormat(value, format, roundingFunction);

            return output + ordinal;
        }
    });
})();


(function() {
        numeral.register('format', 'percentage', {
        regexps: {
            format: /(%)/,
            unformat: /(%)/
        },
        format: function(value, format, roundingFunction) {
            var space = numeral._.includes(format, ' %') ? ' ' : '',
                output;

            if (numeral.options.scalePercentBy100) {
                value = value * 100;
            }

            // check for space before %
            format = format.replace(/\s?\%/, '');

            output = numeral._.numberToFormat(value, format, roundingFunction);

            if (numeral._.includes(output, ')')) {
                output = output.split('');

                output.splice(-1, 0, space + '%');

                output = output.join('');
            } else {
                output = output + space + '%';
            }

            return output;
        },
        unformat: function(string) {
            var number = numeral._.stringToNumber(string);
            if (numeral.options.scalePercentBy100) {
                return number * 0.01;
            }
            return number;
        }
    });
})();


(function() {
        numeral.register('format', 'time', {
        regexps: {
            format: /(:)/,
            unformat: /(:)/
        },
        format: function(value, format, roundingFunction) {
            var hours = Math.floor(value / 60 / 60),
                minutes = Math.floor((value - (hours * 60 * 60)) / 60),
                seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        },
        unformat: function(string) {
            var timeArray = string.split(':'),
                seconds = 0;

            // turn hours and minutes into seconds and add them all up
            if (timeArray.length === 3) {
                // hours
                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
                // minutes
                seconds = seconds + (Number(timeArray[1]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
                // minutes
                seconds = seconds + (Number(timeArray[0]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
        }
    });
})();

return numeral;
}));

},{}],61:[function(require,module,exports){
/* @license
Papa Parse
v5.0.0
https://github.com/mholt/PapaParse
License: MIT
*/
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()}(this,function s(){"use strict";var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=n&&/blob:/i.test((f.location||{}).protocol),a={},h=0,k={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;q(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!q(t.transform)&&t.transform,t.worker&&k.WORKERS_SUPPORTED){var i=function(){if(!k.WORKERS_SUPPORTED)return!1;var e=(r=f.URL||f.webkitURL||null,i=s.toString(),k.BLOB_URL||(k.BLOB_URL=r.createObjectURL(new Blob(["(",i,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var r,i;return t.onmessage=_,t.id=h++,a[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=q(t.step),t.chunk=q(t.chunk),t.complete=q(t.complete),t.error=q(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;k.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new l(t):new p(t):!0===e.readable&&q(e.read)&&q(e.on)?n=new m(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var i=!1,_=!0,g=",",v="\r\n",n='"',s=n+n,r=!1,a=null;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||k.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(g=t.delimiter);("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(v=t.newline);"string"==typeof t.quoteChar&&(n=t.quoteChar);"boolean"==typeof t.header&&(_=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");a=t.columns}void 0!==t.escapeChar&&(s=t.escapeChar+n)}();var o=new RegExp(U(n),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,r);if("object"==typeof e[0])return u(a||h(e[0]),e,r)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:h(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],r);throw new Error("Unable to serialize unrecognized input");function h(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function u(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(i+=g),i+=y(e[a],a);0<t.length&&(i+=v)}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(u="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c])}u=""===d.join("").trim()}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(i+=g);var m=n&&s?e[p]:p;i+=y(t[o][m],p)}o<t.length-1&&(!r||0<h&&!f)&&(i+=v)}}return i}function y(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);e=e.toString().replace(o,s);var r="boolean"==typeof i&&i||Array.isArray(i)&&i[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(e,k.BAD_DELIMITERS)||-1<e.indexOf(g)||" "===e.charAt(0)||" "===e.charAt(e.length-1);return r?n+e+n:e}}};if(k.RECORD_SEP=String.fromCharCode(30),k.UNIT_SEP=String.fromCharCode(31),k.BYTE_ORDER_MARK="\ufeff",k.BAD_DELIMITERS=["\r","\n",'"',k.BYTE_ORDER_MARK],k.WORKERS_SUPPORTED=!n&&!!f.Worker,k.NODE_STREAM_INPUT=1,k.LocalChunkSize=10485760,k.RemoteChunkSize=5242880,k.DefaultDelimiter=",",k.Parser=y,k.ParserHandle=r,k.NetworkStreamer=l,k.FileStreamer=c,k.StringStreamer=p,k.ReadableStreamStreamer=m,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)})}),e(),this;function e(){if(0!==h.length){var e,t,r,i,n=h[0];if(q(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(q(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){q(a)&&a(e,n.file,n.inputElem),u()},k.parse(n.file,n.instanceConfig)}else q(o.complete)&&o.complete()}function u(){h.splice(0,1),e()}}}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=b(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&q(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r)}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:k.WORKER_ID,finished:a});else if(q(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!q(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){q(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:k.WORKER_ID,error:e,finished:!1})}}function l(e){var i;(e=e||{}).chunkSize||(e.chunkSize=k.RemoteChunkSize),u.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=E(this._chunkLoaded,this),i.onerror=E(this._chunkError,this)),i.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r)}try{i.send()}catch(e){this._chunkError(e.message)}n&&0===i.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substr(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t))}}function c(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=k.LocalChunkSize),u.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=E(this._chunkLoaded,this),i.onerror=E(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(i.error)}}function p(e){var r;u.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function m(e){u.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=E(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=E(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=E(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=E(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function r(_){var a,o,h,i=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,n=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,r=0,u=0,f=!1,e=!1,d=[],l={data:[],errors:[],meta:{}};if(q(_.step)){var s=_.step;_.step=function(e){if(l=e,p())c();else{if(c(),0===l.data.length)return;r+=e.data.length,_.preview&&r>_.preview?o.abort():s(l,t)}}}function g(e){return"greedy"===_.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function c(){if(l&&h&&(v("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+k.DefaultDelimiter+"'"),h=!1),_.skipEmptyLines)for(var e=0;e<l.data.length;e++)g(l.data[e])&&l.data.splice(e--,1);return p()&&function(){if(!l)return;function e(e){q(_.transformHeader)&&(e=_.transformHeader(e)),d.push(e)}if(Array.isArray(l.data[0])){for(var t=0;p()&&t<l.data.length;t++)l.data[t].forEach(e);l.data.splice(0,1)}else l.data.forEach(e)}(),function(){if(!l||!_.header&&!_.dynamicTyping&&!_.transform)return l;function e(e,t){var r,i=_.header?{}:[];for(r=0;r<e.length;r++){var n=r,s=e[r];_.header&&(n=r>=d.length?"__parsed_extra":d[r]),_.transform&&(s=_.transform(s,n)),s=m(n,s),"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s}return _.header&&(r>d.length?v("FieldMismatch","TooManyFields","Too many fields: expected "+d.length+" fields but parsed "+r,u+t):r<d.length&&v("FieldMismatch","TooFewFields","Too few fields: expected "+d.length+" fields but parsed "+r,u+t)),i}var t=1;!l.data[0]||Array.isArray(l.data[0])?(l.data=l.data.map(e),t=l.data.length):l.data=e(l.data,0);_.header&&l.meta&&(l.meta.fields=d);return u+=t,l}()}function p(){return _.header&&0===d.length}function m(e,t){return r=e,_.dynamicTypingFunction&&void 0===_.dynamicTyping[r]&&(_.dynamicTyping[r]=_.dynamicTypingFunction(r)),!0===(_.dynamicTyping[r]||_.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(i.test(t)?parseFloat(t):n.test(t)?new Date(t):""===t?null:t):t;var r}function v(e,t,r,i){l.errors.push({type:e,code:t,message:r,row:i})}this.parse=function(e,t,r){var i=_.quoteChar||'"';if(_.newline||(_.newline=function(e,t){e=e.substr(0,1048576);var r=new RegExp(U(t)+"([^]*?)"+U(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),h=!1,_.delimiter)q(_.delimiter)&&(_.delimiter=_.delimiter(e),l.meta.delimiter=_.delimiter);else{var n=function(e,t,r,i,n){var s,a,o;n=n||[",","\t","|",";",k.RECORD_SEP,k.UNIT_SEP];for(var h=0;h<n.length;h++){var u=n[h],f=0,d=0,l=0;o=void 0;for(var c=new y({comments:i,delimiter:u,newline:t,preview:10}).parse(e),p=0;p<c.data.length;p++)if(r&&g(c.data[p]))l++;else{var m=c.data[p].length;d+=m,void 0!==o?1<m&&(f+=Math.abs(m-o),o=m):o=0}0<c.data.length&&(d/=c.data.length-l),(void 0===a||a<f)&&1.99<d&&(a=f,s=u)}return{successful:!!(_.delimiter=s),bestDelimiter:s}}(e,_.newline,_.skipEmptyLines,_.comments,_.delimitersToGuess);n.successful?_.delimiter=n.bestDelimiter:(h=!0,_.delimiter=k.DefaultDelimiter),l.meta.delimiter=_.delimiter}var s=b(_);return _.preview&&_.header&&s.preview++,a=e,o=new y(s),l=o.parse(a,t,r),c(),f?{meta:{paused:!0}}:l||{meta:{paused:!1}}},this.paused=function(){return f},this.pause=function(){f=!0,o.abort(),a=a.substr(o.getCharIndex())},this.resume=function(){t.streamer._halted?(f=!1,t.streamer.parseChunk(a,!0)):setTimeout(this.resume,3)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),l.meta.aborted=!0,q(_.complete)&&_.complete(l),a=""}}function U(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function y(e){var O,D=(e=e||{}).delimiter,I=e.newline,T=e.comments,A=e.step,L=e.preview,F=e.fastMode,z=O=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(z=e.escapeChar),("string"!=typeof D||-1<k.BAD_DELIMITERS.indexOf(D))&&(D=","),T===D)throw new Error("Comment character same as delimiter");!0===T?T="#":("string"!=typeof T||-1<k.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==I&&"\r"!==I&&"\r\n"!==I&&(I="\n");var M=0,j=!1;this.parse=function(a,r,t){if("string"!=typeof a)throw new Error("Input must be a string");var i=a.length,e=D.length,n=I.length,s=T.length,o=q(A),h=[],u=[],f=[],d=M=0;if(!a)return R();if(F||!1!==F&&-1===a.indexOf(O)){for(var l=a.split(I),c=0;c<l.length;c++){if(f=l[c],M+=f.length,c!==l.length-1)M+=I.length;else if(t)return R();if(!T||f.substr(0,s)!==T){if(o){if(h=[],b(f.split(D)),S(),j)return R()}else b(f.split(D));if(L&&L<=c)return h=h.slice(0,L),R(!0)}}return R()}for(var p=a.indexOf(D,M),m=a.indexOf(I,M),_=new RegExp(U(z)+U(O),"g"),g=a.indexOf(O,M);;)if(a[M]!==O)if(T&&0===f.length&&a.substr(M,s)===T){if(-1===m)return R();M=m+n,m=a.indexOf(I,M),p=a.indexOf(D,M)}else{if(-1!==p&&(p<m||-1===m)){if(-1===g){f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}var v=x(p,g,m);if(v&&v.nextDelim){p=v.nextDelim,g=v.quoteSearch,f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}}if(-1===m)break;if(f.push(a.substring(M,m)),C(m+n),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0)}else for(g=M,M++;;){if(-1===(g=a.indexOf(O,g+1)))return t||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:M}),w();if(g===i-1)return w(a.substring(M,g).replace(_,O));if(O!==z||a[g+1]!==z){if(O===z||0===g||a[g-1]!==z){var y=E(-1===m?p:Math.min(p,m));if(a[g+1+y]===D){f.push(a.substring(M,g).replace(_,O)),a[M=g+1+y+e]!==O&&(g=a.indexOf(O,M)),p=a.indexOf(D,M),m=a.indexOf(I,M);break}var k=E(m);if(a.substr(g+1+k,n)===I){if(f.push(a.substring(M,g).replace(_,O)),C(g+1+k+n),p=a.indexOf(D,M),g=a.indexOf(O,M),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:M}),g++}}else g++}return w();function b(e){h.push(e),d=M}function E(e){var t=0;if(-1!==e){var r=a.substring(g+1,e);r&&""===r.trim()&&(t=r.length)}return t}function w(e){return t||(void 0===e&&(e=a.substr(M)),f.push(e),M=i,b(f),o&&S()),R()}function C(e){M=e,b(f),f=[],m=a.indexOf(I,M)}function R(e,t){return{data:t||!1?h[0]:h,errors:u,meta:{delimiter:D,linebreak:I,aborted:j,truncated:!!e,cursor:d+(r||0)}}}function S(){A(R(void 0,!0)),h=[],u=[]}function x(e,t,r){var i={nextDelim:void 0,quoteSearch:void 0},n=a.indexOf(O,t+1);if(t<e&&e<n&&(n<r||-1===r)){var s=a.indexOf(D,n);if(-1===s)return i;n<s&&(n=a.indexOf(O,n+1)),i=x(s,n,r)}else i={nextDelim:e,quoteSearch:t};return i}},this.abort=function(){j=!0},this.getCharIndex=function(){return M}}function _(e){var t=e.data,r=a[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,g(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(q(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results}else q(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&g(t.workerId,t.results)}function g(e,t){var r=a[e];q(r.userComplete)&&r.userComplete(t),r.terminate(),delete a[e]}function v(){throw new Error("Not implemented.")}function b(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=b(e[r]);return t}function E(e,t){return function(){e.apply(t,arguments)}}function q(e){return"function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===k.WORKER_ID&&t&&(k.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:k.WORKER_ID,results:k.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=k.parse(t.input,t.config);r&&f.postMessage({workerId:k.WORKER_ID,results:r,finished:!0})}}),(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(u.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(m.prototype=Object.create(u.prototype)).constructor=m,k});
},{}],62:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.addCustomTypes=exports.Schema=exports.t=void 0;var _typy=require('./typy'),_typy2=_interopRequireDefault(_typy);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var t=function(a,b){return new _typy2.default().t(a,b)},Schema=_typy2.default.Schema,addCustomTypes=function(a){if(t(a).isObject)Object.keys(a).forEach(function(b){if(t(a[b]).isFunction)_typy2.default.prototype.__defineGetter__(b,function(){return a[b](this.input)});else throw new Error('validator '+b+' is not a function')});else throw new Error('validators must be key value pairs')};exports.default=t,exports.t=t,exports.Schema=Schema,exports.addCustomTypes=addCustomTypes;
},{"./typy":63}],63:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_util=require('./util');function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Typy=function(){function a(){var b=this;_classCallCheck(this,a),this.t=function(a,c){if(b.input=a,b.schemaCheck=null,c)if('string'==typeof c)b.input=(0,_util.getNestedObject)(b.input,c);else{var d=(0,_util.convertSchemaAndGetMatch)(b.input,c);-1===d?(b.schemaCheck=!1,b.input=a):(b.schemaCheck=!0,b.input=d)}return b}}return _createClass(a,[{key:'isValid',get:function get(){return null!==this.schemaCheck&&!0===this.schemaCheck&&null!==this.input&&void 0!==this.input}},{key:'isDefined',get:function get(){return'undefined'!=typeof this.input}},{key:'isUndefined',get:function get(){return'undefined'==typeof this.input}},{key:'isNull',get:function get(){return null===this.input&&'object'===_typeof(this.input)}},{key:'isNullOrUndefined',get:function get(){return!!(this.isNull||this.isUndefined)}},{key:'isBoolean',get:function get(){return _typeof(this.input)===_typeof(!0)}},{key:'isTrue',get:function get(){return!0===this.input}},{key:'isFalse',get:function get(){return!1===this.input}},{key:'isTruthy',get:function get(){return!!this.input}},{key:'isFalsy',get:function get(){return!this.input}},{key:'isObject',get:function get(){return'object'===_typeof(this.input)&&this.input===Object(this.input)&&'[object Array]'!==Object.prototype.toString.call(this.input)}},{key:'isEmptyObject',get:function get(){return!!(this.isObject&&0===Object.keys(this.input).length)}},{key:'isString',get:function get(){return'string'==typeof this.input}},{key:'isEmptyString',get:function get(){return!!(this.isString&&0===this.input.length)}},{key:'isNumber',get:function get(){return!!Number.isFinite(this.input)}},{key:'isArray',get:function get(){return!!Array.isArray(this.input)}},{key:'isEmptyArray',get:function get(){return!!(this.isArray&&0===this.input.length)}},{key:'isFunction',get:function get(){return'function'==typeof this.input}},{key:'safeObject',get:function get(){return this.input}},{key:'safeObjectOrEmpty',get:function get(){return this.input?this.input:{}}},{key:'safeString',get:function get(){return this.isString?this.input:''}},{key:'safeNumber',get:function get(){return this.isNumber?this.input:0}},{key:'safeBoolean',get:function get(){return!!this.isBoolean&&this.input}},{key:'safeFunction',get:function get(){return this.isFunction?this.input:function(){}}},{key:'safeArray',get:function get(){return this.isArray?this.input:this.isNullOrUndefined?[]:[this.input]}}]),a}();Typy.Schema={Number:1,String:'typy',Boolean:!0,Null:null,Undefined:void 0,Array:[],Function:function Function(){}},exports.default=Typy,module.exports=exports['default'];
},{"./util":64}],64:[function(require,module,exports){
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_arguments=arguments,getNestedObject=function(a,b){if(!(1<_arguments.length&&'string'!=typeof b)){if('undefined'!=typeof a&&'string'==typeof b){var c=/[.\[\]'"]/g,d=b.split(c).filter(function(a){return''!==a});a=d.reduce(function(a,b){return a&&'undefined'!==a[b]?a[b]:void 0},a)}return a}},buildSchema=function(a){if('[object Array]'===Object.prototype.toString.call(a))a.forEach(function(a){return buildSchema(a)});else if('[object Object]'===Object.prototype.toString.call(a))Object.keys(a).forEach(function(b){return buildSchema(a[b])});else return'undefined'==typeof a?'undefined':_typeof(a);return a},getSchemaMatch=function(a,b){var c=!1;if('[object Array]'===Object.prototype.toString.call(a)){if(b.length)for(var d=0;d<a.length;d+=1){if(!getSchemaMatch(a[d],b[d])){c=!1;break}c=!0}else return!0;}else if('[object Object]'===Object.prototype.toString.call(a))for(var e in a){if(!getSchemaMatch(a[e],b[e])){c=!1;break}c=!0}else return('undefined'==typeof b?'undefined':_typeof(b))===('undefined'==typeof a?'undefined':_typeof(a));return c},convertSchemaAndGetMatch=function(a,b){var c=buildSchema(b);return getSchemaMatch(a,c)?a:-1};module.exports={getNestedObject:getNestedObject,buildSchema:buildSchema,getSchemaMatch:getSchemaMatch,convertSchemaAndGetMatch:convertSchemaAndGetMatch};
},{}],65:[function(require,module,exports){
module.exports = [
    [ 0x0300, 0x036F ], [ 0x0483, 0x0486 ], [ 0x0488, 0x0489 ],
    [ 0x0591, 0x05BD ], [ 0x05BF, 0x05BF ], [ 0x05C1, 0x05C2 ],
    [ 0x05C4, 0x05C5 ], [ 0x05C7, 0x05C7 ], [ 0x0600, 0x0603 ],
    [ 0x0610, 0x0615 ], [ 0x064B, 0x065E ], [ 0x0670, 0x0670 ],
    [ 0x06D6, 0x06E4 ], [ 0x06E7, 0x06E8 ], [ 0x06EA, 0x06ED ],
    [ 0x070F, 0x070F ], [ 0x0711, 0x0711 ], [ 0x0730, 0x074A ],
    [ 0x07A6, 0x07B0 ], [ 0x07EB, 0x07F3 ], [ 0x0901, 0x0902 ],
    [ 0x093C, 0x093C ], [ 0x0941, 0x0948 ], [ 0x094D, 0x094D ],
    [ 0x0951, 0x0954 ], [ 0x0962, 0x0963 ], [ 0x0981, 0x0981 ],
    [ 0x09BC, 0x09BC ], [ 0x09C1, 0x09C4 ], [ 0x09CD, 0x09CD ],
    [ 0x09E2, 0x09E3 ], [ 0x0A01, 0x0A02 ], [ 0x0A3C, 0x0A3C ],
    [ 0x0A41, 0x0A42 ], [ 0x0A47, 0x0A48 ], [ 0x0A4B, 0x0A4D ],
    [ 0x0A70, 0x0A71 ], [ 0x0A81, 0x0A82 ], [ 0x0ABC, 0x0ABC ],
    [ 0x0AC1, 0x0AC5 ], [ 0x0AC7, 0x0AC8 ], [ 0x0ACD, 0x0ACD ],
    [ 0x0AE2, 0x0AE3 ], [ 0x0B01, 0x0B01 ], [ 0x0B3C, 0x0B3C ],
    [ 0x0B3F, 0x0B3F ], [ 0x0B41, 0x0B43 ], [ 0x0B4D, 0x0B4D ],
    [ 0x0B56, 0x0B56 ], [ 0x0B82, 0x0B82 ], [ 0x0BC0, 0x0BC0 ],
    [ 0x0BCD, 0x0BCD ], [ 0x0C3E, 0x0C40 ], [ 0x0C46, 0x0C48 ],
    [ 0x0C4A, 0x0C4D ], [ 0x0C55, 0x0C56 ], [ 0x0CBC, 0x0CBC ],
    [ 0x0CBF, 0x0CBF ], [ 0x0CC6, 0x0CC6 ], [ 0x0CCC, 0x0CCD ],
    [ 0x0CE2, 0x0CE3 ], [ 0x0D41, 0x0D43 ], [ 0x0D4D, 0x0D4D ],
    [ 0x0DCA, 0x0DCA ], [ 0x0DD2, 0x0DD4 ], [ 0x0DD6, 0x0DD6 ],
    [ 0x0E31, 0x0E31 ], [ 0x0E34, 0x0E3A ], [ 0x0E47, 0x0E4E ],
    [ 0x0EB1, 0x0EB1 ], [ 0x0EB4, 0x0EB9 ], [ 0x0EBB, 0x0EBC ],
    [ 0x0EC8, 0x0ECD ], [ 0x0F18, 0x0F19 ], [ 0x0F35, 0x0F35 ],
    [ 0x0F37, 0x0F37 ], [ 0x0F39, 0x0F39 ], [ 0x0F71, 0x0F7E ],
    [ 0x0F80, 0x0F84 ], [ 0x0F86, 0x0F87 ], [ 0x0F90, 0x0F97 ],
    [ 0x0F99, 0x0FBC ], [ 0x0FC6, 0x0FC6 ], [ 0x102D, 0x1030 ],
    [ 0x1032, 0x1032 ], [ 0x1036, 0x1037 ], [ 0x1039, 0x1039 ],
    [ 0x1058, 0x1059 ], [ 0x1160, 0x11FF ], [ 0x135F, 0x135F ],
    [ 0x1712, 0x1714 ], [ 0x1732, 0x1734 ], [ 0x1752, 0x1753 ],
    [ 0x1772, 0x1773 ], [ 0x17B4, 0x17B5 ], [ 0x17B7, 0x17BD ],
    [ 0x17C6, 0x17C6 ], [ 0x17C9, 0x17D3 ], [ 0x17DD, 0x17DD ],
    [ 0x180B, 0x180D ], [ 0x18A9, 0x18A9 ], [ 0x1920, 0x1922 ],
    [ 0x1927, 0x1928 ], [ 0x1932, 0x1932 ], [ 0x1939, 0x193B ],
    [ 0x1A17, 0x1A18 ], [ 0x1B00, 0x1B03 ], [ 0x1B34, 0x1B34 ],
    [ 0x1B36, 0x1B3A ], [ 0x1B3C, 0x1B3C ], [ 0x1B42, 0x1B42 ],
    [ 0x1B6B, 0x1B73 ], [ 0x1DC0, 0x1DCA ], [ 0x1DFE, 0x1DFF ],
    [ 0x200B, 0x200F ], [ 0x202A, 0x202E ], [ 0x2060, 0x2063 ],
    [ 0x206A, 0x206F ], [ 0x20D0, 0x20EF ], [ 0x302A, 0x302F ],
    [ 0x3099, 0x309A ], [ 0xA806, 0xA806 ], [ 0xA80B, 0xA80B ],
    [ 0xA825, 0xA826 ], [ 0xFB1E, 0xFB1E ], [ 0xFE00, 0xFE0F ],
    [ 0xFE20, 0xFE23 ], [ 0xFEFF, 0xFEFF ], [ 0xFFF9, 0xFFFB ],
    [ 0x10A01, 0x10A03 ], [ 0x10A05, 0x10A06 ], [ 0x10A0C, 0x10A0F ],
    [ 0x10A38, 0x10A3A ], [ 0x10A3F, 0x10A3F ], [ 0x1D167, 0x1D169 ],
    [ 0x1D173, 0x1D182 ], [ 0x1D185, 0x1D18B ], [ 0x1D1AA, 0x1D1AD ],
    [ 0x1D242, 0x1D244 ], [ 0xE0001, 0xE0001 ], [ 0xE0020, 0xE007F ],
    [ 0xE0100, 0xE01EF ]
]

},{}],66:[function(require,module,exports){
"use strict"

var defaults = require('defaults')
var combining = require('./combining')

var DEFAULTS = {
  nul: 0,
  control: 0
}

module.exports = function wcwidth(str) {
  return wcswidth(str, DEFAULTS)
}

module.exports.config = function(opts) {
  opts = defaults(opts || {}, DEFAULTS)
  return function wcwidth(str) {
    return wcswidth(str, opts)
  }
}

/*
 *  The following functions define the column width of an ISO 10646
 *  character as follows:
 *  - The null character (U+0000) has a column width of 0.
 *  - Other C0/C1 control characters and DEL will lead to a return value
 *    of -1.
 *  - Non-spacing and enclosing combining characters (general category
 *    code Mn or Me in the
 *    Unicode database) have a column width of 0.
 *  - SOFT HYPHEN (U+00AD) has a column width of 1.
 *  - Other format characters (general category code Cf in the Unicode
 *    database) and ZERO WIDTH
 *    SPACE (U+200B) have a column width of 0.
 *  - Hangul Jamo medial vowels and final consonants (U+1160-U+11FF)
 *    have a column width of 0.
 *  - Spacing characters in the East Asian Wide (W) or East Asian
 *    Full-width (F) category as
 *    defined in Unicode Technical Report #11 have a column width of 2.
 *  - All remaining characters (including all printable ISO 8859-1 and
 *    WGL4 characters, Unicode control characters, etc.) have a column
 *    width of 1.
 *  This implementation assumes that characters are encoded in ISO 10646.
*/

function wcswidth(str, opts) {
  if (typeof str !== 'string') return wcwidth(str, opts)

  var s = 0
  for (var i = 0; i < str.length; i++) {
    var n = wcwidth(str.charCodeAt(i), opts)
    if (n < 0) return -1
    s += n
  }

  return s
}

function wcwidth(ucs, opts) {
  // test for 8-bit control characters
  if (ucs === 0) return opts.nul
  if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0)) return opts.control

  // binary search in table of non-spacing characters
  if (bisearch(ucs)) return 0

  // if we arrive here, ucs is not a combining or C0/C1 control character
  return 1 +
      (ucs >= 0x1100 &&
       (ucs <= 0x115f ||                       // Hangul Jamo init. consonants
        ucs == 0x2329 || ucs == 0x232a ||
        (ucs >= 0x2e80 && ucs <= 0xa4cf &&
         ucs != 0x303f) ||                     // CJK ... Yi
        (ucs >= 0xac00 && ucs <= 0xd7a3) ||    // Hangul Syllables
        (ucs >= 0xf900 && ucs <= 0xfaff) ||    // CJK Compatibility Ideographs
        (ucs >= 0xfe10 && ucs <= 0xfe19) ||    // Vertical forms
        (ucs >= 0xfe30 && ucs <= 0xfe6f) ||    // CJK Compatibility Forms
        (ucs >= 0xff00 && ucs <= 0xff60) ||    // Fullwidth Forms
        (ucs >= 0xffe0 && ucs <= 0xffe6) ||
        (ucs >= 0x20000 && ucs <= 0x2fffd) ||
        (ucs >= 0x30000 && ucs <= 0x3fffd)));
}

function bisearch(ucs) {
  var min = 0
  var max = combining.length - 1
  var mid

  if (ucs < combining[0][0] || ucs > combining[max][1]) return false

  while (max >= min) {
    mid = Math.floor((min + max) / 2)
    if (ucs > combining[mid][1]) min = mid + 1
    else if (ucs < combining[mid][0]) max = mid - 1
    else return true
  }

  return false
}

},{"./combining":65,"defaults":58}],67:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],68:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)
},{"base64-js":67,"buffer":68,"ieee754":69}],69:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],70:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],71:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],72:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],73:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":72,"_process":70,"inherits":71}]},{},[1]);

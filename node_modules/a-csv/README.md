a-csv
=====
A lightweight CSV parser.

# Installation
Run the following commands to download and install the application:

```js
$ npm install a-csv
```

# CLI Tool
There is a command line tool as well and it's available if you install this package
globally:

```sh
$ npm install -g a-csv
```

Run `a-csv -h` for help content.

```sh
$ a-csv -h
Usage: a-csv [options]

Options:
  -l, --length <length>    The buffer size.
  -c, --charset <charset>  The file charset
  -i, --ignore-headers     Ignore the first line in the input file.
  -s, --source <path>      The source csv file.
  --verbose                Display additional log messages.
  -h, --help               Displays this help.
  -v, --version            Displays version information.

Examples:
  a-csv -s path/to/file.csv
  a-csv -s path/to/file.csv -i
  a-csv -s path/to/file.csv -l 2048
  a-csv -s path/to/file.csv -c ascii

Documentation can be found at https://github.com/jillix/a-csv
```

# Example

```js
var CSV = require("a-csv");
var file = "test.csv";
var options = {
    delimiter: ";",
    charset: "win1250"
};

CSV.parse(file, options, function (err, row, next) {

    if (err) {
        return console.log(err);
    }

    if (row !== null) {
        console.log(row);
        return next();
    }

    console.log("finish");
});
```

# Documentation
### `parse(path, options, rowHandler)`
Parses CSV files.

#### Params
- **String** `path`: Path to CSV file.
- **Object** `options`: An object containing the following properties:
 - `delimiter` (String): The CSV delimiter (default: ",").
 - `length` (Number): The buffer size (default: `8 * 1024`).
 - `charset` (String): The charset (default: `"utf8"`).
 - `headers` (Boolean): A flag to indicate if the file contains headers or not (default: `false`).

- **Function** `rowHandler`: The row handler callback (called with `err`, `data`, `next` arguments).

### `stringify(csvArray, delimiter, lineBreak)`
Stringifies a CSV array.

#### Params
- **Array** `csvArray`: The CSV array.
- **String** `delimiter`: The delimiter (default: `","`).
- **Object** `lineBreak`: The line break delimiter (default: `"\r\n"`).

#### Return
- **String** The stringified CSV array.


# How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

# License
See the [LICENSE](/LICENSE) file.

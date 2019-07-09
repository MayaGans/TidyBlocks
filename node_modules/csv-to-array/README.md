CSV To Array
============
A library for converting CSV files to JSON arrays.

# Installation
Run the following commands to download and install the application:

Install
=======
```sh
$ npm install csv-to-array
```


# Documentation
## `CsvToArray(options, callback)`
Converts CSV files to JSON arrays.

Example

 - File content:

   ```csv
   1;2;3
   4;5;6
   ```

```js
var columns = ["column1", "column2", "column3"];
require("csv-to-array")({
   file: "path/to/input/file.csv",
   columns: columns
}, function (err, array) {
  console.log(err || array);
});
```

Output:

```json
[
    {
        "column1": "1",
        "column2": "2",
        "column3": "3"
    },
    {
        "column1": "4",
        "column2": "5",
        "column3": "6"
    }
]
```

### Params
- **Object** `options`: Object containing the following fields:
 - `csvOptions` (Object): The options that will be passed to the `a-csv` module (default: `{}`).
 - `file` (String): The CSV file path.
 - `collumns` (Array): An array of strings with the columns from CSV file.

- **Function** `callback`: The callback function.



# How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

# Changelog
## `1.0.1`
 - Update in documantation.

## `1.0.0`
 - Initial stable version.

# License
See the [LICENSE](./LICENSE) file.

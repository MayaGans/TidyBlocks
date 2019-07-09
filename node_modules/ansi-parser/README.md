# ANSI Parser
Parse strings containing ANSI style characters.

# Example

```js
var AnsiParser = require("../lib/index.js");
console.log(AnsiParser.parse("\u001b[1m\u001b[38;5;231mHello\u001b[0m\u001b[22m World"));
```

# Documentation
## `parse(input)`
Parses the string containing ANSI styles.

### Params
- **String** `input`: The input string.

### Return
- **Array** An array of object like below:
 ```js
 [
   {
       style: "\u00\u001b[1m\u001b[38;5;231",
       content: "H"
   },
   {
      style: "\u00\u001b[1m\u001b[38;5;231",
      content: "e"
   },
   ...
 ]
 ```

## `getAtIndex(input, noAnsi, index)`
Returns the content and ANSI style at known index.

### Params
- **String** `input`: The input string.
- **String** `noAnsi`: The input string without containing ansi styles.
- **Number** `index`: The character index.

### Return
- **Object** An object containing the following fields:
 - `style` (String): The ANSI style at provided index.
 - `content` (String): The content (character) at provided index.

## `removeAnsi(input)`
Removes ANSI styles from the input string.

### Params
- **String** `input`: The input string.

### Return
- **String** The string without ANSI styles.

## `stringify(arr)`
Stringifies an array of objects in the format defined by `AnsiParser`.

### Params
- **Array** `arr`: The input array.

### Return
- **String** The stringified input array.

## `addChar(arr, c, s, e)`
Adds a new char into array.

### Params
- **Array** `arr`: The input array.
- **String** `c`: The char to add.
- **String** `s`: ANSI start style.
- **String** `e`: ANSI end style.

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
See the [releases page](https://github.com/IonicaBizau/node-ansi-parser/releases).

# License
See the [LICENSE](./LICENSE) file.

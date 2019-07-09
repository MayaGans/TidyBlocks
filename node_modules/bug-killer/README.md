Bug Killer
==========
A colored way to find bugs and fix them.

# Example

```js
// Dependencies
var Debug = require("../index");

// Set log level
Debug.config.logLevel = 4;

// Test defaults
Debug
  .log("A fancy error message", "error")
  .log("Info messages are useful", "info")
  .log("Hey, you've got a warning", "warn")
  ;

// Don't show date
Debug.config.displayDate = false;
Debug.log("Display date is disabled.", "info");

// Custom type
Debug.config.myType = {
    color: [0, 255, 200]
  , text: "custom"
};

Debug.log("This is a custom message type", "myType");
```

# Documentation

## Methods

### `getDate()`
Returns the stringified date. This method can be overrided for a custom date format.

#### Return
- **String** The date in HH:mm.ss - DD.MM.YYYY format.

### `log(message, type)`
Displays debug messages by providing the type.

#### Params
- **String** `message`: The debug message that should be displayed
- **String** `type`: The message type (e.g. "error", "info" etc)

#### Return
- **Object** BugKiller instance


## Other fields

### `config`
An object contaning the configuration of the module.
Default:

```js
// Config
BugKiller.config = {
    error: {
        color: [192, 57, 43]
      , text: "error"
      , level: 1
    }
  , warn: {
        color: [241, 196, 15]
      , text: "warn "
      , level: 2
    }
  , info: {
        color: [52, 152, 219]
      , text: "info "
      , level: 3
    }
  , displayDate: true
  , logLevel: 2
};
```

It can be extended to accept any type of message (see example).

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

## `1.0.0`
 - Removed almost useless if statement that was checking if `type` is valid. The programmer is responsible for that and should use existing message types.
 - Updated `couleurs` dependency.
 - Lowercase message types.
 - `_config` becomes `config`
 - `getDate` handler. Fixes #3.
 - Use `process.stdout.isTTY` to handle redirected output. Fixes #2.

## `v0.1.1`
 - Implemented log level

## `v0.1.0`
 - Initial release

# License
See the [LICENSE](/LICENSE) file.

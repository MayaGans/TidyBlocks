# statman-stopwatch [![Build Status](https://travis-ci.org/jasonray/statman-stopwatch.svg?branch=master)](https://travis-ci.org/jasonray/statman-stopwatch) [![on npm](http://img.shields.io/npm/v/statman-stopwatch.svg?style=flat)](https://www.npmjs.org/package/statman-stopwatch)

`statman-stopwatch` is one of the metrics from the [`statman`](https://github.com/jasonray/statman) library.  It is a simple high res stopwatch for node.js.  Stopwatch is useful for determining the amount of time it takes to perform an activity.

# Install it!
## Option 1: access directly
Install using npm:
```
npm install statman-stopwatch
```

Reference in your app:
```
var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();
```

## Option 2: access from `statman`
Install using npm:
```
npm install statman
```

Reference in your app:
```
var statman = require('statman');
var stopwatch = new statman.Stopwatch();
```

# Use it!
## Constructor
* `Stopwatch()` => create instance of a stopwatch
* `Stopwatch(true)` => create instance of stopwatch, and have it autostart

## start
* `start()` => starts the stopwatch, let the timing begin!

## read
* `read()` => reads the stopwatch to determine how much time has elapsed.  Note that the stopwatch continues to run.  Returns the time elapsed in milliseconds
* `time()` => alias for `read()`

## stop
* `stop()` => stops the stopwatch, and returns the time elapsed in milliseconds

## split
* `split()` => temp stops the stopwatch, allow read() to return time based on when split occurs.  Use `unsplit()` to resume the stopwatch

## unsplit
* `unsplit()` => use follow a `split()` to resume the stopwatch

## splitTime
* `splitTime` => while the stopwatch is split, returns the time as of the split

## reset
* `reset()` => restores the stopwatch back to init state and clears start and stop times

## Example

### Basic usage
Create a new stopwatch, `start()` it, and later `read()` it
```
    var Stopwatch = require('statman-stopwatch');
    var sw = new Stopwatch();
    sw.start();

    // do some activity

    var delta = sw.read();
 ```

### Autostart
`start()` is too hard.  Create a new stopwatch with autostart=true, and later `read()` it
```
    var Stopwatch = require('statman-stopwatch');
    var sw = new Stopwatch(true);

    // do some activity

    var delta = sw.read();
 ```

### Stop
Create a new stopwatch, `stop()` it, and later `read()` it
```
    var Stopwatch = require('statman-stopwatch');
    var sw = new Stopwatch(true);

    // do some activity

    sw.stop();

    // do some more activity

    //returns time associated with when stop() occurred
    var delta = sw.read();
 ```
 
# Build it!
- Make sure that you have `node` and `npm` installed
- Clone source code to you local machine
- Setup dependencies: `npm install`
- run tests: `npm test`
 

# promisify-any.js

# Promisify any of: callback function, sync function, generator function, promise-returning function

## Current status

[![NPM version](https://img.shields.io/npm/v/promisify-any.svg)](https://www.npmjs.com/package/promisify-any)
[![Build Status](https://img.shields.io/travis/overlookmotel/promisify-any/master.svg)](http://travis-ci.org/overlookmotel/promisify-any)
[![Dependency Status](https://img.shields.io/david/overlookmotel/promisify-any.svg)](https://david-dm.org/overlookmotel/promisify-any)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/promisify-any.svg)](https://david-dm.org/overlookmotel/promisify-any)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/promisify-any/master.svg)](https://coveralls.io/r/overlookmotel/promisify-any)

API is stable and all features are tested.

## What is it for?

There are plenty of modules for promisifying callback functions. But what if you are writing a module where the user provides a function as an input to your API and you want to give them flexibility to either use promises or callbacks in that function? And what about generator functions?

This module takes an input which can be any of:

- Async callback function
- Sync function
- Promise-returning function
- Generator function which yields promises

...and turns any of the above into a promise-returning function.

## Usage

### Installation

    npm install promisify-any

### Loading

```js
var promisify = require('promisify-any');
```

### Promisifying

Pass the function to be converted to `promisify`.

```js

fn = promisify(fn);

```

The result of calling `fn` now will be a promise.

```js
fn().then(function(result) {
    // ...
});
```

If the function expects arguments, the number of arguments (not including the callback) MUST be provided as a 2nd argument to `promisify`.

```js
var fn = function(a, b, cb) {
    return cb(null, a + b);
};

fn = promisify(fn, 2);
```

This is so that you end up with the same function, with any of the following inputs:

```js
var fns = [
    function(a, b, cb) { return cb(null, a + b); },
    function(a, b) { return a + b; },
    function(a, b) { return Promise.resolve(a + b); },
    function *(a, b) { return yield Promise.resolve(a + b); }
];

fns = fns.map(function(fn) {return promisify(fn, 2)});
// fns[0] == fns[1] == fns[2] == fns[3]

```

`promisify-any` works out if an input function uses a callback or not, based on the number of arguments the function has. So it needs to know in advance how many arguments it *should* have!

#### Async callback functions

Async callback functions are "promisified".

e.g. Returning a value through callback:

```js
var fn = promisify(function(cb) {
    setImmediate(function() {
        cb(null, 123);
    });
});

fn().then(function(result) {
    // result = 123
});
```

e.g. Taking arguments (note that number of expected arguments is passed to `promisify`):

```js
var fn = promisify(function(x, y, cb) {
    setImmediate(function() {
        cb(null, x + y);
    });
}, 2);

fn(3, 4).then(function(result) {
    // result = 7
});
```

e.g. Returning an error through callback:

```js
var fn = promisify(function(cb) {
    setImmediate(function() {
        cb(new Error('oops!'));
    });
});

fn().catch(function(err) {
    // err.message = 'oops!'
});
```

#### Sync functions

Sync functions are turned into asynchronous promise-returning functions:

```js
var fn = promisify(function(x, y) {
    return x + y;
}, 2);

fn(3, 4).then(function(result) {
    // result = 7
});
```

```js
var fn = promisify(function() {
    throw new Error('oops!');
});

fn().catch(function(err) {
    // err.message = 'oops!'
});
```

#### Promise-returning functions

Promise-returning functions are left unchanged.

```js
var fn = promisify(function(x, y) {
    return Promise.resolve(x + y);
}, 2);

fn(3, 4).then(function(result) {
    // result = 7
});
```

#### Generator functions

Generator functions are wrapped using [co](https://www.npmjs.com/package/co) (`co.wrap()`) so that they can yield promises. The resulting function also returns a promise.

```js
var fn = promisify(function *(x, y) {
    var values = yield [
        Promise.resolve(x * 10),
        Promise.resolve(y * 10)
    ];

    return values[0] + values[1];
}, 2);

fn(3, 4).then(function(result) {
    // result = 70
});
```

NB Generators are only supported in node v0.11 upwards and require node to be run with the `--harmony` flag.

#### Mixing sync and promise returns

In this example, a user is loaded from the database, but records are cached in a local variable, and the cached version is used first if it exists. The function may do any of:

* return a promise that is asynchronously resolved
* return a promise that is asynchronously rejected
* return a result synchronously (from the cache)
* throw synchronously

```js
var cache = [];
function getUserFromDb(id) {
    if (!id) throw new Error('Must provide id');

    if (cache[id]) return cache[id];

    // userModel.find() returns a promise
    return userModel.find( { where: { id: id } } ).then(function(result) {
        if (!result) return Promise.reject(new Error('User not found'));

        cache[id] = result;
        return result;
    };
}
```

This will not work if the function returns synchronously:

```js
getUserFromDb(123).then(function(result) {
    // do something with the result
});
```

But this will always work:

```js
getUserFromDb = promisify(getUserFromDb, 1);

getUserFromDb(123).then(function(result) {
    // do something with the result
});
```

It's less cumbersome to write functions in this way - returning/throwing either synchronously or asynchronously.

### `promisify.generators(object)`

Promisifies all methods of the object which are generators.

```js
var obj = {
    addOne: function *(x) {
        return yield Promise.resolve(x + 1);
    },
    double: function *(x) {
        return yield Promise.resolve(x * 2);
    }
};

promisify.generators(obj);

obj.addOne(10).then(obj.double).then(function(result) {
    // result = 22
});
```

### `promisify.use(Promise)`

Creates a new instance of `promisify-any`, which uses the Promise implementation provided.

```js
var Bluebird = require('bluebird');
var promisify = require('promisify-any').use(Bluebird);

// now use `promisify-any` in the usual way
var fn = promisify(function() {});

var p = fn();

console.log(p instanceof Bluebird); // true
```

## Tests

Use `npm test` to run the tests or `npm run test-harmony` to include generator tests.
Use `npm run cover` to check coverage.

## Changelog

See changelog.md

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/promisify-any/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README

# co-use.js

# co using your choice of promise implementation

## Current status

[![NPM version](https://img.shields.io/npm/v/co-use.svg)](https://www.npmjs.com/package/co-use)
[![Build Status](https://img.shields.io/travis/overlookmotel/co-use/master.svg)](http://travis-ci.org/overlookmotel/co-use)
[![Dependency Status](https://img.shields.io/david/overlookmotel/co-use.svg)](https://david-dm.org/overlookmotel/co-use)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/co-use.svg)](https://david-dm.org/overlookmotel/co-use)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/co-use/master.svg)](https://coveralls.io/r/overlookmotel/co-use)

## What's it for?

[co](https://www.npmjs.com/package/co) is a brilliant module which allows you to code async code in a sync style using generators and `yield`.

Functions which use `co` return a promise.

The problem is that the promise implementation used within `co` is the native Javascript Promise and co doesn't make it possible to use an alternative implementation, for example [bluebird](https://www.npmjs.com/package/bluebird).

This module adds an extra method `.use()` which allows the use of any promise implementation you like within `co`.

## Usage

### `co.use(Promise)`

Creates a new instance of `co`, which uses the Promise implementation provided.

```js
var Bluebird = require('bluebird');
var co = require('co-use').use(Bluebird);

// now use `co` in the usual way
var p = co(function* () {});

console.log(p instanceof Bluebird); // true
```

### Other methods

All other methods are the same as normal [co](https://www.npmjs.com/package/co).

## Building co-use

I requested that this functionality be included in `co` ([PR](https://github.com/tj/co/pull/226)) but so far it has not.

So this module is made by loading `co` and wrapping the code to add the `.use()` method. I will endeavour to update this module when new versions of co are released. The version of `co` currently used is `v4.6.0`.

If you wish to build `co-use` with the most recent version of `co`, do the following:

1. Fork `co-use` from Github
2. Go to the directory of the fork
3. Run the following code:

```
npm install
npm run build
```

Please feel free to raise a PR with the updated build.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/co-use/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/co-use/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README

# co-bluebird.js

# co with bluebird promises

## Current status

[![NPM version](https://img.shields.io/npm/v/co-bluebird.svg)](https://www.npmjs.com/package/co-bluebird)
[![Build Status](https://img.shields.io/travis/overlookmotel/co-bluebird/master.svg)](http://travis-ci.org/overlookmotel/co-bluebird)
[![Dependency Status](https://img.shields.io/david/overlookmotel/co-bluebird.svg)](https://david-dm.org/overlookmotel/co-bluebird)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/co-bluebird.svg)](https://david-dm.org/overlookmotel/co-bluebird)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/co-bluebird/master.svg)](https://coveralls.io/r/overlookmotel/co-bluebird)

## What it does

It's [co](https://www.npmjs.com/package/co), but using [bluebird](https://www.npmjs.com/package/bluebird) promises, rather than native V8 promises.

#### Why?

V8 promises at present have some features missing that [bluebird](https://www.npmjs.com/package/bluebird) has. In particular, bluebird's error handing and stack traces are better. And some people just prefer bluebird!

## Usage

Exactly the same as [co](https://www.npmjs.com/package/co).

Also includes an extra `.use()` method, provided by [co-use](https://www.npmjs.com/package/co-use).

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See changelog.md

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/co-bluebird/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README

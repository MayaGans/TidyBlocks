// --------------------
// promisify-any module
// --------------------

// modules
var Promise = require('bluebird'),
    coBluebird = require('co-bluebird'),
    isGeneratorFn = require('is-generator').fn;

// exports

module.exports = makePromisify(Promise);

function makePromisify(Promise) {
    var co = coBluebird.use(Promise);

    var promisify = function(fn, options) {
        // conform options
        if (typeof options == 'number') {
            options = {numArgs: options};
        } else {
            if (options === undefined) options = {};
            if (options.numArgs === undefined) options.numArgs = 0;
        }

        // deal with generators
        if (isGeneratorFn(fn)) return co.wrap(fn);

        // deal with callback functions
        if (fn.length > options.numArgs) return Promise.promisify(fn);

        // deal with sync functions or promise-returning functions
        return Promise.method(fn);
    };

    // promisify all generators method
    promisify.generators = function(obj) {
        // promisify all methods of the object which are generators
        for (var name in obj) {
            var fn = obj[name];
            if (isGeneratorFn(fn)) obj[name] = co.wrap(fn);
        }

        // return obj for chaining
        return obj;
    };

    // method to set Promise implementation
    promisify.use = makePromisify;

    return promisify;
}

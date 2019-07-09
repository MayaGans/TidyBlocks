// Constructor
function Ul() {}

/**
 * merge
 * Recursively merge the objects from arguments, returning a new object.
 *
 * @name merge
 * @function
 * @return {Object} The merged objects.
 */
Ul.prototype.merge = function (/*obj1, obj2, obj3, ..., objn */) {

    var dst = {}
      , src
      , p
      , args = [].splice.call(arguments, 0)
      ;

    while (args.length > 0) {
        src = args.splice(-1)[0];
        if (toString.call(src) != "[object Object]") { continue; }
        for (p in src) {
            if (!src.hasOwnProperty(p)) { continue; }
            if (toString.call(src[p]) == "[object Object]") {
                dst[p] = this.merge(src[p], dst[p] || {});
            } else {
                if (src[p] !== undefined) {
                    dst[p] = src[p];
                }
            }
        }
    }

    return dst;
};

/**
 * clone
 * Deep clone of the provided item.
 *
 * @name clone
 * @function
 * @param {Anything} item The item that should be cloned
 * @return {Anything} The cloned object
 */
Ul.prototype.clone = function (item) {

    if (!item) { return item; }
    var self = this
      , types = [Number, String, Boolean]
      , result
      , i
      ;

    types.forEach(function(type) {
        if (item instanceof type) {
            result = type(item);
        }
    });

    if (typeof result == "undefined") {
        if (Array.isArray(item)) {
            result = [];
            item.forEach(function(child, index) {
                result[index] = self.clone(child);
            });
        } else if (typeof item == "object") {
            if (!item.prototype) {
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    result = {};
                    for (i in item) {
                        result[i] = self.clone(item[i]);
                    }
                }
            } else {
                result = item;
            }
        } else {
            result = item;
        }
    }

    return result;
};

// Returns the absolute path to the user directory (`~/`)
Ul.prototype.USER_DIR = process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"];

module.exports = new Ul();

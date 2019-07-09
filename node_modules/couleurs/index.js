// Dependencies
var x256 = require("x256")

// Constants
const map = {
    bold: ["\x1B[1m", "\x1B[22m"]
  , italic: ["\x1B[3m", "\x1B[23m"]
  , underline: ["\x1B[4m", "\x1B[24m"]
  , inverse: ["\x1B[7m", "\x1B[27m"]
  , strikethrough: ["\x1B[9m", "\x1B[29m"]
};

/**!
 * hexToRgb
 * Converts a hex color code to rgb
 *
 * @name hexToRgb
 * @function
 * @param {String} hex The hex color value.
 * @return {Array|null} An array containing `r`, `g`, `b` values. If the input is invalid, `null` will be returned.
 */
function hexToRgb (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

/**
 * Couleurs
 *
 * @name Couleurs
 * @function
 * @param {Boolean|undefined} setStringProto If `true`, the prototype of String class will be modified.
 * @return {Object} An object containing the following methods:
 *
 *  - `rgb`
 *  - `bold`
 *  - `italic`
 *  - `underline`
 *  - `inverse`
 *  - `strikethrough`
 *
 */
module.exports = function (setStringProto) {

    /**
     * rgb
     * Creates a colored string providing the color.
     *
     * @name rgb
     * @function
     * @param {String} str The input string.
     * @param {String|Array|Number} r If number, it will be the red value from RGB.
     * If array, it should be an array of three numbers representing RGB values.
     * If String, it will be interpreted as HEX color.
     * @param {Number} g Green value
     * @param {Number} b Blue value
     * @return {String} Colored string
     */
    function rgb(str, r, g, b) {
        if (r[0] === "#") {
            return rgb.call(this, str, hexToRgb(r));
        }

        return "\x1b[38;5;" + x256(r, g, b) + "m" + str + "\033[0m";
    }

    // Build couleurs object
    var couleurs = { rgb: rgb };
    for (var key in map) {
        (function (style, styleId) {
            couleurs[styleId] = function (str) {
                return style[0] + str + style[1];
            };
        })(map[key], key)
    }

    // Modify String prototype
    if (setStringProto === true) {
        for (var meth in couleurs) {
            (function (meth, func) {
                String.prototype[meth] = function (r, g, b) {
                    return func.call(this, String(this), r, g, b);
                };
            })(meth, couleurs[meth]);
        }
    }

    return couleurs;
};

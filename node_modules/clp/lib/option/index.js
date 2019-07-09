// Dependencies
var Ul = require("ul");

/**
 * CLPOption
 * Creates a new `CLPOption` instance.
 *
 * Usages:
 *
 * ```js
 * CLP.Option(["age", "a"], "The age value.", "age", 20);
 * CLP.Option("age", "The age value.", "age", 20);
 * CLP.Option({
 *     aliases: ["age", "a"]
 *   , description: "The age value."
 *   , name: "age"
 *   , def: 20
 *   , handler: function (opt) {
 *        // Do something with opt
 *     }
 * });
 * ```
 *
 * @name CLPOption
 * @function
 * @param {Array|Object} aliases An array of strings representing the aliases
 *  (e.g. `["name", "n"]`), a string representing a single alias (e.g. `"name"`)
 *  or an object containing the following fields:
 *
 *  - `aliases` (Array): An array of strings representing the
 *     aliases (e.g. `["name", "n"]`)
 *  - `def` (Anything): The default value.
 *  - `description` (String): The option description.
 *  - `name` (String): The option name. If provided, the parser will expect a value otherwise
 *    will return or display an error.
 *  - `handler` (Function): The option handler which will be called when the
 *    option is found in the arguments. The first parameter is the option
 *    object and the scope is the `CLP` instance.
 *
 * @param {String} description The option description.
 * @param {String} name The option name.
 * @param {Anything} def The default value.
 * @return {CLPOption} An object containing the following fields:
 *  - `aliases` (Array): An array of strings containing the computed aliases,
 *     the single letter being the first ones (e.g. `["-n", "--name"]`).
 *  - `value` (null|String|DefaultValue): The option value which was found
 *     after processing the arguments.
 *  - `def` (Anything): The provided default value.
 *  - `description` (String): The option description.
 *  - `name` (String): The option name.
 *  - `is_provided` (Boolean): A flag if the option was or not been provided.
 */
function Option(aliases, description, name, def) {
    var opt = {};

    if (aliases.constructor === Object) {
        opt = aliases;
    } else {
        opt.aliases = aliases;
        opt.value = null;
        opt.def = def;
        opt.description = description;
        opt.name = name;
    }

    opt = Ul.merge(opt, {
        aliases: []
      , value: null
      , description: ""
      , name: ""
    });

    if (typeof opt.aliases === "string") {
        opt.aliases = [opt.aliases];
    }

    if (opt.def !== undefined) {
        opt.value = opt.def;
    }

    opt.aliases.forEach(function (c, i) {
        opt.aliases[i] = c.length === 1 ? "-" + c : ("--" + c);
    });

    opt.aliases.sort(function (a, b) {
        return a.length === 2 ? -1 : 1;
    });

    opt.is_provided = false;

    return opt;
}

module.exports = Option;

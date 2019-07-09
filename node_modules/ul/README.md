ul
==
A minimalist utility library.

# Installation
```sh
$ npm install ul
```
# Example
```js
var Ul = require("ul");

var obj = {
        n: null
      , v: 1
    }
  , def = {
        n: 1
      , v: 10
      , a: 20
    }
  , tmp = null
  ;

console.log(tmp = Ul.merge(def, obj));
console.log(tmp === Ul.clone(tmp));
```

# Documentation
## `merge(/* obj1, obj2, obj3, ..., objN*/)`
Recursively merge the objects from arguments, returning a new object.

### Return
- **Object** The merged objects.

## `clone(item)`
Deep clone of the provided item.

### Params
- **Anything** `item`: The item that should be cloned

### Return
- **Anything** The cloned object

## `USER_DIR`
 - Is a string representing the absolute path to the user directory.

# How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

# License
See the [LICENSE](./LICENSE) file.

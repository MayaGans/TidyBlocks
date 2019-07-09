Overlap
=======
Overlap two strings that contain new lines. Useful for ASCII drawings.

# Installation

```sh
$ npm install overlap
```

# Example
```js
var Overlap = require("overlap")
  , Couleurs = require("couleurs")()
  , a =
    Couleurs.bg("+--------------+\n", 142, 68, 173) +
    Couleurs.bg("|              |\n", 142, 100, 200) +
    Couleurs.bg("|   " + Couleurs.fg("Hello World", 255, 255, 0), 142, 68, 173) + "  |\n" +
    Couleurs.bg("|              |\n", 142, 100, 250) +
    Couleurs.bg("|              |\n", 142, 68, 173) +
    Couleurs.bg("|              |\n", 142, 68, 173) +
    Couleurs.bg("|  " + Couleurs.fg("Hello World", 0, 255, 0), 142, 68, 173) + Couleurs.bg(" |\n", 142, 68, 173) +
    Couleurs.bg("|              |\n", 231, 76, 60) +
    Couleurs.bg("+--------------+", 231, 76, 60)
  , b =
    Couleurs.bold("+-------+\n") +
    Couleurs.bg("|       |\n", 192, 57, 43) +
    Couleurs.bg("|       |\n", 230, 126, 34) +
    Couleurs.italic("+-------+")
  ;

console.log(Overlap({
    who: a
  , with: b
  , where: {
        x: 10
      , y: 1
    }
}));
```

Result:

![Example](http://i.imgur.com/B9OaFHD.png)

# Documentation
## `Overlap(options)`
Overlaps two strings.

### Params
- **Object** `options`: An object containing the following fields:
 - `who` (String): The first string.
 - `with` (String): The second string.
 - `where` (Object): The second string position:
    - `x` (Number): The position on `x` axis.
    - `y` (Number): The position on `y` axis.

### Return
- **String** The result string.

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
See the [releases page](https://github.com/IonicaBizau/overlap/releases).

## License
See the [LICENSE](./LICENSE) file.

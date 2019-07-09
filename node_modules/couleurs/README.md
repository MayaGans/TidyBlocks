Couleurs
========
Add some color and styles to your Node.JS strings. :smile:

![](http://i.imgur.com/M83wW95.png)

## Example

### Without modifying `String.prototype`

```js
var Couleurs = require("couleurs")();

console.log(Couleurs.rgb("Red", [255, 0, 0]));
console.log(Couleurs.rgb("Yellow", 255, 255, 0));
console.log(Couleurs.rgb("Blue", "#2980b9"));
console.log(Couleurs.bold("Bold"));
console.log(Couleurs.italic("Italic"));
// etc
```

### Modifying `String.prototype`

```js
var Couleurs = require("couleurs")(true);

console.log("Underline".underline());
console.log("Inverse".inverse());
console.log("Strikethrough".strikethrough());

console.log("All combined"
    .rgb("#d35400")
    .bold()
    .italic()
    .underline()
    .inverse()
    .strikethrough()
);
```

## Documentation

### `Couleurs(setStringProto)`

#### Params
- **Boolean|undefined** `setStringProto`: If `true`, the prototype of String class will be modified.

#### Return
- **Object** An object containing the following methods:
 - `rgb`
 - `bold`
 - `italic`
 - `underline`
 - `inverse`
 - `strikethrough`

### `couleurs.rgb(str, r, g, b)` or `str.rgb(r, g, b)`
Creates a colored string providing the color.

#### Params
- **String** `str`: The input string.
- **String|Array|Number** `r`: If number, it will be the red value from RGB. If array, it should be an array of three numbers representing RGB values.
If String, it will be interpreted as HEX color.
- **Number** `g`: Green value
- **Number** `b`: Blue value

#### Return
- **String** Colored string

### `couleurs.<style>(str)` or `str.<style>()`
`<style>` can be: `bold`, `italic`, `underline`, `inverse`, `strikethrough`.

#### Params
- **String** `str`: The input string.

#### Return:
* **String** Styled string

## Changelog

### 1.1.0
 - Do not modify the `String.prototype` object by default. Fixes #1.
 - The module exports a function.
 - ~~Do not add colors/styles if the output is not a terminal. Fixes #2.~~

### 1.0.0
 - Handle other styles (**bold**, *italic*, ~~strikethrough~~ etc)

### v0.2.0
 - Handle hex color codes

### v0.1.x
 - Initial releases.

## License
See the [LICENSE](/LICENSE) file.

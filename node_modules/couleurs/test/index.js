// Dependency
var Couleurs = require("../index")();

// No prototype modify
console.log(Couleurs.rgb("Red", [255, 0, 0]));
console.log(Couleurs.rgb("Yellow", 255, 255, 0));
console.log(Couleurs.rgb("Blue", "#2980b9"));

console.log(Couleurs.bold("Bold"));
console.log(Couleurs.italic("Italic"));

// Modify prototype
require("../index")(true);

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

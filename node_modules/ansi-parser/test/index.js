var AnsiParser = require("../lib/index.js")
  , Fs = require("fs")
  , Couleurs = require("couleurs")()
  , tests = [
        Couleurs.fg("Text with one color", 255, 0, 0)
      , Couleurs.bold("Bold text", 255, 0, 0)
      , "| " + Couleurs.fg("12", 255, 0, 0)
      , Couleurs.fg("Hello", 255, 0, 0) + " World! " + Couleurs.fg("Isn't this cool?", 0, 255, 0)
      , Fs.readFileSync(__dirname + "/image", "utf-8")
    ];
  ;


for (var i=0; i < tests.length; ++i) {
    console.log(">>> Test " + (i + 1));
    console.log(tests[i]);
    var out = AnsiParser.stringify(AnsiParser.parse(tests[i]));
    console.log(out);
}

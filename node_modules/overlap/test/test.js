var Overlap = require("../index")
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

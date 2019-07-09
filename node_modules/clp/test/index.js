// Dependencies
var Clp = require("../lib");

// Arguments
var args = ["node", "foo", "--name", "Alice", "-a", "13"];

// Create a new parser
var parser = new Clp(args);

// Handle -h and --help
parser.addHelpOption();

// Handle -v and --version
parser.addVersionOption();

// Create options and add them
var nameOption = new Clp.Option(["name", "n"], "Your name", "name", "Alice")
  , ageOption = new Clp.Option(["age", "a"], "Your age", "age")
  ;

parser.addOption(nameOption);
parser.addOption(ageOption);

parser.process();

console.log(nameOption);
console.log(ageOption);

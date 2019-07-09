#!/usr/bin/env node

// Dependencies
var Clp = require("../lib");

// Create options and add them
var nameOption = new Clp.Option(["name", "n"], "Someone's name", "name", "Alice")
  , ageOption = new Clp.Option(["age", "a"], "Someone's age", "age")
  ;

// Create a new parser
var parser = new Clp({
    name: "Name Age"
  , version: "v1.0"
  , process: false
  , exe: "name-age"
  , examples: "name-age -a 10 --name Bob"
  , docs_url: "https://github.com/IonicaBizau/node-clp"
  , notes: "These are some final notes."
}, [nameOption, ageOption]);

parser.addExample("name-age -a 5 # will default the name to \"Alice\"");

parser.process();


// Validate the age
if (isNaN(parseInt(ageOption.value)) || ageOption.value < 0) {
    return console.error("Invalid age.");
}

// Validate the name
if (!nameOption.value) {
    return console.error("Invalid name.");
}

// Use the values
console.log(nameOption.value + " is " + ageOption.value + " year old.");

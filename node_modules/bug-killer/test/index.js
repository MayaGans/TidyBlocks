// Dependencies
var Debug = require("../index");

// Set log level
Debug.config.logLevel = 4;

// Test defaults
Debug
  .log("A fancy error message", "error")
  .log("Info messages are useful", "info")
  .log("Hey, you've got a warning", "warn")
  ;

// Don't show date
Debug.config.displayDate = false;
Debug.log("Display date is disabled.", "info");

// Custom type
Debug.config.myType = {
    color: [0, 255, 200]
  , text: "custom"
};

Debug.log("This is a custom message type", "myType");

var tidyBlockStyles = {

  "dplyr_blocks": {
      "colourPrimary": "#76AADB",
      "colourSecondary":"#3976AD",
      "colourTertiary":"#BF9000"
   },
   "data_blocks": {
      "colourPrimary": "#FEBE4C",
      "colourSecondary":"#64C7FF",
      "colourTertiary":"#9B732F",
      "hat": "cap"
   },
   "ggplot_blocks": {
      "colourPrimary": "#A4C588",
      "colourSecondary":"#64C7FF",
      "colourTertiary":"#586B4B"
   },
   "variable_blocks": {
      "colourPrimary": "#E7553C",
      "colourSecondary":"#64C7FF",
      "colourTertiary":"#760918"
  },
  "hat_blocks": {
    "colourPrimary": "#FEBE4C",
    "colourSecondary": "#FEBE4C",
    "colourTertiary": "#BF9000",
    "hat": "cap"
  }
};

var tidyCategoryStyles = {

  "dplyr_category":{ "colour": "#76AADB", },
  "data_category": { "colour": "#FEBE4C", },
  "ggplot_category": { "colour": "#A4C588", },
  "variables_category": { "colour": "#E7553C", }
  
};

Blockly.Themes.Tidy = new Blockly.Theme(tidyBlockStyles, tidyCategoryStyles);
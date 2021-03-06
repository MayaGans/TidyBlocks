goog.provide('Blockly.Blocks.logic');  // Deprecated
goog.provide('Blockly.Constants.Logic');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
{
  "type": "stats_mean",
  "message0": "MEAN %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Columns"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "style": "stats_blocks",
  "tooltip": "",
  "helpUrl": ""
},

{
  "type": "stats_sd",
  "message0": "SD %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Columns"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "style": "stats_blocks",
  "tooltip": "",
  "helpUrl": ""
},

{
  "type": "stats_sum",
  "message0": "SUM %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Columns"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "style": "stats_blocks",
  "tooltip": "",
  "helpUrl": ""
},

{
  "type": "stats_median",
  "message0": "MEDIAN %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Columns"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "style": "stats_blocks",
  "tooltip": "",
  "helpUrl": ""
},

{
  "type": "stats_min",
  "message0": "MIN %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Columns"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "style": "stats_blocks",
  "tooltip": "",
  "helpUrl": ""
},

{
  "type": "stats_max",
  "message0": "MAX %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Columns"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "style": "stats_blocks",
  "tooltip": "",
  "helpUrl": ""
},

  {
    "type": "stats_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["+", "ADD"],
          ["-", "MINUS"],
          ["\u00D7", "MULTIPLY"],
          ["\u00F7", "DIVIDE"]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "inputsInline": true,
    "output": "String",
    "style": "stats_blocks",
    "helpUrl": ""
  }

]);
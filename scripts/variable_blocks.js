Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for text value
  {
    "type": "variable_text",
    "message0": "%1",
    "args0": [{
      "type": "field_input",
      "name": "TEXT",
      "text": "text"
    }],
    "output": "String",
    "style": "variable_blocks",
    "helpUrl": "",
    "tooltip": "",
  },

  {
    "type": "variable_number",
    "message0": "%1",
    "args0": [{
      "type": "field_number",
      "name": "NUM",
      "value": 0
    }],
    "output": "Number",
    "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
    "style": "variable_blocks",
    "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
    "extensions": ["parent_tooltip_when_inline"]
  },
  
    {
    "type": "variable_compare",
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
          ["=", "EQ"],
          ["\u2260", "NEQ"],
          ["\u200F<", "LT"],
          ["\u200F\u2264", "LTE"],
          ["\u200F>", "GT"],
          ["\u200F\u2265", "GTE"]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "style": "variable_blocks",
    "helpUrl": ""
  },
  // Block for logical operations: 'and', 'or'.
  {
    "type": "variable_operation",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Boolean"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["AND", "AND"],
          ["OR", "OR"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Boolean"
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "style": "variable_blocks",
    "helpUrl": ""
  }
  
])


 Blockly.defineBlocksWithJsonArray([

{
  "type": "ggplot_bar",
  "message0": "PLOT %1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "X",
      "text": "X"
    },
    {
      "type": "input_value",
      "name": "X"
    },
    {
      "type": "field_input",
      "name": "Y",
      "text": "Y"
    },
    {
      "type": "input_value",
      "name": "Y"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "style": "ggplot_blocks",
  "tooltip": "",
  "helpUrl": ""
},{
  "type": "ggplot_histogram",
  "message0": "HISTOGRAM %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "Columns"
    },
    {
      "type": "field_input",
      "name": "bins",
      "text": "bins"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "style": "ggplot_blocks",
  "tooltip": "",
  "helpUrl": ""
}

]);

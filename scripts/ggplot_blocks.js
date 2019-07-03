 Blockly.defineBlocksWithJsonArray([

{
  "type": "ggplot_bar",
  "message0": "BAR %1 %2 %3 %4 %5",
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
},
{
  "type": "ggplot_box",
  "message0": "BOX %1 %2 %3 %4 %5",
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
}

]);

Blockly.Blocks['ggplot_histogram'] = {
  init: function() {
    this.appendValueInput("Columns")
        .setCheck(null)
        .appendField("HISTOGRAM");
    this.appendDummyInput()
        .appendField("bins:")
        .appendField(new Blockly.FieldTextInput("bins"), "bins");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setStyle("ggplot_blocks")
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

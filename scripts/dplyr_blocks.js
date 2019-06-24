goog.provide('Blockly.Blocks.logic');  // Deprecated
goog.provide('Blockly.Constants.Logic');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['dplyr_groupby'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("GROUP BY");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("columnName"), "Column");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('dplyr_blocks')
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dplyr_select'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("SELECT");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("columnName"), "Column");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('dplyr_blocks')
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dplyr_filter'] = {

  init: function() {
    this.appendDummyInput()
        .appendField("FILTER")
        this.appendValueInput("Columns")
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["=","EQ"], ["\u2260","NEQ"], ["\u200F<","LT"], ["\u200F\u2264","LTE"], ["\u200F>","GT"], ["\u200F\u2265","GTE"]]), "OP");
    this.appendValueInput("B")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, "Array");
    this.setNextStatement(true, "Array");
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
 this.setStyle('dplyr_blocks')

 }
  
};

Blockly.Blocks['dplyr_mutate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MUTATE");
    this.appendValueInput("Column")
        .setCheck("String")
        .appendField(new Blockly.FieldTextInput("newColName"), "colName");
    this.appendValueInput("Value")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["+","ADD"], ["-","SUBTRACT"], ["\u00D7","MULTIPLY"], ["\u00F7","DIVIDE"]]), "OP");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('dplyr_blocks')
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dplyr_summarise'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("SUMMARISE");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["mean","MEAN"], ["sum","SUM"], ["sd", "SD"], ["median", "MEDIAN"]]), "transformation");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("columnName"), "colName");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('dplyr_blocks')
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
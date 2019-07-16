goog.provide('Blockly.Blocks.logic');  // Deprecated
goog.provide('Blockly.Constants.Logic');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['dplyr_groupby'] = {

  init: function() {
    this.appendDummyInput()
        .appendField("GROUP BY")
        this.appendValueInput("Columns")
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

Blockly.Blocks['dplyr_groupby2'] = {

  init: function() {
    this.appendDummyInput()
        .appendField("GROUP BY")
        this.appendValueInput("Columns")
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

Blockly.Blocks['dplyr_select'] = {

  init: function() {
    this.appendDummyInput()
        .appendField("SELECT")
        this.appendValueInput("Columns")
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



Blockly.Blocks['dplyr_filter'] = {

  init: function() {
    this.appendDummyInput()
        .appendField("FILTER")
        this.appendValueInput("Columns")
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
    this.appendValueInput("Columns")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("newColName"), "newCol");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("dplyr_blocks")
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dplyr_summarise'] = {

  init: function() {
    this.appendDummyInput()
        .appendField("SUMMARISE")
        this.appendValueInput("Columns")
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

Blockly.Blocks['dplyr_summarise2'] = {

  init: function() {
    this.appendDummyInput()
        .appendField("SUMMARISE")
        this.appendValueInput("Columns")
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

goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.JavaScript['stats_mean'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	
  var code = `{ ${argument0}: {Average_${argument0}: series => series.average() }}`
    return [code, order];
};


Blockly.JavaScript['stats_sd'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	
  var code = `{ ${argument0}: {SD_${argument0}: series => series.std() }}`
    return [code, order];
};

Blockly.JavaScript['stats_sum'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	
  var code = `{Sum_${argument0}: series => series.sum() }}`
    return [code, order];
};


Blockly.JavaScript['stats_median'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	
	var code = `{Median_${argument0}: series => series.median() }}`
    return [code, order];
};

Blockly.JavaScript['stats_min'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	
	var code = `{Min_${argument0}: series => series.min() }}`
    return [code, order];
};

Blockly.JavaScript['stats_max'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	
	var code = `{Max_${argument0}: series => series.max() }}`
    return [code, order]; 
};

Blockly.JavaScript['stats_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  
var OPERATORS = {
    'ADD': '+',
    'SUBTRACT': '-',
    'MULTIPLY': '*',
    'DIVIDE': '/',
  };
  
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
  
  code = argument0 + operator + argument1;
  
 return [code, order]
};
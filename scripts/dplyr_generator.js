goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');


// this only works for numeric columns, not text 
// can't filter Col2 == hello
Blockly.JavaScript['dplyr_filter'] = function(block) {
  
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;  
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var filteredString = []
  
  if (isNaN(argument1)) {
	filteredString = `.where(row => row.${argument0}  ${operator}=  ${argument1})`
	filteredString = filteredString.replace(/["']/, "")
	filteredString = filteredString.replace(/["']/, "")
  } else {
  	var filteredString = `.where(row => (row.${argument0}  ${operator}  ${argument1}))`
	filteredString = filteredString.replace(/["']/g, "")
  }
  console.log(filteredString)
 return filteredString
};



Blockly.JavaScript['dplyr_groupby'] = function(block) {
  
  var argument0 = block.getFieldValue('Column')
   console.log(argument0)
    var groupbyString = `.groupBy(row => (row.${argument0}))`
	 groupbyString = groupbyString.replace(/["']/g, "")
	 console.log(groupbyString)
  return groupbyString
};


// we can only select a single column 
Blockly.JavaScript['dplyr_select'] = function(block) {
   var argument0 = block.getFieldValue('Column')
      console.log(argument0)
   var selectString = ".subset([ \"" + argument0 + "\"])"
   console.log(selectString)
  return selectString
};



Blockly.JavaScript['dplyr_mutate'] = function(block) {
  
  // Comparison operator.
  var OPERATORS = {
    'ADD': '+',
    'SUBTRACT': '-',
    'MULTIPLY': '*',
    'DIVIDE': '/',
  };
  
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
      
  var argument0 = block.getFieldValue('colName');
  
  var argument1 = Blockly.JavaScript.valueToCode(block, 'Column', Blockly.JavaScript.ORDER_NONE);
  

  var argument2 = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_NONE);
  
  // extract if the input block is a string (column)
  // or number
  // this can probably be made more elegant?
  if (isNaN(argument2)) {
	argument2 = `row.` + argument2
  } else {
  	argument2 = argument2
  }

  var mutateString = `.generateSeries({ ${argument0}: row => row.${argument1} ${operator} ${argument2}})`
  mutateString = mutateString.replace(/["']/g, "")
  
 console.log(mutateString)
 return mutateString
};

Blockly.JavaScript['dplyr_summarise'] = function(block) {

      
  var argument0 = block.getFieldValue('transformation');
  var argument1 = block.getFieldValue('colName')
  var summariseString = []
  console.log(argument0)
  if (argument0 === "MEAN") {
  	summariseString = `.select(group => ({ Average: group.select(row => row.${argument1}).average() }))`
  } else {
  summariseString = `.select(group => SD: group.select(row => row.${argument1}).sum() )`
  }
  
  summariseString = summariseString.replace(/["']/g, "")
  console.log(summariseString)
  return summariseString
  
};


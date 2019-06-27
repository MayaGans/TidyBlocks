goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');


// this only works for numeric columns, not text 
// can't filter Col2 == hello
Blockly.JavaScript['dplyr_filter'] = function(block) {
  

 var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);
 console.log(argument0)
 
 var filteredString = `.where(row => (${argument0}))`
  console.log(filteredString)
  
 return filteredString
};



Blockly.JavaScript['dplyr_groupby'] = function(block) {

  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);

    var groupbyString = `.groupBy(row => (${argument0}))`
	 groupbyString = groupbyString.replace(/["']/g, "")

// groupbyString = groupbyString.replace(/(^|\s+)/g, "$1row.")
	 console.log(groupbyString)
  return groupbyString
};


// we can only select a single column 
Blockly.JavaScript['dplyr_select'] = function(block) {

  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);
      
      console.log(argument0)
   var selectString = ".subset([" + argument0 + "])"
    selectString = selectString.replace(/\brow.\/b/gi, "")
    selectString = selectString.replace(/&&/g, "][")
    selectString = selectString.replace(" ", "")
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
  
  // need an if else -- if just one summary stat use 
  var argument0 =  Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
  // otherwise if in an and statement use
  

  var summariseString = `.select(group => { return { Species: group.first().Species,
  										 ${argument0},
  										}}).inflate()`
  summariseString = summariseString.replace(/["']/g, "")
  summariseString = summariseString.replace(/&&/g, ",")
  console.log(summariseString)
  return summariseString
  
};


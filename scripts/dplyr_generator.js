goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');


// this only works for numeric columns, not text 
// can't filter Col2 == hello
Blockly.JavaScript['dplyr_filter'] = function(block) {
  

  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);

 var filteredString = `.where(row => (${argument0}))`
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

  var argumentGroup = block.getParent().inputList[1].fieldRow[0].text_ 
  console.log(argumentGroup)

      
  var argument0 = block.getFieldValue('transformation');
  var argument1 = block.getFieldValue('colName')
  var summariseString = []

  if (argument0 === "MEAN") {
  	summariseString = `.select(group => { return { ${argumentGroup}: group.first().${argumentGroup},
  										 Average: group.deflate(row => row.${argument1}).average()
  										 }
  										}).inflate()`
  } else if (argument0 === "SUM") {
    	summariseString = `.select(group => { return { ${argumentGroup}: group.first().${argumentGroup},
  										 Sum: group.deflate(row => row.${argument1}).sum()
  										 }
  										}).inflate()`
  } else if (argument0 == "SD"){
    	summariseString = `.select(group => { return { ${argumentGroup}: group.first().${argumentGroup},
  										 SD: group.deflate(row => row.${argument1}).std()
  										 }
  										}).inflate()`
  } else if (argument0 == "MEDIAN"){
  	summariseString = `.select(group => { return { ${argumentGroup}: group.first().${argumentGroup},
  										 Median: group.deflate(row => row.${argument1}).median()
  										 }
  										}).inflate()`
  } else if (argument0 == "MIN"){
    	summariseString = `.select(group => { return { ${argumentGroup}: group.first().${argumentGroup},
  										 Min: group.deflate(row => row.${argument1}).min()
  										 }
  										}).inflate()`
  } else {
    	summariseString = `.select(group => { return { ${argumentGroup}: group.first().${argumentGroup},
  										 Max: group.deflate(row => row.${argument1}).max()
  										 }
  										}).inflate()`
  } 
  
  summariseString = summariseString.replace(/["']/g, "")
  console.log(summariseString)
  return summariseString
  
};

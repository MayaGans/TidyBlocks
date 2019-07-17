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



Blockly.JavaScript['dplyr_groupby2'] = function(block) {

  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);

    var groupbyString = `.groupBy(row => [${argument0}])`
   groupbyString = groupbyString.replace(/&&/g, "+")
   groupbyString = groupbyString.replace(/["']/g, "")
	
  return groupbyString
};

Blockly.JavaScript['dplyr_groupby'] = function(block) {

  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);

    var groupString = 
    `.generateSeries({
      Index: row => {
        return ${argument0};
      }
    }).orderBy(column => column.Index);`
    groupString = groupString.replace(/&&/gi, "+")
	console.log(groupString)
  return groupString
};

//var output = groupBy(...).selectMany(group -> group).inflate();

// we can only select a single column 
Blockly.JavaScript['dplyr_select'] = function(block) {

  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);
    
   var selectString = `.subset([\" ${argument0} \"])`
    selectString = selectString.replace(/row./gi, " ")
        selectString = selectString.replace(/&&/g, ",")
     selectString = selectString.replace(/ /gi, "")
     selectString = selectString.replace(/,/gi, "\",\"")

   console.log(selectString)
  return selectString
};

Blockly.JavaScript['dplyr_mutate'] = function(block) {
  

  var argument0 = block.getFieldValue('newCol');
  var argument1 = Blockly.JavaScript.valueToCode(block, 'Columns',
      Blockly.JavaScript.ORDER_NONE);
     console.log(argument1)

  var mutateString = `.generateSeries({ ${argument0}: row => ${argument1}})`
  mutateString = mutateString.replace(/["']/g, "")
  
 console.log(mutateString)
 return mutateString
};

Blockly.JavaScript['dplyr_summarise2'] = function(block) {
   
  var argument0 =  Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);

    var previous = this.getPreviousBlock();
    var inputBlock = previous.getInputTargetBlock('Columns');
    console.log(inputBlock)

    var summariseString = 
     `.groupBy(row => [row.Index])
    .select(group => {
        return {
            Index: group.first().Index,
            ${argument0},
        }
    }).inflate()`

summariseString = summariseString.replace(/["']/g, "")
summariseString = summariseString.replace(/&&/g, ",")
console.log(summariseString)
return summariseString
  
};


Blockly.JavaScript['dplyr_summarise'] = function(block) {
   
  var argument0 =  Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);

  // grab the columns we want to pivot by from the group by block
  
  // get the previous block
    var previous = this.getPreviousBlock();
    // get the field from the previous block containing the columns
    var inputBlock = previous.getInputTargetBlock('Columns');
    // turn to string
    inputBlock = `${inputBlock}`
    // this returns Column AND Column
    // we need to change that to "Column", "Column"
    inputBlock = "\"" + inputBlock.split(' ').join().replace(/,/g, "\"").replace(/AND/g, ",") + "\""
    console.log(inputBlock)

    var summariseString = 
     `.dropSeries("Index")
     .pivot([${inputBlock}]), {
        Sepal_Width: {Sum: series => series.sum()}
     })`
    
summariseString = summariseString.replace(/AND/g, ",")
console.log(summariseString)
return summariseString
  
};

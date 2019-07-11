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


    var groupbyString = `.groupBy(row => row["${argument0}"]).selectMany(group => group).inflate();`
	 groupbyString = groupbyString.replace(/&&/g, "+")
	 
	 console.log(groupbyString)
  return groupbyString
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


Blockly.JavaScript['dplyr_summarise'] = function(block) {
  
  // need an if else -- if just one summary stat use 
  var argument0 =  Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
  // otherwise if in an and statement use
  

  var summariseString = `.select(group => { return { Species: group.first().Species,
  										 ${argument0},
                      }}).inflate()`
                      //.getSeries("Sepal_Length").average());
  summariseString = summariseString.replace(/["']/g, "")
  summariseString = summariseString.replace(/&&/g, ",")
  console.log(summariseString)
  return summariseString
  
};

Blockly.JavaScript['dplyr_summarise2'] = function(block) {
  
  // need an if else -- if just one summary stat use 
  var argument0 =  Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
  // otherwise if in an and statement use
  

  var summariseString = `.select(group => { return { Species: group.first().Species,
  										 ${argument0},
                      }}).inflate()`
                      //.getSeries("Sepal_Length").average());
  summariseString = summariseString.replace(/["']/g, "")
  summariseString = summariseString.replace(/&&/g, ",")
  console.log(summariseString)
  return summariseString
  
};


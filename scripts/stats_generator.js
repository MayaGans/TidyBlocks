goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.JavaScript['stats_mean'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	console.log(argument0)
	
	var code = `Average_${argument0}: group.deflate(row => row.${argument0}).average()`
    console.log(code)
    return [code, order];
}

Blockly.JavaScript['stats_sd'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	console.log(argument0)
	
	var code = `SD_${argument0}: group.deflate(row => row.${argument0}).std()`
    console.log(code)
    return [code, order];
}

Blockly.JavaScript['stats_sum'] = function(block) {
  
  var order = Blockly.JavaScript.ORDER_NONE
  var argument0 = Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE);
      argument0 = argument0.replace("row.", "")
	console.log(argument0)
	
	var code = `Sum_${argument0}: group.deflate(row => row.${argument0}).sum()`
    console.log(code)
    return [code, order];
}


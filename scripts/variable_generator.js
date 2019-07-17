Blockly.JavaScript['variable_text'] = function(block) {
  // Text value.
  var code = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.JavaScript['variable_columnName'] = function(block) {
  // Text value.
  var code = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
  code = "row." + code.replace(/["']/g, "")
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variable_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.JavaScript['variable_compare'] = function(block) {
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
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var code = `${argument0} ${operator} ${argument1}`
  return [code, order];
};

Blockly.JavaScript['variable_operation'] = function(block) {
  // Operations 'and', 'or'.
  
  var order = Blockly.JavaScript.ORDER_NONE
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
      
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE);
  
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE);
  
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};
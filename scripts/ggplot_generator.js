Blockly.JavaScript['ggplot_histogram'] = function(block) {
  
  var argument0 =  Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE)
  argument0 = argument0.replace(/row./gi, " ")
  var argument1 =  block.getFieldValue("bins")
  
  var histogram = `SPLIT let spec = {
    "width": 700,
    "height": 250,
    "data": { "values": dfArray },
    "mark": "bar",
    "encoding": {
      "x": { "bin": {"maxbins": ${argument1}}, "field": "${argument0}", "type": "quantitative"},
      "y": { "aggregate": "count", "type": 'quantitative'}
    }
  }
  vegaEmbed("#plotOutput", spec, {})`


  return histogram
};

Blockly.JavaScript['ggplot_bar'] = function(block) {
  
    var argument0 =  Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_NONE)
    var argument1 =  Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_NONE);

    var code = `.plot({ chartType: "bar", { x: "${argument0}", y: "${argument1}" }).renderImage("test.png");`
    code = code.replace(/row./gi, " ")
    console.log(code)
  };

Blockly.JavaScript['ggplot_histogram'] = function(block) {
  
  var argument0 =  Blockly.JavaScript.valueToCode(block, 'Columns', Blockly.JavaScript.ORDER_NONE)
  argument0 = argument0.replace(/row./gi, " ")
  var argument1 =  block.getFieldValue("bins")
  
  var histogram = `let spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
    "description": "Create data array but do not display anything.",
    "data": { "values": iris,
    "mark": "bar",
    "encoding": {
      "x": { "bin": {"maxbins": ${argument1}}, "field": "${argument0}", "type": "quantitative"},
      "y": { "aggregate": "count", "type": 'quantitative'}
    }
  }
  vegaEmbed("#dataTableOutput", spec, {})`
   console.log(histogram)
  return histogram
};

Blockly.JavaScript['ggplot_bar'] = function(block) {
  
    var argument0 =  Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_NONE)
    var argument1 =  Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_NONE);

    var code = `.plot({ chartType: "bar", { x: "${argument0}", y: "${argument1}" }).renderImage("test.png");`
    code = code.replace(/row./gi, " ")
    console.log(code)
  };

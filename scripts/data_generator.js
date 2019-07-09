goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.JavaScript['data_sample_1'] = function(block) {
    return 'sampleDF_1'
}

Blockly.JavaScript['data_iris'] = function(block) {
	return 'iris'
}

Blockly.JavaScript['data_url'] = function(block) {

    var argument0 = block.getFieldValue("ext")

    const dfURL = `readCSV("${argument0}")`
    console.log(dfURL)
    return dfURL
}
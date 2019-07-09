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

Blockly.JavaScript['data_urlCSV'] = function(block) {

    var argument0 = block.getFieldValue("ext")

    const dfURL = `const urlDF = readCSV("${argument0}")`
    return dfURL
}

Blockly.JavaScript['data_urlJSON'] = function(block) {

    var argument0 = block.getFieldValue("ext")

    const dfURL = `const urlDF =  
    
    getJSON("${argument0}").then(function(data) {
        var urlDF = data.result;
    });
    console.log(urlDF)`

    return dfURL
}
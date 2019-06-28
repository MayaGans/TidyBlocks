const dataForge = require('data-forge')
	
var sampleDF = new dataForge.DataFrame([
			{
				Col1: 1,
				Col2: 'hello',
				Col3: 'test',	
		
			},
			{
				Col1: 5,
				Col2: 'hello',
				Col3: 'test',		
			},
			{
				Col1: 1,
				Col2: 'good day',
				Col3: 'test',
			},
			{
				Col1: 7,
				Col2: 'good day',
				Col3: 'test2',
			},
	]);

var summarized = sampleDF.groupBy(row => row.Col2 + row.Col3).toString()

console.log(summarized)
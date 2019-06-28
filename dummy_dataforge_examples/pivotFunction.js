const dataForge = require('data-forge')

    var sampleDF_1 = new dataForge.DataFrame([
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

			}
	]);


const pivotted = sampleDF_1.pivot("ColumnToGroupBy", "ColumnToSum", series => series.sum());
console.log(pivotted)
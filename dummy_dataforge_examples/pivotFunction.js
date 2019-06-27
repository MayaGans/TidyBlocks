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

// Group by client.


const summarized = sampleDF_1
    .groupBy(row => row.Col2)
    .select(group => ({
        ClientName: group.first().Col2,
        Amount: group.deflate(row => row.Col1).sum(), // Sum sales per client.
    }))
    .inflate() // Series -> dataframe.
    .toArray(); // Convert to regular JS array.

console.log(summarized)


const columnsToGroupBy = ["Col2", "Col3"];
const pivotted = sampleDF_1
	.pivot(columnsToGroupBy, {
    Col1: {
        OutputColumn1: series => series.sum(),
        OutputColumn2: series => series.average(),
    }
}).inflate().toArray()
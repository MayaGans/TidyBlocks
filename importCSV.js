const papa = require('papaparse');
const dataForge = require('data-forge')

var readCSV = function(my_url) {

    var request = new XMLHttpRequest()
        request.open('GET', my_url, false)  // `false` makes the request synchronous
        request.send(null)
    if (request.status !== 200) {
        console.log('ERROR')
   } else {
     result = papa.parse(request.responseText, {
        header: true
     })
   }
   df = result.data
   data = new dataForge.DataFrame(df)
   return data
}

window.readCSV = readCSV
jQuery.getJSON('http://websitescraper.herokuapp.com/?url=http://ichart.finance.yahoo.com/table.csv?s=RIL.BO&callback=?', function (csvdata) {
  console.log(csvdata.csvToArray());
});
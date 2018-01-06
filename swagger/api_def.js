// See https://github.com/bojand/json-schema-deref
// 
// Installation: npm install json-schema-deref

var deref = require('json-schema-deref');
var fs = require('fs')

var input = process.argv[2];
var output_file = process.argv[3];

var myschema = require(input);

//console.log("myschema = " + JSON.stringify(myschema));

deref(myschema, function(err, fullSchema) {
  if (err) throw err;
  const result = JSON.stringify(fullSchema);
  writeToFile(result, output_file);
  //writeToOuput(result);
});

function writeToOuput(data) {
    console.log(data);
}


function writeToFile(data, output_file) {
  fs.writeFile(output_file, data, function(err) {
    if (err) throw err;
    console.log("The content was saved into " + output_file);
  }); 
}



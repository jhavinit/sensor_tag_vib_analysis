var fs = require('fs');
/*
fs.writeFile('new.json', '[[12312412,28787868]]', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
*/
 
fs.appendFile('old.txt', ', [12312412,28787868]', function (err) {
  if (err) throw err;
  //console.log('Updated!');
});
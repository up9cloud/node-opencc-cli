'use strict';

const fs = require('fs');
const path = require('path');

const async = require('async');
const glob = require('glob');

var from_path = `${__dirname}/../from/**/*`;
if (process.argv[2]) {
  if (fs.lstatSync(process.argv[2]).isFile()) {
    from_path = `${process.argv[2]}`;
  } else {
    from_path = `${process.argv[2]}/**/*`;
  }
}
var options = {};
if (process.argv[3]) {
  options.type = process.argv[3];
}
var escaped = false;
if (process.argv[4] === 'true' ||
  process.argv[4] == true){
  options.json_escaped = true;
}

const convert = require(`${__dirname}/convert.js`);

console.log(`[start] using type ${options.type}`);

glob.sync(from_path).forEach(function (file) {
  let file_path = path.resolve(file);
  console.log(`[convert] ${file_path}`)
  async.waterfall([
    // read
    cb => fs.readFile(file_path, 'utf8', cb),
    (data, cb) => {
      convert(data, options, cb);
    },
    // write
    (data, cb) => fs.writeFile(file_path, data, cb),
  ], (err) => {
    if (err) {
      return console.error(`[skip] ${file_path} ${err.message}`);
    }
    console.log(`[done] ${file_path}`);
  });
});
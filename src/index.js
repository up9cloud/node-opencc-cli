const fs = require('fs')
const path = require('path')

const async = require('async')
const glob = require('glob')

var fromPath = `${__dirname}/../from/**/*`

function usage () {
  console.log(`
Usage: : opencc <PATH> [FORMAT] [ESCAPED]

  PATH:    (required)         source folder or file path, folder means affect all files (recursive).
  FORMAT:  (default is "t2s") format type, see https://github.com/BYVoid/OpenCC
  ESCAPED: (default is false) true: ["軒"] => ["\\u8f69"]
                              false: ["軒"] => ["轩"]
`)
}

if (process.argv[2]) {
  if (fs.lstatSync(process.argv[2]).isFile()) {
    fromPath = `${process.argv[2]}`
  } else {
    fromPath = `${process.argv[2]}/**/*`
  }
} else {
  usage()
  process.exit(2)
}
var options = {}
if (process.argv[3]) {
  options.type = process.argv[3]
} else {
  options.type = 't2s' // traditional chinese to simplified chinese
}
if (
  process.argv[4] === 'true' ||
  process.argv[4] === true
) {
  options.json_escaped = true
}

const convert = require(`${__dirname}/convert.js`)

console.log(`[start] using type ${options.type}`)

glob.sync(fromPath).forEach(function (file) {
  let fromPath = path.resolve(file)
  console.log(`[convert] ${fromPath}`)
  async.waterfall([
    // read
    cb => fs.readFile(fromPath, 'utf8', cb),
    (data, cb) => {
      convert(data, options, cb)
    },
    // write
    (data, cb) => fs.writeFile(fromPath, data, cb)
  ], (err) => {
    if (err) {
      return console.error(`[skip] ${fromPath} ${err.message}`)
    }
    console.log(`[done] ${fromPath}`)
  })
})

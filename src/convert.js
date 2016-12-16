'use strict';

const async = require('async');
// http://byvoid.github.io/OpenCC/1.0.2/node_2demo_8js-example.html
const opencc = require('opencc');

const default_options = {
  type: 't2s',
  json_escaped: false
};

/**
 * [exports description]
 * 
 * @param  {String}   data    input string data
 * @param  {Object}   options see default_options
 * @param  {Function} cb      [description]
 * @return {void}             [description]
 */
module.exports = function (data, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = default_options;
  }
  if (!options) {
    options = {};
  }
  for (let k in default_options) {
    if (!options.hasOwnProperty(k)) {
      options[k] = default_options[k];
    }
  }
  let cc = new opencc(`${options.type}.json`);
  let json_escaped = options.json_escaped;
  let is_json = false;

  async.waterfall([
    // convert json utf8 escaped to unescaped data.
    // \u8f69 => 轩
    cb => {
      try {
        let obj = JSON.parse(data);
        is_json = true;
        data = JSON.stringify(obj);
        return cb(null, data);
      } catch (e) {
        return cb(null, data);
      }
    },
    // convert
    (data, cb) => cc.convert(data, cb),
    // to utf8 escape or not
    // 轩 => \u8f69
    (data, cb) => {
      if (is_json && json_escaped) {
        try {
          data = data.replace(/[\u007f-\uffff]/g, function (c) {
            return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
          });
        } catch (e) {}
      }
      cb(null, data);
    },
  ], cb);
}
// http://byvoid.github.io/OpenCC/1.0.2/node_2demo_8js-example.html
const Opencc = require('opencc')

const defaultOptions = {
  type: 't2s',
  json_escaped: false
}

/**
 * [exports description]
 *
 * @param  {String}   data    input string data
 * @param  {Object}   options see default_options
 * @return {Promise}          [description]
 */
module.exports = async function (data, options) {
  if (typeof options === 'function') {
    options = defaultOptions
  }
  if (!options) {
    options = {}
  }
  for (let k in defaultOptions) {
    if (!options.hasOwnProperty(k)) {
      options[k] = defaultOptions[k]
    }
  }
  let isJson = null
  let isJsonEscaped = options.json_escaped

  try {
    let obj = JSON.parse(data)
    isJson = true
    // make sure to unescaped data. (\u8f69 => 轩)
    if (!options.json_escaped) {
      data = JSON.stringify(obj)
    }
  } catch (e) {
    isJson = false
  }

  // convert
  data = await new Promise((resolve, reject) => {
    let cc = new Opencc(`${options.type}.json`)
    cc.convert(data, (err, converted) => {
      if (err) {
        return reject(err)
      }
      return resolve(converted)
    })
  })

  // to utf8 escape or not
  // 轩 => \u8f69
  if (isJson && isJsonEscaped) {
    try {
      data = data.replace(/[\u007f-\uffff]/g, function (c) {
        return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4)
      })
    } catch (e) {}
  }
  return data
}

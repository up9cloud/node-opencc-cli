const expect = require('chai').expect
const convert = require(`${__dirname}/../src/convert.js`)

describe('test convert.js', function () {
  it('default', async () => {
    let data = await convert('軒')
    expect(data).to.be.equal('轩')
  })
  it('escaped', async () => {
    let data = await convert('["軒"]', {
      json_escaped: true
    })
    expect(data).to.be.equal('["\\u8f69"]')
  })
  it('not escaped', async () => {
    let data = await convert('["軒"]', {
      json_escaped: false
    })
    expect(data).to.be.equal('["轩"]')
  })
})

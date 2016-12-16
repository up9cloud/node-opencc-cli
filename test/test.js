'use strict';

const fs = require('fs');
const expect = require('chai').expect;

const convert = require(`${__dirname}/../src/convert.js`);

describe('test', function () {
  it('沒過老闆會罵1', function (done) {
    convert('軒', null, (err, data) => {
      expect(data).to.be.equal('轩');
      done();
    });
  });
  it('沒過老闆會罵2', function (done) {
    convert('["軒"]', {
      json_escaped: true
    }, (err, data) => {
      expect(data).to.be.equal('["\\u8f69"]');
      done();
    });
  });
  it('沒過老闆會罵3', function (done) {
    convert('["軒"]', {
      json_escaped: false
    }, (err, data) => {
      expect(data).to.be.equal('["轩"]');
      done();
    });
  });
});
'use strict';

var assert = require('assert');
var connect = require('../');
var MemoryCas = require('./memory-cas');

var connection;
if (process.env.CONNECTION) {
  connection = process.env.CONNECTION;
} else {
  connection = new MemoryCas();
}

var client = connect(connection);

client.put(new Buffer('Hello World')).then(function (id) {
  assert(typeof id === 'string');
  return client.get(id);
}).then(function (buffer) {
  assert(Buffer.isBuffer(buffer));
  assert(buffer.toString('utf8') === 'Hello World');
}).done(function () {
  console.log('tests passed')
});

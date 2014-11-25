'use strict';

var zlib = require('zlib');
var Promise = require('promise');
var connect = require('s3cas');

var gzip = Promise.denodeify(zlib.gzip);
var gunzip = Promise.denodeify(zlib.gunzip);

module.exports = function connectGzip(connection, options) {
  if (!connection) {
    throw new Error('You must provide s3cas with a connection');
  }
  if (typeof connection === 'string' ||
      (connection &&
       typeof connection.key === 'string' &&
       typeof connection.secret === 'string' &&
       typeof connection.bucket === 'string')) {
    connection = connect(connection, options);
  }
  var c = new Client(connection);
  return {
    put: c.put.bind(c),
    get: c.get.bind(c),
    verify: c.verify.bind(c)
  };
}

function Client(subclient) {
  this._subclient = subclient;
}
Client.prototype.verify = function (id) {
  return this._subclient.verify(id);
};
Client.prototype.get = function (id) {
  return this._subclient.get(id).then(gunzip);
};
Client.prototype.put = function (buffer) {
  return gzip(buffer).then(this._subclient.put.bind(this._subclient));
};

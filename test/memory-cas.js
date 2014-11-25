'use strict';

var crypto = require('crypto');
var Promise = require('promise');

function getId(buffer, algorithm) {
  return crypto.createHash(algorithm).update(buffer).digest('hex');
}

module.exports = Client;
function Client(options) {
  this._store = {};
  this._algorithm = (options && options.algorithm) || 'sha512';
}
Client.prototype.verify = function (id) {
  if (getId(this._store[id], this._algorithm) === id) {
    return Promise.resolve(id);
  } else {
    return Promise.reject(new Error('failed to verify id'));
  }
};
Client.prototype.put = function (buffer) {
  return Promise.resolve(null).then(function () {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('You can only put buffers');
    }
    var id = getId(buffer, this._algorithm);
    this._store[id] = buffer;
    return id;
  }.bind(this));
};
Client.prototype.get = function (id) {
  return this.verify(id).then(function () {
    return this._store[id];
  }.bind(this));
};

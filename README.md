# s3cas-gzip

Content addressable gzipped storage on top of S3

[![Build Status](https://img.shields.io/travis/ForbesLindesay/s3cas-gzip/master.svg)](https://travis-ci.org/ForbesLindesay/s3cas-gzip)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/s3cas-gzip.svg)](https://david-dm.org/ForbesLindesay/s3cas-gzip)
[![NPM version](https://img.shields.io/npm/v/s3cas-gzip.svg)](https://www.npmjs.org/package/s3cas-gzip)

## Installation

    npm install s3cas-gzip

## Usage

```js
var assert = require('assert');
var connect = require('s3cas-gzip');

var client = connect(process.env.CONNECTION);

client.put(new Buffer('Hello World')).then(function (id) {
  assert(typeof id === 'string');
  return client.get(id);
}).then(function (buffer) {
  assert(Buffer.isBuffer(buffer));
  assert(buffer.toString('utf8') === 'Hello World');
}).done(function () {
  console.log('tests passed')
});
```

```
CONNECTION="{key}@{secret}@{bucket}" node test
```

## License

  MIT

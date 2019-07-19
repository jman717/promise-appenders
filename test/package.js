const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "Jim Manton"
  },
  "bundleDependencies": false,
  "dependencies": {
    "colors": "*",
    "log4js-tagline": "^2.1.15",
    "mocha": "^6.2.0",
    "sinon": "^7.3.2"
  },
  "scripts": {
    "start": "node app.js",
    "test": "mocha"
  },
  "keywords": [
    "mocha",
    "sinon",
    "logging",
    "log",
    "log4js",
    "log4js-tagline",
    "appenders",
    "node"
  ],
  "deprecated": false,
  "description": "Module cross check tests via mocha.",
  "email": "jrman@risebroadband.net",
  "license": "ISC",
  "main": "app.js",
  "name": "mocha-healthcheck",
  "start": "node app.js",
  "version": "1.0.0"
}

describe('package.json', function () {
    it('should pass', function () {
        assert(!jsonHasDifferences(packagejson, packageMock, true))
    })

    it('should fail', function () {
        packageMock.version = '0'
        assert(jsonHasDifferences(packagejson, packageMock, true))
    })
})

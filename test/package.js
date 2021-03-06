const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "Jim Manton"
  },
  "bundleDependencies": false,
  "dependencies": {
    "colors": "^1.4.0",
    "log4js-tagline": "^2.3.8",
    "mocha": "^8.3.2",
    "sinon": "^9.2.4",
    "time-span": "^4.0.0"
  },
  "scripts": {
    "start": "node app.js",
    "test": "mocha"
  },
  "keywords": [
    "promise",
    "mocha",
    "sinon",
    "logging",
    "log",
    "log4js",
    "log4js-tagline",
    "appenders",
    "node"
  ],
  "homepage": "https://github.com/jman717/promise-appenders",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jman717/promise-appenders.git"
  },
  "deprecated": false,
  "description": "Extend the functionality of promises with configurable appenders.",
  "email": "jrman@risebroadband.net",
  "license": "ISC",
  "main": "app.js",
  "name": "promise-appenders",
  "start": "node app.js",
  "version": "1.3.3"
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

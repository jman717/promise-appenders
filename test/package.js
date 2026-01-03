const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "Jim Manton"
  },
  "version": "1.3.9",
  "bundleDependencies": [],
  "dependencies": {
    "colors": "^1.4.0",
    "compare-json-difference": "^0.1.3",
    "log4js-tagline": "^5.3.29",
    "mocha": "^11.7.5",
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
  "start": "node app.js"
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

var assert = require('assert')

describe('app', function () {

    describe('require', function () {

        it('server', function () {
            assert.throws(() =>
                hs = require('./lib/helper/serverUUU.js'),
                Error
            )
        })
    })
})
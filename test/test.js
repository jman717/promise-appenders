var assert = require('assert'),
    mocha = require('../app.js'),
    sinon = require("sinon"),
    atest = require('../test.js')

describe('app', function () {

    describe('module', function () {
        var tst, mocha_health

        beforeEach(function () {
            mocha_health = new mocha()
            tst = new atest({ "params": "something" })
        })

        it('tst.constructor', function () {
            mocha_health.assert({ "_function": tst.constructor })
        })

        it('tst.do_something', function () {
            mocha_health.assert({ "_function": tst.do_something })
        })

        it('test proxy function', function () {
            var callback = sinon.fake()

            tst.say_name(callback)

            assert(callback);
        });
    })
})

var assert = require('assert'),
    sinon = require('sinon')

describe('base', function () {
    var app, tapp
    beforeEach(function () {
        application = require('../app.js')
        app = new application().set({
            "appenders": [
                { "type": "environment", "name": "test" },
                { "type": "promise", "name": "a_promise" }
            ]
        })
    })

    it('app.appenders_array[i].set should fail without parameters', function () {
        assert.throws(obj => app.appenders_array[0].set(), Error)
    })

    it('app.appenders_array[i].set should pass with parameters', function () {
        var callback = sinon.stub()
        callback.returns(assert(true))
        app.appenders_array[0].set({ "event": "reject", "callback": callback })
    })

    it('app.appenders_array[i].do should fail without parameters', function () {
        assert.throws(obj => app.appenders_array[0].do(), Error)
    })

    it('app.appenders_array[i].do should pass with parameters', function () {
        app.appenders_array[0].do({ "event": "reject", "message": "a message" })
    })    
})
var assert = require('assert'),
    sinon = require('sinon')

describe('app', function () {
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

    it('app.constructor should pass without parameters', function () {
        assert(() => tapp = new application())
    })

    it('app.set should fail without parameters', function () {
        assert.throws(obj => tapp.set(), Error)
    })

    it('app.set should pass with parameters', function () {
        assert(app.set({
            "appenders": [
                { "type": "environment", "name": "test" }
            ]
        }))
    })

    it('app.on should fail without parameters', function () {
        assert.throws(obj => app.on(), Error)
    })

    it('app.on should pass with parameters', function () {
        assert(app.on({ "name": "a_promise", "event": "event", "callback": function () { } }))
    })

    it('app.do should fail without parameters', function () {
        assert.throws(obj => app.do(), Error)
    })

    it('app.do should pass with parameters', function () {
        assert(app.do({ "name": "a_promise", "event": "reject", "message": "some message" }))
    })

    it('app.getByName should fail without parameters', function () {
        assert.throws(obj => app.getByName(), Error)
    })

    it('app.getByName should pass with parameters', function () {
        assert(app.getByName("a_promise"))
    })

    it('app.getByType should fail without parameters', function () {
        assert.throws(obj => app.getByType(), Error)
    })

    it('app.getByType should pass with parameters', function () {
        assert(app.getByType("promise"))
    })

    it('app.getSummary should fail without callback', function () {
        assert.throws(obj => app.main(), Error)
    })

    it('app.getSummary should pass with parameters', function () {
        assert(app.getSummary({ "include": [], "message": "some message" }))
    })
    
    it('app.getSummary should pass with all for include', function () {
        assert(app.getSummary({ "include": "all", "message": "some message" }))
    })
})
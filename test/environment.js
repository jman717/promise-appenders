var assert = require('assert')

describe('environment', function () {
    var app
    beforeEach(function () {
        application = require('../app.js')
    })

    it('app.set should fail without parameters', function () {
        assert.throws(app => new application().set(), Error)
    }) 
    
    it('app.set should fail without parameters', function () {
        assert(app => new application().set({
            "appenders": [
                { "type": "environment", "name": "test" }
            ]
        }))
    })   
})
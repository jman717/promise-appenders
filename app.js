"use strict"

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
* Main processing app
*/

var colors = require('colors')
module.exports = class promise_appenders {
    constructor() {
        var t = this
        try {
            console.log('jrm debug 10.00')
        } catch (e) {
            e.message = "mocha_heathcheck.constructor error: " + e.message
            console.log(e.message.red)
        }
    }
}

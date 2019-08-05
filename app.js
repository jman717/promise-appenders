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
        t.appenders_array = []
        t.appenders_dir = './lib/appenders/'
        t.message = "default message"
        t.summary = { "message": "" }
        t.log = Object;
        ["trace", "debug", "info", "warn", "error", "fatal", "mark"].forEach(name => {
            t.log[name] = function (m) { console.log(m.yellow) }
        })
        return t
    }

    set({ appenders, message }) {
        var t = this, a, o, r
        try {
            if (appenders != null) {

                if (typeof appenders == 'undefined')
                    throw new Error('appenders are undefined')
                if (typeof appenders.length != 'number')
                    throw new Error('appenders array is undefined')
                appenders.forEach(element => {
                    if (typeof element.type == 'undefined')
                        throw new Error('element.type is undefined')
                    if (typeof element.name == 'undefined')
                        throw new Error('element.name is undefined')
                    if (typeof element.parent == 'undefined')
                        element.parent = t
                    a = t.appenders_dir + element.type + '.js'
                    r = require(a)
                    o = new r(element)
                    t.appenders_array.push(o)
                    console.log('promise_appenders loading=' + a.yellow)
                })
            }
            if (message != null) {
                t.message = message
            }
            return t
        } catch (e) {
            e.message = "promise_appenders app.js appender error: " + e.message
            t.log.error(e.message)
            throw (e)
        }
    }

    on({ name, event, callback }) {
        var t = this, element
        try {
            if (typeof name == 'undefined')
                throw new Error('name is undefined')
            if (typeof event == 'undefined')
                throw new Error('event is undefined')
            if (typeof callback == 'undefined')
                throw new Error('callback is undefined')
            element = t.getByName(name)
            element.set({ event, callback })
            return t
        } catch (e) {
            e.message = "promise_appenders.on error: " + e.message
            console.log(e.message.red)
            throw (e)
        }
    }

    getByName(name) {
        var t = this
        try {
            if (typeof name == 'undefined')
                throw new Error('name is undefined')
            for (let i = 0; i < t.appenders_array.length; i++) {
                if (t.appenders_array[i].name == name)
                    return t.appenders_array[i]
            }
            throw new Error('not found(' + name + ')')
        } catch (e) {
            e.message = "promise_appenders.getByName error: " + e.message
            console.log(e.message.red)
            throw (e)
        }
    }

    getByType(type) {
        var t = this
        try {
            if (typeof type == 'undefined')
                throw new Error('type is undefined')
            for (let i = 0; i < t.appenders_array.length; i++) {
                if (t.appenders_array[i].type == type)
                    return t.appenders_array[i]
            }
            return null
        } catch (e) {
            e.message = "promise_appenders.getByType error: " + e.message
            console.log(e.message.red)
            throw (e)
        }
    }

    do({ name, event, message }) {
        var t = this, element
        try {
            if (typeof name == 'undefined')
                throw new Error('name is undefined')
            if (typeof event == 'undefined')
                throw new Error('event is undefined')
            if (typeof message == 'undefined')
                throw new Error('message is undefined')
            element = t.getByName(name)
            element.do({ event, message })
            return t
        } catch (e) {
            e.message = "promise_appenders.do error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }

    main(callback) {
        var t = this, data, environment, promise, time
        try {
            if (typeof callback == 'undefined')
                throw new Error('callback is undefined')
            for (let i = 0; i < t.appenders_array.length; i++)
                t.summary = Object.assign(t.summary, t.appenders_array[i].summary)

                callback(t.summary)
        } catch (e) {
            e.message = "promise_appenders.do error: " + e.message
            throw (e)
        }
    }
}


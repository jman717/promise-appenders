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
        try {
            console.log('jrm debug appenders')
            /*
            if (promise_appenders.singleton) {
                return promise_appenders.singleton
            }
            */

            /*
            Promise.prototype.say_what = function () {
                console.log('jrm debug 10.01 say_what')
            }
            console.log('jrm debug 9.00(' + typeof Promise.say_what + ')')
            console.log('jrm debug goo1(' + typeof Promise.prototype['goober'] + ')')
            
            Promise.prototype['goober'] = function goober() {console.log('jrm debug goober')}
           t.promise = new Promise(function (resolve, reject) {
                t.resolve = resolve
                t.reject = reject
                //this.goober('Success!');
            }).then(data => {
                console.log('jrm debug resolve(' + data + ')')
            },
                reject => {
                    console.log('jrm debug reject(' + reject + ')')
                }
            )
            */

            //t.promise.goober()
            return t
            /*
            promise_appenders.singleton = t
            return promise_appenders.singleton
            */
        } catch (e) {
            e.message = "promise_appenders.constructor error: " + e.message
            console.log(e.message.red)
        }
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
                    console.log('tagline appender file loading=' + a.green)
                })
            }
            if (message != null) {
                console.log('jrm debug 77(' + message + ')')
                t.message = message
            }
            return t
        } catch (e) {
            e.message = "promise_appenders app.js appender error: " + e.message
            console.log(e.message.red)
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
            console.log('jrm debug 22.33(' + JSON.stringify(arguments) + ')')
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
                if (t.appenders_array[i].name == name) {
                    console.log('jrm debug GOT A HOT ONE(' + name + ')')
                    return t.appenders_array[i]
                }
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
                if (t.appenders_array[i].type == type) {
                    console.log('jrm debug GOT A HOT TYPE(' + type + ')')
                    return t.appenders_array[i]
                }
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
            data = { "message": t.message}
            environment = t.getByType('environment')
            data.environment = (environment == null) ? 'na' : environment.name
            promise = t.getByType('promise')
            data.promise = {"name": ""}
            data.promise.name = (promise == null) ? 'na' : promise.name
            time = t.getByType('time-tracker')
            data.time = (time == null) ? 'na' : time.time
            callback(data)
        } catch (e) {
            e.message = "promise_appenders.do error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }
    /*
    on(what, callback) {
        var t = this, what_callback
        t[what + '_callback'] = callback
        return t
        /*
        var environmentX = 'somethingX'
        console.log('jrm debug 13.01(' + typeof callback + ')')
        */ /*
}
*/
}


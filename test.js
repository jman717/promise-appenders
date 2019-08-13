/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
* Test with log4js-tagline, promises, time-tracker appenders
*/

var colors = require('colors'),
    pro_appenders = require('./app.js'),
    log, lne, cfu, tcf

atst = new pro_appenders().set({
    "appenders": [
        { "type": "environment", "name": "test" },
        { "type": "log4js-tagline", "name": "logging" },
        { "type": "promise", "name": "a_promise" },
        { "type": "promise", "name": "another_promise" },
        { "type": "time-tracker", "name": "time-track" },
        { "type": "time-span", "name": "time-track-span" }
    ]
})
    .on({
        "name": "logging", "event": "init", "callback": lg => {
            lg.log4js.configure({
                appenders: { myLog: { type: 'file', filename: 'my.log' } },
                categories: { default: { appenders: ['myLog'], level: 'debug' } }
            })

            lg.tagline = new lg.log4js_tagline(lg.log4js, {
                "display": ["trace", "debug", "info", "warn", "error", "fatal", "mark"],
                "output": {
                    "to_console": {
                        "show": true, "color": {
                            "trace": "blue",
                            "debug": "bgCyan",
                            "info": "blue",
                            "warn": "yellow",
                            "error": "red",
                            "fatal": "red",
                            "mark": "bgBlue"
                        }
                    },      /* send output to console.log */
                    "to_local_file": true,   /* send output to the local file */
                    "to_datadog": false        /* send output to datadog (when the datadog appender is configured) */
                }
            })

            lg.log = lg.log4js.getLogger('myLog')
            lg.log.level = 'debug'
            log = lg.log

            append = lg.tagline.appender('line')
            lne = new append(lg.tagline).setConfig({ "format": "lne(@name(): @file:@line:@column)" })
            append = lg.tagline.appender('error')
            err = new append(lg.tagline)
            log.info('this is an info line').tag(lne).tagline()
            try {
                throw new Error('Some error is thrown here.')
            } catch (e) {
                log.error('error line goes here').tag(err.setError(e)).tag(lne).tagline()
            }

            append = lg.tagline.appender('class_function')
            cfu = new append(lg.tagline)
        }
    })
    .on({
        "name": "another_promise", "event": "reject", "callback": json_data => {
            log.error('promise reject json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
        }
    })
    .on({
        "name": "another_promise", "event": "resolve", "callback": json_data => {
            log.mark('promise resolve json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
        }
    })
    .on({
        "name": "a_promise", "event": "reject", "callback": json_data => {
            log.error('promise reject json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
        }
    })
    .on({
        "name": "a_promise", "event": "resolve", "callback": json_data => {
            log.info('promise resolve json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
        }
    })
    .on({
        "name": "time-track", "event": "start", "callback": json_data => {
            log.debug('time start json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
        }
    })
    .on({
        "name": "time-track", "event": "stop", "callback": json_data => {
            log.debug('time stop json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
        }
    })
    .on({
        "name": "time-track-span", "event": "start", "callback": json_data => {
            log.debug('time start json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
        }
    })
    .on({
        "name": "time-track-span", "event": "stop", "callback": json_data => {
            log.debug('time stop json(' + JSON.stringify(json_data) + ')').tag(lne).tagline()
            atst.do({ "name": "another_promise", "event": "resolve", "message": atst.getSummary({ "include": ["another_promise", "time-track-span"], "message": "another_promise test done" }) })
        }
    })

atst.do({ "name": "logging", "event": "init", "message": "init" })
    .do({ "name": "time-track-span", "event": "start", "message": "start" })
    .do({ "name": "time-track", "event": "start", "message": "start" })

class testClass {
    test_function() {
        atst.log.debug('This will display the class/function name.').tag(cfu).tagline()
    }
}

tcf = new testClass

setTimeout(function () {

    try {
        atst.log.info('This is start of test').tagline()
        //process coding goes here. When complete stop the timer
        atst.do({ "name": "time-track", "event": "stop", "message": "stop" })
        setTimeout(function () {
            try {
                tcf.test_function() //show how the debug will log the name of the class/function
                //some other processing is done. When finished stop the second timer
                atst.do({ "name": "time-track-span", "event": "stop", "message": "stop" })
            } catch (e) {
                atst.do({ "name": "another_promise", "event": "reject", "message": e.message })
            }
        }, 1000)
        //throw new Error('some error thrown here')
        //atst.do({ "name": "a_promise", "event": "resolve", "message": atst.getSummary({ "include": ["a_promise", "time-track"], "message": "a_promise test done"})})
        atst.do({ "name": "a_promise", "event": "resolve", "message": atst.getSummary({ "include": "all", "message": "a_promise test done with all parameter" }) })  //include: all will give you all summaries
        atst.log.info('This is the end of test').tagline()
    } catch (e) {
        atst.do({ "name": "a_promise", "event": "reject", "message": e.message })
    }
}, 2000)


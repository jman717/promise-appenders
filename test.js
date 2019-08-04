
var colors = require('colors'),
    pro_appenders = require('./app.js'),
    log, lne

atst = new pro_appenders().set({
    "appenders": [
        { "type": "environment", "name": "test" },
        { "type": "log4js-tagline", "name": "logging" },
        { "type": "promise", "name": "a_promise" },
        { "type": "time-tracker", "name": "time-track" }
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
                            "mark": "white"
                        }
                    },      /* send output to console.log */
                    "to_local_file": true,   /* send output to the local file */
                    "to_datadog": false        /* send output to datadog (when the datadog appender is configured) */
                }
            })

            lg.log = lg.log4js.getLogger('myLog')
            lg.log.level = 'debug'
            log = lg.log
            lg.parent.log = lg.log

            append = lg.tagline.appender('line')
            lne = new append(lg.tagline).setConfig({ "format": "lne(@name(): @file:@line:@column)" })
            append = lg.tagline.appender('error')
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
atst.do({ "name": "logging", "event": "init", "message": "init" })
    .do({ "name": "time-track", "event": "start", "message": "start" })

setTimeout(function () {

    atst.main(data => {
        try {
            //process coding goes on here. When complete stop the timer
            atst.log.info('This is start of test').tagline()
            atst.do({ "name": "time-track", "event": "stop", "message": "stop" })
            data.message = "promise test done"
            //code goes here
            //throw new Error('some error thrown here')
            atst.do({ "name": "a_promise", "event": "resolve", "message": data })
            atst.log.info('This is the end of test').tagline()
        } catch (e) {
            atst.do({ "name": "a_promise", "event": "reject", "message": e.message })
        }
    })
}, 500)


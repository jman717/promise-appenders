
Extend the functionality of promises with configurable appenders.

Included appenders:

* promise - a basic promise
* log4js-tagline - log to file, console, to datadog
* environment - define what environment you're dealing with (example: test, stage, or production)
* time-tracker - Start the timer, stop the timer. How many seconds does it take to complete a task, a loop, a process.
* time-span - Start the timer, stop the timer. A more precise measurement of time: seconds, milliseconds, nanoseconds are all included.

Installation
---------
```
npm install promise-appendure
```

Mocha Test
---------
```
npm test
```

General Setup Test
---------
```
node test
node test2
```

Usage
---------
```js

var colors = require('colors'),
    pro_appenders = require('promise-appenders'),
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

....
```

Expected my.log file output sample
---------
```
[2019-08-13T14:05:18.344] [info] myLog - (msg: this is an info line) lne(init_callback(): promise-appenders/test.js:55:17)
[2019-08-13T14:05:18.347] [error] myLog - (msg: error line goes here) error(log4js_tagline.callback: Some error is thrown here.) lne(init_callback(): promise-appenders/test.js:59:21)
[2019-08-13T14:05:18.351] [debug] myLog - (msg: time start json({"time":{"name":"time-track-span","data":{"start":[617755,914044300],"stop":"","seconds":"","milliseconds":"","nanoseconds":""}}})) lne(start_callback(): promise-appenders/test.js:98:17)
[2019-08-13T14:05:18.353] [debug] myLog - (msg: time start json({"time":{"name":"time-track","data":{"start":"8/13/2019 14:5:18","stop":"","seconds":""}}})) lne(start_callback(): promise-appenders/test.js:88:17)
[2019-08-13T14:05:20.371] [info] myLog - (msg: This is start of test)
[2019-08-13T14:05:20.374] [debug] myLog - (msg: time stop json({"time":{"name":"time-track","data":{"start":"8/13/2019 14:5:18","stop":"8/13/2019 14:5:20","seconds":2}}})) lne(stop_callback(): promise-appenders/test.js:93:17)
[2019-08-13T14:05:20.376] [info] myLog - (msg: This is the end of test)
[2019-08-13T14:05:20.378] [info] myLog - (msg: promise resolve json({"success":[{"message":"a_promise test done with all parameter"},{"environment":"test"},{"logging":"log4js-tagline"},{"name":"a_promise","type":"promise"},{"name":"another_promise","type":"promise"},{"time":{"name":"time-track","data":{"start":"8/13/2019 14:5:18","stop":"8/13/2019 14:5:20","seconds":2}}},{"time":{"name":"time-track-span","data":{"start":[617755,914044300],"stop":"","seconds":"","milliseconds":"","nanoseconds":""}}}]})) lne(resolve_callback(): promise-appenders/test.js:83:17)
[2019-08-13T14:05:21.388] [debug] myLog - (msg: This will display the class/function name.) class/function name(testClass.test_function)
[2019-08-13T14:05:21.396] [debug] myLog - (msg: time stop json({"time":{"name":"time-track-span","data":{"start":[617755,914044300],"stop":[617758,952748299],"seconds":3.039076,"milliseconds":3041,"nanoseconds":3041747800}}})) lne(stop_callback(): promise-appenders/test.js:103:17)
[2019-08-13T14:05:21.401] [mark] myLog - (msg: promise resolve json({"success":[{"message":"another_promise test done"},{"name":"another_promise","type":"promise"},{"time":{"name":"time-track-span","data":{"start":[617755,914044300],"stop":[617758,952748299],"seconds":3.039076,"milliseconds":3041,"nanoseconds":3041747800}}}]})) lne(resolve_callback(): promise-appenders/test.js:73:17)

```

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
* Test with console, promises, time-tracker appenders
*/

var colors = require('colors'),
    pro_appenders = require('./app.js'),
    log, lne, tcf

atst = new pro_appenders().set({
    "appenders": [
        { "type": "environment", "name": "test" },
        { "type": "promise", "name": "a_promise" },
        { "type": "promise", "name": "another_promise" },
        { "type": "time-tracker", "name": "time-track" },
        { "type": "time-span", "name": "time-track-span" }
    ]
})
    .on({
        "name": "another_promise", "event": "reject", "callback": json_data => {
            console.log('promise reject json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "another_promise", "event": "resolve", "callback": json_data => {
            console.log('promise resolve json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "a_promise", "event": "reject", "callback": json_data => {
            console.log('promise reject json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "a_promise", "event": "resolve", "callback": json_data => {
            console.log('promise resolve json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "time-track", "event": "start", "callback": json_data => {
            console.log('time start json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "time-track", "event": "stop", "callback": json_data => {
            console.log('time stop json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "time-track-span", "event": "start", "callback": json_data => {
            console.log('time start json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "time-track-span", "event": "stop", "callback": json_data => {
            console.log('time stop json(' + JSON.stringify(json_data) + ')')
            atst.do({ "name": "another_promise", "event": "resolve", "message": atst.getSummary({ "include": ["another_promise", "time-track-span"], "message": "another_promise test done" }) })
        }
    })

atst.do({ "name": "time-track-span", "event": "start", "message": "start" })
    .do({ "name": "time-track", "event": "start", "message": "start" })

setTimeout(function () {

    try {
        console.log('This is start of test')
        //process coding goes here. When complete stop the timer
        atst.do({ "name": "time-track", "event": "stop", "message": "stop" })
        setTimeout(function () {
            try {
                //some other processing is done. When finished stop the second timer
                atst.do({ "name": "time-track-span", "event": "stop", "message": "stop" })
            } catch (e) {
                atst.do({ "name": "another_promise", "event": "reject", "message": e.message })
            }
        }, 800)
        //throw new Error('some error thrown here')
        //atst.do({ "name": "a_promise", "event": "resolve", "message": atst.getSummary({ "include": ["a_promise", "time-track"], "message": "a_promise test done"})})
        atst.do({ "name": "a_promise", "event": "resolve", "message": atst.getSummary({ "include": "all", "message": "a_promise test done with all parameter" }) })  //include: all will give you all summaries
        console.log('This is the end of test')
    } catch (e) {
        atst.do({ "name": "a_promise", "event": "reject", "message": e.message })
    }
}, 1500)


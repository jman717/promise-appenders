/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
* Test with console, promises, time-tracker appenders
*/

var colors = require('colors'),
    pro_appenders = require('./app.js'),
    log, lne

atst = new pro_appenders().set({
    "appenders": [
        { "type": "environment", "name": "test" },
        { "type": "promise", "name": "a_promise" },
        { "type": "time-tracker", "name": "time-track" }
    ]
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
atst.do({ "name": "time-track", "event": "start", "message": "start" })

setTimeout(function () {

    atst.main(data => {
        try {
            //process coding goes on here. When complete stop the timer
            console.log('This is start of test')
            atst.do({ "name": "time-track", "event": "stop", "message": "stop" })
            data.message = "promise test done"
            //code goes here
            //throw new Error('some error thrown here')
            atst.do({ "name": "a_promise", "event": "resolve", "message": data })
            console.log('This is the end of test')
        } catch (e) {
            atst.do({ "name": "a_promise", "event": "reject", "message": e.message })
        }
    })
}, 500)


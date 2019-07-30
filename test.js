
var colors = require('colors'),
    pro_appenders = require('./app.js')


console.log('promise test 10.00')
/*
var atst = new pro_appenders().set({"environment": "test"})
var atst2 = new pro_appenders().set({"environment": "production"})
atst.getX(data => {
    console.log('jrm debug 14(' + data + ')')
})
atst.on('environment', function(env) {
    console.log('jrm debug 16(' + env + ')')
}).then( resolve => {
    console.log('jrm debug resolve 10.00(' + resolve + ')')
}, reject => {
    console.log('jrm debug reject 20.00(' + reject + ')')
})

atst.on('environment', function(env) {
    console.log('jrm debug 17(' + env + ')')
}).on('resolve', function(resolve) {
    console.log('jrm debug 17 resolve(' + resolve + ')')
}).on('reject', function(reject) {
    console.log('jrm debug 17 reject(' + reject + ')')
}).on('start_timer', function(data) {
    console.log('jrm debug 17 start_timer data(' + data + ')')
})
*/

atst = new pro_appenders().set({
    "appenders": [
        { "type": "environment", "name": "test" },
        { "type": "promise", "name": "a_promise" },
        { "type": "time-tracker", "name": "time" }
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
        "name": "time", "event": "start", "callback": json_data => {
            console.log('time start json(' + JSON.stringify(json_data) + ')')
        }
    })
    .on({
        "name": "time", "event": "stop", "callback": json_data => {
            console.log('time stop json(' + JSON.stringify(json_data) + ')')
        }
    })
atst.do({ "name": "time", "event": "start", "message": "start" })
setTimeout(function () {
    atst.do({ "name": "time", "event": "stop", "message": "stop" })

    atst.main(data => {
        try {
            data.message = "put some individualized message here"
            //code goes here
            //throw new Error('some error thrown here')
            atst.do({ "name": "a_promise", "event": "resolve", "message": data })
        } catch (e) {
            atst.do({ "name": "a_promise", "event": "reject", "message": e.message })
        }
    })
}, 2500)


//atst.reject('not so cool')
/*
atst.resolve('cool')
atst.start_timer('cool start timer')
atst.environment()
atst.reject('rejected')
*/
console.log('promise test done')

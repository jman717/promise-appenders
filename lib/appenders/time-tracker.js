"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
*/

var base = require('./base.js');

var owner
module.exports = class promises extends base {
	constructor({ type, name, parent }) {
		super({ type, name, parent })
		var t = this
		t.start_callback = function () { }
		t.stop_callback = function () { }
		t.time = {"start": "", "stop": "", "seconds": ""}
		owner = t

		return t
	}

    calculate_processing_seconds() {
        var t = owner
        try {
            var df = new Date(t.time.stop),
                ds = new Date(t.time.start),
                dsf = df - ds
            t.processing_seconds = dsf / 1000

        } catch (e) {
            e.message = 'check.end_timestamp error: ' + e.message
            throw (e)
        }
    }

    get_timestamp() {
        var t = owner
        try {
            var d = new Date, dt = [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':')
            return dt
        } catch (e) {
            e.message = 'check.end_timestamp error: ' + e.message
            throw (e)
        }
	}
	
	do({ event, message }) {
		super.do({ event, message })
		var t = this, s
		try {
			switch (event) {
				case 'start':
					t.time.start = t.get_timestamp()
					t.start_callback(t.time)
					break
				case 'stop':
					t.time.stop = t.get_timestamp()
					t.calculate_processing_seconds()
					t.time.seconds = t.processing_seconds
					t.stop_callback(t.time)
					break
				default:
					throw new Error('event(' + event + ') not defined')
			}
			return t
		} catch (e) {
			e.message = "promises.base.set error: " + e.message
			console.log(e.message.red)
			throw (e)
		}
	}
}
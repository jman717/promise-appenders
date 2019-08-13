"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
*/

var base = require('./base.js')

module.exports = class time_span extends base {
	constructor({ type, name, parent }) {
		super({ type, name, parent })
		var t = this
		t.start_callback = function () { }
		t.stop_callback = function () { }
		t.summary = { "time": { "name": t.name, "data": { "start": "", "stop": "", "seconds": "", "milliseconds": "", "nanoseconds": "" } } }
		t.timeSpan = require('time-span')
		t.end = t.timeSpan()
		t.timeSpan
		t.end

		return t
	}

	do({ event, message }) {
		super.do({ event, message })
		var t = this, s
		try {
			switch (event) {
				case 'start':
					t.timeSpan = require('time-span')
					t.end = t.timeSpan()
					t.summary.time.data.start = process.hrtime()
					t.start_callback(t.summary)
					break
				case 'stop':
					t.summary.time.data.stop = process.hrtime()
					t.summary.time.data.seconds = t.end.seconds()
					t.summary.time.data.milliseconds = t.end.rounded()
					t.summary.time.data.nanoseconds = t.end.nanoseconds()
					
					t.stop_callback(t.summary)
					break
				default:
					throw new Error('event(' + event + ') not defined')
			}
			return t
		} catch (e) {
			e.message = "time_tracker.do error: " + e.message
			throw (e)
		}
	}
}
"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
*/

var base = require('./base.js');

module.exports = class time_tracker extends base {
	constructor({ type, name, parent }) {
		super({ type, name, parent })
		var t = this
		t.start_callback = function () { }
		t.stop_callback = function () { }
		t.summary = { "time": { "name": t.name, "data": { "start": "", "stop": "", "seconds": "" } } }

		return t
	}

	calculate_processing_seconds() {
		var t = this
		try {
			var df = new Date(t.summary.time.data.stop),
				ds = new Date(t.summary.time.data.start),
				dsf = df - ds
			t.processing_seconds = dsf / 1000

		} catch (e) {
			e.message = 'time_tracker.calculate_processing_seconds error: ' + e.message
			throw (e)
		}
	}

	get_timestamp() {
		var t = this
		try {
			var d = new Date, dt = [d.getMonth() + 1,
			d.getDate(),
			d.getFullYear()].join('/') + ' ' +
				[d.getHours(),
				d.getMinutes(),
				d.getSeconds()].join(':')
			return dt
		} catch (e) {
			e.message = 'time_tracker.get_timestamp error: ' + e.message
			throw (e)
		}
	}

	do({ event, message }) {
		super.do({ event, message })
		var t = this, s
		try {
			switch (event) {
				case 'start':
					t.summary.time.data.start = t.get_timestamp()
					t.start_callback(t.summary)
					break
				case 'stop':
					t.summary.time.data.stop = t.get_timestamp()
					t.calculate_processing_seconds()
					t.summary.time.data.seconds = t.processing_seconds
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
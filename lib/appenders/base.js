"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
*/
var colors = require('colors')

module.exports = class base {
	constructor({ type, name, parent }) {
		var t = this
		t.type = type
		t.name = name
		t.parent = parent
		t.parent.logging('jrm debug this is from(' + name + ')')
	}

	set({ event, callback }) {
		var t = this
		try {
			if (typeof event == 'undefined')
				throw new Error('event is undefined')
			if (typeof callback == 'undefined')
				throw new Error('callback is undefined')
			if (typeof event == 'string' && typeof callback == 'function') {
				t[event + '_callback'] = callback
			}
			return t
		} catch (e) {
			e.message = "promises.base.set error: " + e.message
			console.log(e.message.red)
			throw (e)
		}
	}

	do({ event, message }) {
		var t = this, s
		try {
			if (typeof event == 'undefined')
				throw new Error('event is undefined')
			if (typeof message == 'undefined')
				throw new Error('message is undefined')
			return t
		} catch (e) {
			e.message = "promises.base.set error: " + e.message
			console.log(e.message.red)
			throw (e)
		}
	}
}
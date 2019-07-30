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
		console.log('jrm debug base type(' + type.blue + ') name(' + name.blue + ')')
	}

	set({ event, callback }) {
		var t = this, s
		try {
			console.log('jrm debug 77.88')
			if (typeof event == 'undefined')
				throw new Error('event is undefined')
			if (typeof callback == 'undefined')
				throw new Error('callback is undefined')
			if (typeof event == 'string' && typeof callback == 'function') {
				t[event + '_callback'] = callback
				s = 'function'
				console.log('jrm debug name(' + t.name.blue + ') event(' + event.blue + ') callback(' + s.blue + ')')
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
			console.log('jrm debug 77.89')
			if (typeof event == 'undefined')
				throw new Error('event is undefined')
			if (typeof message == 'undefined')
				throw new Error('message is undefined')
			switch (event) {
				case 'reject':
					t.reject({ "error": message })
					break
				case 'resolve':
					t.reject({ "resolve": message })
					break
				default:
					t[event + '_callback'](message)
			}
			return t
		} catch (e) {
			e.message = "promises.base.set error: " + e.message
			console.log(e.message.red)
			throw (e)
		}
	}
}
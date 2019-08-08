"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
*/

var base = require('./base.js'),
	colors = require('colors')

module.exports = class promises extends base {
	constructor({ type, name, parent }) {
		super({ type, name, parent })
		var t = this
		t.reject_callback = function () { }
		t.resolve_callback = function () { }
		//t.summary = {"promise": {"name": t.name}}
		t.summary = {"name": t.name, "type": "promise"}
		t.promise = new Promise(function (resolve, reject) {
			t.resolve = resolve
			t.reject = reject
		}).then(data => {
			t.resolve_callback(data)
		},
			reject => {
				t.reject_callback(reject)
			}
		)
		return t
	}

	do({ event, message }) {
		super.do({ event, message })
		var t = this, s
		try {
			switch (event) {
				case 'reject':
					t.reject({ "error": message })
					break
				case 'resolve':
					t.resolve({ "success": message })
					break
				default:
					throw new Error('event(' + event + ') not defined')
			}
			return t
		} catch (e) {
			e.message = "promises.do error: " + e.message
			throw (e)
		}
	}
}
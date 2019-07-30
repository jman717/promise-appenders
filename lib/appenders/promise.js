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
		t.reject_callback = function () { }
		t.resolve_callback = function () { }
		owner = t
		t.promise = new Promise(function (resolve, reject) {
			t.resolve = resolve
			t.reject = reject
		}).then(resolve => {
			t.resolve_callback(resolve)
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
					t.resolve({ "resolve": message })
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
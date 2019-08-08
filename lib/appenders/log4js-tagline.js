"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
*/

var base = require('./base.js'),
	colors = require('colors'),
	owner
	
module.exports = class log4js_tagline extends base {
	constructor({ type, name, parent }) {
		super({ type, name, parent })
		var t = this
		t.log4js = require("log4js")
		t.log4js_tagline = require("log4js-tagline")
		t.summary = {"logging": "log4js-tagline"}
		t.tagline
		t.log
		t.init_callback = function () { }
		return t
	}

	do({ event, message }) {
		super.do({ event, message })
		var t = this
		try {
			switch (event) {
				case 'init':
					t.init_callback(t)
					t.parent.log = t.log
					break
				default:
					throw new Error('event(' + event + ') not defined')
			}
		} catch (e) {
			e.message = "log4js_tagline.do error: " + e.message
			throw (e)
		}
	}
}
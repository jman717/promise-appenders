"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2019-07-19
*/

var base = require('./base.js');

var owner;
module.exports = class environment extends base{
	constructor({type, name, parent}) {
		super({type, name, parent})
		var t = this
		owner = t
		t.summary = {"environment": t.name}

		return t
	}
}
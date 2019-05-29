/*! 插件 -- 插件模板
 * version 1.0.0
 * 2019-5-28 于京朕
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.MeSwipe = factory());
}(this, (function () {
	'use strict';
	var MeSwipe = function (mescrollId, options) {
		var me = this;
		var op = {
			width: 100,
			height: 100,
		};
		var u = navigator.userAgent;
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 是否为ios设备
		var isPC = typeof window.orientation === 'undefined'; // 是否为PC端
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;// 是否为android端
		me.version = '1.4.0'; // mescroll版本号
		me.options = jQuery.extend(options, op,); // 配置
		me.os = {
			ios: isIOS,
			pc: isPC,
			android: isAndroid
		};
		/* 事件 */
		me.init();
	};
	MeSwipe.prototype.init = function () {
		var me = this;
		console.log(me.version);
		console.log(me.options);
		console.log(me.os);
	};
	return MeSwipe;
})));

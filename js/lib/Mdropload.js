(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.Mdropload = factory());
}(this, (function () { 'use strict';

	var utils = {
		//prefix: (function () {
		//    var styles = window.getComputedStyle(document.documentElement, ''),
		//        pre = (Array.prototype.slice
		//                .call(styles)
		//                .join('')
		//                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		//        )[1],
		//        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		//    return {
		//        dom: dom,
		//        lowercase: pre,
		//        css: '-' + pre + '-',
		//        js: pre[0].toUpperCase() + pre.substr(1)
		//    };
		//})(),
		/**
		 *
		 * @param obj
		 * @param key
		 * @param value
		 * @param closePrefix 是否关闭前缀
		 */
		css: function css(obj, key, value, closePrefix) {
			// fixbug vivo and xiaomi
			obj.style[key] = value;
			if (!closePrefix) {
				obj.style['-webkit-' + key] = value;
			}
		},
		elementCSS: function elementCSS(key, value) {
			if (arguments.length === 2) {
				utils.css(this, key, value);
			} else {
				return this.style[key];
			}
		},
		mouseXY: function mouseXY(_e) {
			// 用于扩展JQ的触摸事件
			try {
				var jQueryx, jQueryy;
				if (_e.originalEvent && _e.originalEvent.changedTouches) {
					jQueryx = _e.originalEvent.changedTouches[0].pageX;
					jQueryy = _e.originalEvent.changedTouches[0].pageY;
				} else if (_e.changedTouches) {
					jQueryx = _e.changedTouches[0].pageX;
					jQueryy = _e.changedTouches[0].pageY;
				} else {
					jQueryx = _e.pageX;
					jQueryy = _e.pageY;
				}
				return { x: jQueryx, y: jQueryy };
			} catch (err) {
				// console.log(err);
			}
			return { x: 0, y: 0 };
		},
		//DOM没有提供insertAfter()方法
		insertAfter: function insertAfter(nowNode, newNode) {
			var parent = nowNode.parentNode;
			if (parent.lastChild == nowNode) {
				parent.appendChild(newNode);
			} else {
				parent.insertBefore(newNode, nowNode.nextSibling);
			}
		}
	};

	var cssjQuery1 = {
		init: function init() {
			// 初始化CSS样式
			var createCss = document.createElement('style');
			createCss.innerHTML = '.js-mdropload {\n' +
				'\tz-index: 1;\n' +
				'\t-webkit-transform: translateZ(0);\n' +
				'\ttransform: translateZ(0);\n' +
				'\t-webkit-backface-visibility: hidden;\n' +
				'\tbackface-visibility: hidden;\n' +
				'\t-webkit-perspective: 1000;\n' +
				'\tperspective: 1000;\n' +
				'}\n' +
				'.js-mdropload-up {\n' +
				'\tposition: absolute;\n' +
				'}\n' +
				'.js-mdropload-down {\n' +
				'\ttransition-duration: .5s;\n' +
				'\t-webkit-transition-duration: .5s;\n' +
				'}\n' +
				'.js-mdropload-up {\n' +
				'\topacity: 0;\n' +
				'\tmin-height: 30px;\n' +
				'}\n' +
				'.js-mdropload-down {\n' +
				'\tmargin: 20px 0;\n' +
				'\tmin-height: 30px;\n' +
				'}\n' +
				'.js-mdropload-up, .js-mdropload-down {\n' +
				'\ttext-align: center;\n' +
				'\tline-height: 30px;\n' +
				'\twidth: 100%;\n' +
				'}\n' +
				'.js-mdropload-message {\n' +
				'\topacity: 0;\n' +
				'}\n';
			document.body.appendChild(createCss);
		}
	};

	var callback = function callback() {
		var that = this;
		var fn = {
			success: function success() {
				console.log(that.status.lock, that.status.loading);
				if (!that.status.lock && that.status.loading) {
					fn.reset();
					if (that.opt.up.template.success) {
						that.upObj.innerHTML = that.opt.up.template.success;
					}
					if (that.opt.down.template.success) {
						console.log('修改文字');
						that.downObj.innerHTML = that.opt.down.template.success;
					}
				}
			},
			reset: function reset(mouseY) {
				console.log(mouseY);
				that.obj.css('transform', 'translate3d(0,0,0)');
				that.upObj.css('opacity', '0');
				that.status.bottomEvent = false;
				that.status.loading = false;
				if (mouseY > 0) {
					that.downObj.css('opacity', '0');
				}
			},
			// error
			error: function error() {
				that.downObj.innerHTML = that.opt.down.template.error;
				fn.reset();
			},
			// end
			end: function end() {
				that.downObj.innerHTML = that.opt.down.template.end;
				fn.reset();
			}
		};
		return fn;
	};

	var jQueryhasTouch = "ontouchstart" in window;
	var eventStart = jQueryhasTouch ? "touchstart" : "mousedown";
	var eventEnd = jQueryhasTouch ? "touchend" : "mouseup";
	var eventMove = jQueryhasTouch ? "touchmove" : "mousemove";
	var eventResize = jQueryhasTouch ? "orientationchange" : "resize";
	var eventcancel = jQueryhasTouch ? "touchcancel" : "mouseup";

	var touchEvent = {
		eventStart: eventStart, eventEnd: eventEnd, eventMove: eventMove, eventResize: eventResize, eventcancel: eventcancel
	};

	var _d = document;

	var scroll = {
		// 获取滚动条高度
		getScrollTop: function getScrollTop() {
			var bodyScrollTop = 0;
			var documentScrollTop = 0;
			if (_d.body) {
				bodyScrollTop = _d.body.scrollTop;
			}
			if (_d.documentElement) {
				documentScrollTop = _d.documentElement.scrollTop;
			}
			return bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
		},

		// 文档的总高度
		getScrollHeight: function getScrollHeight() {
			var bodyScrollHeight = 0;
			var documentScrollHeight = 0;
			if (document.body) {
				bodyScrollHeight = document.body.scrollHeight;
			}
			if (document.documentElement) {
				documentScrollHeight = document.documentElement.scrollHeight;
			}
			return bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
		},

		// 浏览器视口的高度
		getWindowHeight: function getWindowHeight() {
			var windowHeight = 0;
			if (document.compatMode === 'CSS1Compat') {
				windowHeight = document.documentElement.clientHeight;
			} else {
				windowHeight = document.body.clientHeight;
			}
			return windowHeight;
		}
	};

	var str = {
		a: 'addEventListener',
		r: 'removeEventListener',
		jmd: 'js-mdropload',
		jmdUp: 'js-mdropload-up',
		jmdDown: 'js-mdropload-down',
		tf: 'transform',
		t3d: 'translate3d',
		td: 'transition-duration',
		te: 'transitionend',
		scroll: 'scroll',
		o: 'opacity'
	};

	var touchStart = function (e) {
		if (this.status.lock) return;
		// 判断是否在可视范围之内
		var top = this.obj.getBoundingClientRect().top;
		if (top < 0 || top > window.innerHeight) {
			return;
		}
		// e.preventDefault();
		// 取当前tf高度
		this.offsetY = this.obj.css(str.tf).split(',')[1].replace('px', '').trim() * 1;
		if (isNaN(this.offsetY)) {
			this.offsetY = 0;
		}
		this.status.lock = true;
		this.obj.css(str.td, '0s');
		this.upObj.css(str.td, '0s');
		this.downObj.css(str.o, '1');
		this.startMouse = utils.mouseXY(e);
		// 再次初始化字符
		this.upObj.innerHTML = this.opt.up.template.none;
		// this.downObj.innerHTML = this.opt.down.template.none;
	}

	var scrollTimeout = null;
	var scrollEvent = function (e) {
		// 已经在执行了，无需再次执行
		var that = this;
		if (that.status.loading || that.status.bottomEvent) return;
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(function () {
			if (scroll.getScrollTop() + scroll.getWindowHeight() >= scroll.getScrollHeight() - 50) {
				// bottom event
				console.log('执行down');
				that.status.loading = true;
				that.status.bottomEvent = true;
				//setTimeout(function () {
				//    that.status.bottomEvent = false;
				//}, 500);
				that.downObj.css(str.o, '1', false);
				that.downObj.innerHTML = that.opt.down.template.loading;
				that.opt.down && that.opt.down.fn(callback.call(that));
			} else {
				console.log('不执行down');
			}
		}, 100);
	}

	var touchend = function (e) {
		if (this.status.lock) {
			this.endMouse = utils.mouseXY(e);
			var mouseY = this.endMouse.y - this.startMouse.y;
			if (mouseY > 20) {
				e && e.preventDefault && e.preventDefault();
			}
			this.obj.css(str.td, '.5s');
			if (mouseY < this.opt.height) {
				this.obj.css(str.tf, str.t3d + '(0,0px,0)');
			} else {
				this.obj.css(str.tf, str.t3d + '(0,' + this.opt.height + 'px,0)');
			}
			this.upObj.css(str.tf, str.t3d + '(0,0,0)');
			this.upObj.css(str.td, this.opt.animationTime + 's');
			// 操作完成之后的回调方法
			this.status.lock = false;
			var _cb = callback.call(this);
			// 查询是否可以释放更新
			if (mouseY > this.opt.height) {
				this.upObj.innerHTML = this.opt.up.template.loading;
				this.status.loading = true;
				this.opt.up && this.opt.up.fn(_cb);
			} else {
				_cb.reset(mouseY);
			}
			//if (mouseY <= 0) {
			//    this.downObj.innerHTML = this.opt.down.template.loading;
			//}
		}
		// this.upObj.innerHTML = this.opt.up.template.none;
	}

	var touchMove = function (e) {
		var that = this;
		var screenHeight = window.innerHeight;
		if (that.status.lock) {
			var mouse = utils.mouseXY(e);
			var mouseY = mouse.y - that.startMouse.y;
			// 解决与iScroll冲突问题
			if (scroll.getScrollTop() === 0 && mouseY > 0) {
				e.preventDefault && e.preventDefault();
				// 判断是否固定距离,默认为一半屏幕高度
				if (mouseY > 0 && mouseY < that.opt.windowHeight) {
					// var offset = (mouseY + that.offsetY) / 2;
					// var o = (offset / that.opt.height).toFixedownd(2);
					// o = o > 1 ? 1 : o;
					// that.obj.css(str.tf, str.t3d + '(0,' + offset + 'px,0)');
					// that.upObj.css(str.o, o);
					// 操作下拉提示框
					// var offsetUpobjHeight = (offset - that.opt.height) / 2;
					// that.upObj.css(str.tf, str.t3d + '(0,' + (offsetUpobjHeight < 0 ? 0 : offsetUpobjHeight) + 'px,0)');
				}
				if (mouseY > that.opt.height) {
					that.upObj.innerHTML = that.opt.up.template.message;
				}
			}
			// 尝试阻止移动丢失
			if (mouse.y > screenHeight - 100) {
				touchend.apply(that, e);
			}
		}
	}

	var touchCacnecl = function (e) {
		// fixbug touchend可能异常不触发
		callback.call(this).reset();
	}

	var jQuerythat = window;
	var jQueryd = void 0;
	var jQueryb = void 0;
	var jQuerytouch;

	jQuerytouch = function jQuerytouch(element, _opt) {
		var jQueryobj = null;
		var that = this;
		jQueryd = jQuerythat.document;
		jQueryb = jQueryd.body;
		if (element == undefined) {
			jQueryobj = jQueryb;
		} else {
			jQueryobj = element;
		}
		that.opt = _opt;
		// 动画时长
		that.opt.animationTime = that.opt.animationTime || .5;
		// 最大可拉取步长
		that.opt.windowHeight = window.innerHeight;
		that.obj = jQueryobj;
		that.obj.css = function (key, value) {
			if (arguments.length === 2) {
				utils.css(this, key, value);
			} else {
				return this.style[key];
			}
		};
		// 判断是否需要对未注册方法进行屏蔽
		if (!that.opt.up) {
			that.opt.up = {
				isNull: true, template: {}, fn: function fn() {}
			};
		}
		if (!that.opt.down) {
			that.opt.down = {
				isNull: true, template: {}, fn: function fn() {}
			};
		}
		// 事件缓存,以便销毁
		// bind(that)?
		function touchstart(e) {
			touchStart.call(that, e);
		}

		function touchendjQueryjQuery1(e) {
			touchend.call(that, e);
		}

		function touchmove(e) {
			touchMove.call(that, e);
		}

		function touchcancel(e) {
			touchCacnecl.call(that, e);
		}

		function transitionedn(e) {}

		function eventscroll(e) {
			scrollEvent.call(that, e);
		}

		jQueryobj[str.a](touchEvent.eventStart, touchstart);
		jQueryobj[str.a](touchEvent.eventEnd, touchendjQueryjQuery1);
		jQueryobj[str.a](touchEvent.eventMove, touchmove);
		jQueryobj[str.a](touchEvent.eventcancel, touchcancel);
		window[str.a](touchEvent.eventEnd, touchcancel);
		jQueryobj[str.a](str.te, transitionedn);
		window.onscroll = eventscroll.bind(that);
		// 销毁
		that.destroy = function () {
			callback.call(that).reset();
			jQueryobj[str.r](touchEvent.eventStart, touchstart);
			jQueryobj[str.r](touchEvent.eventEnd, touchendjQueryjQuery1);
			jQueryobj[str.r](touchEvent.eventMove, touchmove);
			jQueryobj[str.r](touchEvent.eventcancel, touchcancel);
			jQueryobj[str.r](str.te, transitionedn);
			jQueryobj.classList.remove(str.jmd);
			window.onscroll = null;
			// window[str.r](str.scroll, eventscroll);
			window[str.r](touchEvent.eventcancel, touchcancel);
			// 节点回收
			try {
				that.upObj && that.obj.parentNode.removeChild(that.upObj);
				that.downObj && that.obj.parentNode.removeChild(that.downObj);
			} catch (err) {
				console.warn(err);
			}

			// 等待回收
			// that = null;
		};
		// 初始化CSS
		utils.css(jQueryobj, str.tf, str.t3d + '(0,0,0)');
		utils.css(jQueryobj, 'position', 'relative', true);
		utils.css(jQueryobj, 'z-index', '20', true);
		utils.css(jQueryobj, str.td, that.opt.animationTime);
		that.initTemplate();
		that.status = {
			lock: false,
			loading: false
		};
		return that;
	};

	jQuerytouch.prototype.cancel = function () {
		callback.call(this).reset();
	};

	jQuerytouch.prototype.initTemplate = function () {
		// 初始化上部分
		var jQuerydiv;
		var that = this;
		if (!that.opt.up.isNull && !document.querySelector('.' + str.jmdUp)) {
			jQuerydiv = document.createElement('div');
			jQuerydiv.innerHTML = that.opt.up.template.none;
			jQuerydiv.className = str.jmdUp;
			this.obj.parentNode.insertBefore(jQuerydiv, this.obj);
		}
		// 初始化下部分
		if (!this.opt.down.isNull && !this.obj.parentNode.querySelector('.' + str.jmdDown)) {
			jQuerydiv = document.createElement('div');
			jQuerydiv.innerHTML = this.opt.down.template.none;
			jQuerydiv.className = str.jmdDown;
			utils.insertAfter(this.obj, jQuerydiv);
		}
		that.upObj = this.obj.parentNode.querySelector('.' + str.jmdUp);
		that.downObj = this.obj.parentNode.querySelector('.' + str.jmdDown);
		//TODO: 此处需要优化
		if (that.upObj) {
			that.upObj.css = utils.elementCSS.bind(that.upObj);
		} else {
			that.upObj = {};
			that.upObj.css = function () {};
		}

		if (that.downObj) {
			that.downObj.css = utils.elementCSS.bind(that.downObj);
		} else {
			that.downObj = {};
			that.downObj.css = function () {};
		}
	};

	var index = (function (_el, _opt) {
		// 参数初始化
		cssjQuery1.init();
		// 如果_el传递进来是非ELEMENT 则进行转换
		if (!(_el instanceof Element)) {
			_el = document.querySelector(_el);
		}
		if (_el === null) {
			throw '1001:无法寻找到可设置的html节点,请确认后再次调用.';
		}
		_el.classList.add(str.jmd);
		var jQueryfn = new jQuerytouch(_el, _opt);
		//jQueryfn.prototype = jQuerytouch.prototype;
		return jQueryfn;
	});

	return index;

})));

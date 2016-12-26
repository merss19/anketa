webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _slider = __webpack_require__(5);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _jquery2.default)(function () {
		(0, _svg4everybody2.default)();
		(0, _jquery2.default)('.js-slider').slider();
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(7);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Slider = function ($) {
	
		/**
	  * ------------------------------------------------------------------------
	  * Constants
	  * ------------------------------------------------------------------------
	  */
	
		var NAME = 'slider';
		var DATA_KEY = 'slider';
		var EVENT_KEY = '.' + DATA_KEY;
		var DATA_API_KEY = '.data-api';
		var JQUERY_NO_CONFLICT = $.fn[NAME];
		var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
		var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
		var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
		var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
	
		var Event = {
			HIDE: 'hide' + EVENT_KEY,
			HIDDEN: 'hidden' + EVENT_KEY,
			SHOW: 'show' + EVENT_KEY,
			SHOWN: 'shown' + EVENT_KEY,
			CLICK: 'click' + EVENT_KEY,
			CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
			KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
		};
	
		var ClassName = {
			BACKDROP: 'dropdown-backdrop',
			DISABLED: 'disabled',
			OPEN: 'open'
		};
	
		var Selector = {
			BACKDROP: '.dropdown-backdrop',
			DATA_TOGGLE: '[data-toggle="dropdown"]',
			FORM_CHILD: '.dropdown form',
			ROLE_MENU: '[role="menu"]',
			ROLE_LISTBOX: '[role="listbox"]',
			NAVBAR_NAV: '.navbar-nav',
			VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
		};
	
		/**
	  * ------------------------------------------------------------------------
	  * Class Definition
	  * ------------------------------------------------------------------------
	  */
	
		var Slider = function () {
			function Slider(element) {
				var _this = this;
	
				(0, _classCallCheck3.default)(this, Slider);
	
				this.line = $(element);
				this.dragger = $(element).children();
	
				console.log('constr');
				console.log(this.line);
				console.log(this.dragger);
	
				this.dragger.on('mousedown', function (e) {
					console.log('mousedown');
					console.log(e.pageX);
	
					var draggerCoords = _this.getCoords(_this.dragger);
					console.log(draggerCoords);
	
					var shiftX = e.pageX - draggerCoords.left;
					console.log(shiftX);
	
					var sliderCoords = _this.getCoords(_this.line);
	
					document.on('mousemove', function (e) {
						//  вычесть координату родителя, т.к. position: relative
						var newLeft = e.pageX - shiftX - sliderCoords.left;
	
						// курсор ушёл вне слайдера
						if (newLeft < 0) {
							newLeft = 0;
						}
						var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
						if (newLeft > rightEdge) {
							newLeft = rightEdge;
						}
	
						thumbElem.style.left = newLeft + 'px';
					});
				});
			}
	
			(0, _createClass3.default)(Slider, [{
				key: 'getCoords',
				value: function getCoords(elem) {
					var box = elem[0].getBoundingClientRect();
	
					return {
						top: box.top + pageYOffset,
						left: box.left + pageXOffset
					};
				}
	
				// getters
	
			}, {
				key: 'toggle',
	
	
				// public
	
				value: function toggle() {
					if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
						return false;
					}
	
					var parent = Dropdown._getParentFromElement(this);
					var isActive = $(parent).hasClass(ClassName.OPEN);
	
					Dropdown._clearMenus();
	
					if (isActive) {
						return false;
					}
	
					if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {
	
						// if mobile we use a backdrop because click events don't delegate
						var dropdown = document.createElement('div');
						dropdown.className = ClassName.BACKDROP;
						$(dropdown).insertBefore(this);
						$(dropdown).on('click', Dropdown._clearMenus);
					}
	
					var relatedTarget = { relatedTarget: this };
					var showEvent = $.Event(Event.SHOW, relatedTarget);
	
					$(parent).trigger(showEvent);
	
					if (showEvent.isDefaultPrevented()) {
						return false;
					}
	
					this.focus();
					this.setAttribute('aria-expanded', 'true');
	
					$(parent).toggleClass(ClassName.OPEN);
					$(parent).trigger($.Event(Event.SHOWN, relatedTarget));
	
					return false;
				}
			}, {
				key: 'dispose',
				value: function dispose() {
					$.removeData(this._element, DATA_KEY);
					$(this._element).off(EVENT_KEY);
					this._element = null;
				}
	
				// private
	
			}, {
				key: '_addEventListeners',
				value: function _addEventListeners() {
					$(this._element).on(Event.CLICK, this.toggle);
				}
	
				// static
	
			}], [{
				key: '_jQueryInterface',
				value: function _jQueryInterface(config) {
					return this.each(function () {
						console.log('initfffffffff');
						var data = $(this).data(DATA_KEY);
	
						if (!data) {
							$(this).data(DATA_KEY, data = new Slider(this));
						}
	
						/*if (typeof config === 'string') {
	     	if (data[config] === undefined) {
	     		throw new Error(`No method named "${config}"`)
	     	}
	     	data[config].call(this)
	     }*/
					});
				}
			}, {
				key: '_getParentFromElement',
				value: function _getParentFromElement(element) {
					var parent = void 0;
					var selector = Util.getSelectorFromElement(element);
	
					if (selector) {
						parent = $(selector)[0];
					}
	
					return parent || element.parentNode;
				}
			}, {
				key: 'VERSION',
				get: function get() {
					return VERSION;
				}
			}]);
			return Slider;
		}();
	
		/**
	  * ------------------------------------------------------------------------
	  * jQuery
	  * ------------------------------------------------------------------------
	  */
	
		$.fn[NAME] = Slider._jQueryInterface;
		$.fn[NAME].Constructor = Slider;
		$.fn[NAME].noConflict = function () {
			$.fn[NAME] = JQUERY_NO_CONFLICT;
			return Slider._jQueryInterface;
		};
	
		return Slider;
	}(jQuery);
	
	exports.default = Slider;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(8);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	var $Object = __webpack_require__(13).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(11);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(21), 'Object', {defineProperty: __webpack_require__(17).f});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , core      = __webpack_require__(13)
	  , ctx       = __webpack_require__(14)
	  , hide      = __webpack_require__(16)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 12 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(15);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(17)
	  , createDesc = __webpack_require__(25);
	module.exports = __webpack_require__(21) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(18)
	  , IE8_DOM_DEFINE = __webpack_require__(20)
	  , toPrimitive    = __webpack_require__(24)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(21) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(21) && !__webpack_require__(22)(function(){
	  return Object.defineProperty(__webpack_require__(23)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(22)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19)
	  , document = __webpack_require__(12).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(19);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }
])
//# sourceMappingURL=0.1c62a0c8b33b2258643f.hot-update.js.map
webpackHotUpdate(0,{

/***/ 5:
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
					var draggerLeft = parseInt(_this.dragger.css('left'));
					console.log('draggerLeft');
					console.log(draggerLeft);
	
					$(document).on('mousemove', function (e) {
						//  вычесть координату родителя, т.к. position: relative
						console.log(e.pageX);
						var newLeft = e.pageX - shiftX - sliderCoords.left + _this.dragger.width() / 2;
						console.log('newLeft');
						console.log(newLeft);
	
						// курсор ушёл вне слайдера
						if (newLeft < draggerLeft + _this.dragger.width() / 2) {
							newLeft = draggerLeft + _this.dragger.width() / 2;
						}
						var rightEdge = _this.line.width() - _this.dragger.width() / 2;
	
						console.log('rightEdge');
						console.log(rightEdge);
	
						if (newLeft > rightEdge) {
							newLeft = rightEdge;
						}
	
						_this.dragger.css('left', newLeft + draggerLeft + 'px');
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

/***/ }

})
//# sourceMappingURL=0.a067151d99fa0d8cbff0.hot-update.js.map
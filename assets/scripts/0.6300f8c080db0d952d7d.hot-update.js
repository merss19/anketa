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
			function Slider(element, config) {
				var _this = this;
	
				(0, _classCallCheck3.default)(this, Slider);
	
				this.line = $(element);
				this.dragger = $(element).children();
				this.rightEdge = this.line.width();
	
				this.config = {
					position: 0
				};
	
				if (config) {
					this.config = $.extend({}, this.config, config);
				}
	
				this.initPos();
	
				this.dragger.on('mousedown', function (e) {
					console.log('mousedown');
					console.log(e.pageX);
	
					var draggerCoords = _this.getCoords(_this.dragger);
					console.log(draggerCoords);
	
					var shiftX = e.pageX - draggerCoords.left;
					console.log(shiftX);
	
					var sliderCoords = _this.getCoords(_this.line);
	
					$(_this.line).on('mousemove', function (e) {
						_this.move();
					});
				});
			}
	
			(0, _createClass3.default)(Slider, [{
				key: 'move',
				value: function move() {
					var _this2 = this;
	
					//  вычесть координату родителя, т.к. position: relative
					console.log(e.pageX);
					var newLeft = e.pageX - shiftX - sliderCoords.left + this.dragger.width() / 2;
					console.log('newLeft');
					console.log(newLeft);
	
					// курсор ушёл вне слайдера
					if (newLeft < 0) {
						newLeft = 0;
					}
	
					this.rightEdge = this.line.width() - 4;
	
					console.log('rightEdgggge');
					console.log(this.rightEdge);
	
					if (newLeft > this.rightEdge) {
						newLeft = this.rightEdge;
					}
	
					this.dragger.css('left', newLeft + 'px');
	
					$(document).on('mouseup', function (e) {
						console.log('mouseup');
						_this2.line.off('mousemove');
						_this2.line.off('mouseup');
					});
				}
			}, {
				key: 'initPos',
				value: function initPos() {
					var initPos = this.rightEdge * this.config.position / 100;
	
					this.dragger.css('left', initPos + 'px');
				}
			}, {
				key: 'getCoords',
				value: function getCoords(elem) {
					var box = elem[0].getBoundingClientRect();
	
					return {
						top: box.top + pageYOffset,
						left: box.left + pageXOffset
					};
				}
	
				// static
	
			}], [{
				key: 'init',
				value: function init(config) {
					return this.each(function () {
						console.log('initfffffffff');
						var data = $(this).data(DATA_KEY);
	
						if (!data) {
							$(this).data(DATA_KEY, data = new Slider(this, config));
						}
					});
				}
			}]);
			return Slider;
		}();
	
		/**
	  * ------------------------------------------------------------------------
	  * jQuery
	  * ------------------------------------------------------------------------
	  */
	
		$.fn[NAME] = Slider.init;
		$.fn[NAME].Constructor = Slider;
		$.fn[NAME].noConflict = function () {
			$.fn[NAME] = JQUERY_NO_CONFLICT;
			return Slider.init;
		};
	
		return Slider;
	}(jQuery);
	
	exports.default = Slider;

/***/ }

})
//# sourceMappingURL=0.6300f8c080db0d952d7d.hot-update.js.map
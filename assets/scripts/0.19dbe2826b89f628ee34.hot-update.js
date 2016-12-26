webpackHotUpdate(0,{

/***/ 0:
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
		(0, _jquery2.default)('.js-slider').slider({
			position: 50 //percent
		});
	});

/***/ },

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
	
				console.log('constr');
				console.log(config);
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
	
					$(_this.line).on('mousemove', function (e) {
						//  вычесть координату родителя, т.к. position: relative
						console.log(e.pageX);
						var newLeft = e.pageX - shiftX - sliderCoords.left + _this.dragger.width() / 2;
						console.log('newLeft');
						console.log(newLeft);
	
						// курсор ушёл вне слайдера
						if (newLeft < 0) {
							newLeft = 0;
						}
						var rightEdge = _this.line.width() - 4;
	
						console.log('rightEdge');
						console.log(rightEdge);
	
						if (newLeft > rightEdge) {
							newLeft = rightEdge;
						}
	
						_this.dragger.css('left', newLeft + 'px');
					});
					_this.line.on('mouseup', function (e) {
						console.log('mouseup');
						_this.line.off('mousemove');
						_this.line.off('mouseup');
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
//# sourceMappingURL=0.19dbe2826b89f628ee34.hot-update.js.map
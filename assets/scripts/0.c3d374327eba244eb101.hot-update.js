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
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SliderModule = function ($) {
	
		/**
	  * ------------------------------------------------------------------------
	  * Constants
	  * ------------------------------------------------------------------------
	  */
	
		var NAME = 'slider';
		var JQUERY_NO_CONFLICT = $.fn[NAME];
	
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
				this.rightEdge = this.line.width() - this.dragger.width() / 4;
	
				this.config = {
					position: 0
				};
	
				if (config) {
					this.config = $.extend({}, this.config, config);
				}
	
				this.initPos();
	
				this.dragger.on('mousedown', function (e) {
					_this.mouseDown(e);
				});
	
				this.dragger.on('touchstart', function (e) {
					console.log('touchstart');
					_this.mouseDown(e);
				});
			}
	
			(0, _createClass3.default)(Slider, [{
				key: 'initPos',
				value: function initPos() {
					var initPos = this.rightEdge * this.config.position / 100;
					this.dragger.css('left', initPos + 'px');
				}
			}, {
				key: 'mouseDown',
				value: function mouseDown(e) {
					var _this2 = this;
	
					var draggerCoords = this.getCoords(this.dragger);
	
					this.shiftX = e.originalEvent.touches[0].pageX - draggerCoords.left;
	
					this.sliderCoords = this.getCoords(this.line);
	
					$(this.line).on('mousemove', function (event) {
						_this2.mouseMove(event);
					});
	
					this.dragger.on('touchmove', function (e) {
						console.log('touchmove');
						_this2.mouseDown(e);
					});
				}
			}, {
				key: 'mouseMove',
				value: function mouseMove(e) {
					var _this3 = this;
	
					console.log('mouseMove');
					var newLeft = e.originalEvent.touches[0].pageX - this.shiftX - this.sliderCoords.left + this.dragger.width() / 2;
					console.log(newLeft);
					// курсор ушёл вне слайдера
					if (newLeft < 0) {
						newLeft = 0;
					}
	
					if (newLeft > this.rightEdge) {
						newLeft = this.rightEdge;
					}
	
					this.dragger.css('left', newLeft + 'px');
	
					$(document).on('mouseup', function () {
						_this3.line.off('mousemove');
						_this3.line.off('mouseup');
					});
	
					if ('ontouchstart' in window) {
						this.dragger.on('touchend', function (e) {
							console.log('touchend');
							_this3.mouseDown(e);
						});
					}
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
	
						var data = $(this).data(NAME);
	
						if (!data) {
							$(this).data(NAME, data = new Slider(this, config));
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
	}(_jquery2.default);
	
	exports.default = SliderModule;

/***/ }

})
//# sourceMappingURL=0.c3d374327eba244eb101.hot-update.js.map
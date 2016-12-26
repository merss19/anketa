import jQuery from 'jquery';
const SliderModule = ($ => {


	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME = 'slider';
	const JQUERY_NO_CONFLICT = $.fn[NAME];



	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Slider {

		constructor(element, config) {
			this.line = $(element);
			this.dragger = $(element).children();
			this.rightEdge = this.line.width() - this.dragger.width() / 4;

			this.config = {
				position: 0
			};

			if (config){
				this.config = $.extend({}, this.config, config);
			}

			this.initPos();


			this.dragger.on('mousedown', e => {
				this.mouseDown(e);
			});


			this.dragger.on('touchstart', e => {
				console.log('touchstart')
				this.mouseDown(e);
			});


		}

		initPos(){
			const initPos = this.rightEdge * this.config.position / 100;
			this.dragger.css('left', initPos + 'px');
		}

		mouseDown(e){
			let posX = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
			const draggerCoords = this.getCoords(this.dragger);

			this.shiftX = posX - draggerCoords.left;


			this.sliderCoords = this.getCoords(this.line);

			$(this.line).on('mousemove', event => {
				this.mouseMove(event);
			});


			this.dragger.on('touchmove', e => {
				console.log('touchmove')
				this.mouseDown(e);
			});


		}

		mouseMove(e){
			console.log('mouseMove')
			let posX = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;

			let newLeft = posX- this.shiftX - this.sliderCoords.left + this.dragger.width() / 2;
			console.log(newLeft)
			// курсор ушёл вне слайдера
			if (newLeft < 0) {
				newLeft = 0;
			}


			if (newLeft > this.rightEdge) {
				newLeft = this.rightEdge;

			}

			this.dragger.css('left', newLeft + 'px');

			$(document).on('mouseup', () => {
				this.line.off('mousemove');
				this.line.off('mouseup');
			});

			if ('ontouchstart' in window) {
				this.dragger.on('touchend', e => {
					console.log('touchend')
					this.mouseDown(e);
				});
			}

		}


		getCoords(elem) {
			const box = elem[0].getBoundingClientRect();

			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};

		}




		// static

		static init(config) {
			return this.each(function () {

				let data = $(this).data(NAME);

				if (!data) {
					$(this).data(NAME, (data = new Slider(this, config)));
				}
			});
		}

	}



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

})(jQuery);

export default SliderModule;


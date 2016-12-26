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

		}

		initPos(){
			const initPos = this.rightEdge * this.config.position / 100;
			this.dragger.css('left', initPos + 'px');
		}

		mouseDown(e){
			const draggerCoords = this.getCoords(this.dragger);

			this.shiftX = e.pageX - draggerCoords.left;


			this.sliderCoords = this.getCoords(this.line);

			$(this.line).on('mousemove', event => {
				this.mouseMove(event);
			});

		}

		mouseMove(e){
			let newLeft = e.pageX - this.shiftX - this.sliderCoords.left + this.dragger.width() / 2;

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


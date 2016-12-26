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


			this.dragger.on('touchstart', ev => {
				console.log('touchstart')
				this.mouseDown(ev);
			});


		}

		initPos(){
			const initPos = this.rightEdge * this.config.position / 100;
			this.dragger.css('left', initPos + 'px');
		}

		mouseDown(e){
			console.log('mouseDown')

			let posX = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
			const draggerCoords = this.getCoords(this.dragger);
			console.log(posX)
			console.log(draggerCoords)

			this.shiftX = posX - draggerCoords.left;
			console.log(this.shiftX)

			this.sliderCoords = this.getCoords(this.line);
			console.log(this.sliderCoords)
			$(this.line).on('mousemove', event => {
				this.mouseMove(event);
			});


			this.dragger.on('touchmove', ev => {
				console.log('touchmove')
				this.mouseDown(ev);
			});


		}

		mouseMove(e){
			console.log('mouseMove')
			let posX = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
			console.log(posX)
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


			this.dragger.on('touchend', () => {
				console.log('touchend')
				this.line.off('touchmove');
				this.line.off('touchstart');
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


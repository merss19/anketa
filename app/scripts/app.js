import svg4everybody from 'svg4everybody';
import $ from 'jquery';

import slider from './slider';

$(() => {
	svg4everybody();
});

$('.js-slider').slider({
	position: 80 // percent
});



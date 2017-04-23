(function ($w) {
	var debounceTime = 100;
	var debounceTimeout = null;
	var options = {
		mainOptions: {
			transitionType: 'fade',
			imageScaleMode: 'fill',
			globalCaption: true,
			controlNavigation: 'none',
			arrowsNav: false,
			autoPlay: {
				enabled: true,
				stopAtAction: false,
				pauseOnHover: false,
				delay: 3000
			}
		}
	};
	var slider1 = {}, slider2 = {};
	var $mainSlider = $('.mainSlider');
	run();

	function run() {
		if($mainSlider.length) {
			init();
			updateHeight();
			$w.resize(function () { debounce(updateHeight); });
		}
	}
	
	function isMobile() { return $w.width() < 768; }
	function init() {
		slider1 = $mainSlider.filter(':nth-of-type(1)').royalSlider(options.mainOptions).data('royalSlider');
		slider2 = $mainSlider.filter(':nth-of-type(2)').royalSlider(options.mainOptions).data('royalSlider');
	}

	function updateHeight() {
		var wh = $w.height();
		var ww = $w.width();

		if(isMobile()) {
			if(ww > wh) $mainSlider.height(wh - 150);
			else $mainSlider.height((wh - 150) / 2);
		}
		else {
			var height = wh - 170;
			$mainSlider.height(height);
		}
		if(slider1) slider1.updateSliderSize(true);
		if(slider2) slider2.updateSliderSize(true);
	}

	function debounce(fn) {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(fn, debounceTime);
	}
})($(window));
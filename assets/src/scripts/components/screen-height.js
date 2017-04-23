(function ($w) {
	var debounceTime = 100;
	var debounceTimeout = null;
	var $element = $('.screenHeightSMP');
	run();

	function run() {
		updateHeight();
		$w.resize(function () { debounce(updateHeight); });
	}

	function isMobile() { return $w.width() < 767; }

	function updateHeight() {
		var wh = $w.height();
		var ww = $w.width();

		if(isMobile())
			$element.height('');
		else
			$element.height(wh - 170);
	}

	function debounce(fn) {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(fn, debounceTime);
	}
})($(window));
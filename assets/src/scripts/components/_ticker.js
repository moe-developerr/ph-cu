(function () {
	var $ticker = $('#ticker');
	var $track = $('#track');
	var config = {
		initialDelay: 3,
		laterDelays: 0,
		duration: 20,
		nbOfLoops: 1,
	};
	run();

	function run() {
		getConfigs();
		init();
	}

	function getConfigs() {
		config.initialDelay = +$ticker.attr('data-initialDelay');
		config.laterDelays = +$ticker.attr('data-laterDelays');
		config.duration = +$ticker.attr('data-duration');
		config.nbOfLoops = +$ticker.attr('data-nbOfLoops');
	}

	function init() {
		// not getting the correct width because the font is taking time to load
		$track.width($track.find('.feed').width());
		// setTimeout(runTicker, config.initialDelay*1000);
	}

	function runTicker() {
		for(var i = 0; i < config.nbOfLoops; i++) {
			animate({

			}, config.duration*1000, 'swing', afterFinish).delay(config.laterDelays*1000);
		}
	}

	function afterFinish() {
		console.log('animation finished');
	}
})();
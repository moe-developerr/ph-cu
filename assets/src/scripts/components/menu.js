(function () {
	var $menu = $('.main-menu');
	var $trigger = $('#menuTrigger');
	run();

	function run() {
		$trigger.click(toggleMenu);
	}

	function toggleMenu() {
		if(isOpen()) close();
		else open();
	}

	function isOpen() { return $menu.hasClass('active'); }
	function open() { $menu.addClass('active'); $trigger.addClass('close'); }
	function close() { $menu.removeClass('active');	$trigger.removeClass('close'); }

})();
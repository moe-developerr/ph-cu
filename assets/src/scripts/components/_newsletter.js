(function () {
	var timeout = null;
	var time = 3000;
	var data = {
		prefix: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		country: '',
		interests: '',
	};
	var $thankyou = $('#thankyou');
	var $body = $('body');
	var $oldCheckboxes = $('.old-checkbox');
	run();

	function run() {
		$('#newsletterCloseBtn').click(close);
		$('.newsletterOpenBtn').click(open);
		$('#newsletterForm').submit(submit);
		$('#selectAllBtn').click(selectAll);
	}

	function open(e) { e.preventDefault(); $body.addClass('newsletter-active'); }
	function close() { $body.removeClass('newsletter-active'); }
	function submit(e) {
		e.preventDefault();
		collectData();
		$.ajax({
			url: '',
			method: 'POST',
			data: data,
			error: error,
			success: success
		});
	}
	function collectData() {
		data.prefix = $('#prefixes').val();
		data.firstName = $('#firstName').val();
		data.lastName = $('#lastName').val();
		data.email = $('#email').val();
		data.phone = $('#phone').val();
		data.country = $('#countries').val();
		$oldCheckboxes.each(buildInterests);
		data.interests = data.interests.substr(0, data.interests.length - 1);
	}
	function buildInterests(i, v) {
		var $checkbox = $(v);
		if($checkbox.is(':checked')) data.interests += $checkbox.val() + ',';
	}
	function error(e) { console.log(e.statusText); }
	function success(r) {
		thankyou(close);
	}
	function thankyou(fn) {
		$thankyou.text('Thank you, you are now subscribed to our newsletter.');
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(function () {
			fn();
			$thankyou.text('');
		}, time);
	}
	function selectAll() {
		$oldCheckboxes.each(function (i ,v) { $(v).prop('checked', true); });
	}
})();
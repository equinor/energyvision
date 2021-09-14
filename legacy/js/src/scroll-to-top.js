$(document).ready(function($){

	var timer;
	$(window).scroll(function(){

		if(timer) {
			window.clearTimeout(timer);
		}

		timer = window.setTimeout(function() {

			if ($(this).scrollTop() > 100) {
				$('#scroll-to-top').fadeIn(350);
			}

			else {
				$('#scroll-to-top').fadeOut(350);
			}

		}, 200);

	});

	$('#scroll-to-top').click(function(){
		$('#scroll-to-top').fadeOut(350);
		$('html, body').velocity('scroll', { duration: 800 });
		return false;
	});

});

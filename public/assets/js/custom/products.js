jQuery(function($) {

  /*$('.main-nav').addClass('navbar-fixed-top');
  $('.main-nav').removeClass('top-nav-collapse');
  $('.navbar-brand').addClass('hidden');

	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>slideHeight - 200 ) {
			$('.main-nav').addClass('top-nav-collapse');
      $('.navbar-brand').removeClass('hidden');
      $('#brand-logo').addClass('bounceIn');
		} else {
			$('.main-nav').removeClass('top-nav-collapse');
      $('.navbar-brand').addClass('hidden');
      $('#brand-logo').removeClass('bounceIn');
		}
	});

  $('.navbar-collapse ul li a').on('click', function() {
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
    $('.navbar-collapse').removeClass('in');
		return false;
	});*/

  $(document).ready(function(){
    $('.slicked').slick({
    });
  });

});

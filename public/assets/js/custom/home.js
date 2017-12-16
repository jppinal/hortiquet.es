jQuery(function($) {

	//Preloader
	var preloader = $('#home .preloader');
	$(window).load(function(){
		preloader.remove();
	});

	//#main-slider
	var slideHeight = $(window).height();
  var slideWidth = $(window).width();
	$('#cover .item').css('height',slideHeight);
  $('#forest').css('min-height',slideHeight);
  $('#forest .inner').css('width',slideWidth);

	$(window).resize(function(){'use strict',
		$('#cover .item').css('height', $(window).height());
    $('#forest').css('min-height', $(window).height());
    $('#forest .inner').css('width', $(window).width());
	});

  $('.main-nav').addClass('navbar-fixed-top');
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

  // Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

  $('.navbar-collapse ul li a').on('click', function() {
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
    $('.navbar-collapse').removeClass('in');
		return false;
	});

//chart
var ctx = document.getElementById("forest-chart").getContext("2d");
var data = [
    {
        value: 0.15,
        color:"#333333",
        highlight: "#666666",
        label: "Completado"
    },
    {
        value: 0.85,
        color: "rgba(1,1,1,0.2)",
        highlight: "rgba(1,1,1,0.2)",
        label: ""
    }
];
var forestChart = new Chart(ctx).Doughnut(data, {
  percentageInnerCutout : 80,
  segmentShowStroke : false
});

  // User define function
function Scroll() {
  var contentTop      =   [];
  var contentBottom   =   [];
  var winTop      =   $(window).scrollTop();
  var rangeTop    =   200;
  var rangeBottom =   500;
  $('.navbar-collapse').find('.scroll a').each(function(){
    contentTop.push( $( $(this).attr('href') ).offset().top);
    contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
  })
  $.each( contentTop, function(i){
    if ( winTop > contentTop[i] - rangeTop ){
      $('.navbar-collapse li.scroll')
      .removeClass('active')
      .eq(i).addClass('active');
    }
  })
};

});

$(document).ready(function() {
	
	
	$('.bcslider').slick({
	  dots: false,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	  centerMode: false,
	  variableWidth: true
	});
	
    $('.prod_slider').owlCarousel({ 
		loop:true,
		margin:20,
		nav:true,  
		navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>' , '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		dots:true,
		autoplay:true,
		autoplayTimeout:2000,
		autoplayHoverPause:true,
		responsiveClass:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})
 
});
 
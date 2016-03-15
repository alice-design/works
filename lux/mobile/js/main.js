jQuery(document).ready(function($) {
	$("#pollSec .royalSlider").royalSlider({
		loop:true,
		addActiveClass:true,
		navigateByClick:false,
	    visibleNearby: {
            enabled: true,
            centerArea: 0.5,
            center: true,
            breakpoint: 650,
            breakpointCenterArea: 0.59,
        }
	});
	$("#pollResultRS").royalSlider({
		loop: true,
	    controlNavigation: 'none',
	    imageScaleMode: 'none',
	    slidesSpacing:0,
	    autoPlay: {
    		enabled: true,
    		delay:4000,
    		pauseOnHover: false
		},
	    transitionType:'move'
	});
	//RS Thumb Custom

		var slider = $("#pollResultRS").data('royalSlider');//declare slider

		var currentSlide = slider.currSlideId;
		var thumbIndex = currentSlide%6;
		var rsThumbs = $('#pollGroup li');
		var rsCaptions = $('.slideCpt');

		//initial highlight and caption
		rsThumbs.each(function(){
			$(this).removeClass('active');
		});
		rsThumbs.eq(thumbIndex).addClass('active');

		rsCaptions.eq(currentSlide).appendTo(jQuery('.title'));


		//on slider change 
		slider.ev.on('rsAfterSlideChange', function(event) {
			currentSlide = slider.currSlideId;//update currentSlide
			thumbIndex = currentSlide%6;//update thumbIndex

			//add active class
			rsThumbs.each(function(){
				$(this).removeClass('active');
			});
			rsThumbs.eq(thumbIndex).addClass('active');
		});

		//end RS Thumb Hightlight

		//RS thumb click
		
		rsThumbs.each(function(){
			$(this).click(function(){
				var thumbNum = $(this).index();
				if(thumbNum == currentSlide){
					slider.goTo(thumbNum+6); 
				}else{
					slider.goTo(thumbNum);
				}
				
			});
		});	

		//end RS thumb click


	//------------------may's	
	$('nav > ul').css('height', '100%');

	$('#navToggle').click(function(){
		
		if ($('nav > ul').hasClass('open')) {
			// close
			$('nav > ul').fadeOut().removeClass('open');
		} else {
			// open
			$('nav > ul').fadeIn().addClass('open');
		}

	});
	//^^^^^^^^^^^^^^^^^^ may's

	//magnific init
	$('#fbShare').click(function(){
		$.magnificPopup.open({
		  items: {
		    src: $('#u6Form')
		  },
		  type: 'inline'
		}, 0);
	});
	$('#formSubmit').click(function(){
		$.magnificPopup.close();
		window.setTimeout(function(){
			$.magnificPopup.open({
			  items: {
			    src: $('#success')
			  },
			  type: 'inline'
			}, 0);
		},1);
	});
	//end magnific init

});

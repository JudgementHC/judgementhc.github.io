$(window).on('load', function() {
	$('.preloader').fadeOut('slow');
	$('html').removeClass('stop-scrolling');
});

$(document).ready(function() {
	/**
	 * Slick Slider in hero section
	 */
	$('.hero-slider').slick({
	  dots: true,
	  initialSlide: 1,
	  waitForAnimate: false,
	  speed: 600,
		fade: true,
	  autoplay: true,
	  autoplaySpeed: 2000,
	  adaptiveHeight: true,
	  prevArrow: $('#heroArrowLeft'),
	  nextArrow: $('#heroArrowRight'),
	  responsive: [
		  {
		  	breakpoint: 768,
		  	settings: {
		  		arrows: false,
		  	}
		  }
	  ]
	});


	/**
	 * changes the color of the header when scrolling below 50px
	 */
  $(document).scroll(function () {
    let nav = $('.header');
    console.log('scrolled')
    nav.toggleClass('scrolled', $(this).scrollTop() > 50);
  });


	/*wow js has been inited*/
	new WOW().init();


	/**
	 * smooth scrolling to anchor
	 */
	$('a[id="header-anchor"]').click(function() {
		let target = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 900);
	});


	/**
	 * when you press button the menu appears on mobile devices
	 */
	$('.header-btn').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('header-btn_active');
		$('.header__lists').toggleClass('lists_active');
	});


	/**
	 * [checkWidth description]
	 * проверяет размер экрана, если это мобильный девайс,
	 * то уменьшает data-wow-duration и заменяет анимацию
	 */
  function checkWidth() {
    let windowWidth = $('body').innerWidth();
    let elem = $('.intro__item');
    if(windowWidth < 768){
      // elem.style.animationDelay = '0s';
      elem.attr('data-wow-delay', '0s');
      elem.removeClass('fadeInUp');
      elem.addClass('fadeIn');
    }
  };

  checkWidth(); // проверит при загрузке страницы

  $(window).resize(function(){
    checkWidth(); // проверит при изменении размера окна клиента
  });


  /**
   * показывает и скрывает модальное окно description
   * вторая функция нужна для скрытия блока если нажать
   * вне description-block
   */
  let tapItem = $('.choice__flexslider');
  let description = $('#description');
  let descSlider =$('#descSlider');
  let descCloseBtn = $('#descCloseBtn');
	let descriptionBlock = $('#descBlock');

  tapItem.on('click', function() {
  	let initialslide = $(this).attr('id');
  	description.addClass('modal_shown');
  	$('html').addClass('stop-scrolling');

		descSlider.slick({
			dots: true,
			adaptiveHeight: true,
			waitForAnimate: false,
			initialSlide: parseInt(initialslide),
			speed: 700,
			fade: true,
			prevArrow: $('#descArrowLeft'),
			nextArrow: $('#descArrowRight'),
		});
  });

 	$(document).mouseup(function(event) {
  	if(!descriptionBlock.is(event.target) && descriptionBlock.has(event.target).length === 0 || descCloseBtn.is(event.target)){
	  	description.removeClass('modal_shown');
	  	descSlider.slick('unslick');
	  	$('html').removeClass('stop-scrolling');
  	}
  });

 	$(document).keyup(function(event) {
 		if(event.which == 27){
 			description.removeClass('modal_shown');
 			descSlider.slick('unslick');
 			$('html').removeClass('stop-scrolling');
 		}
 	});



  /**
   * при нажатии на изображение в introImage оно увеличивается
   */
  let introImage = $('div[id^=introImage]');
  introImage.magnificPopup({
		type: 'image',
		  mainClass: 'mfp-with-zoom',
		  zoom: {
		  	cursor: 'mfp-zoom-out-cur',
		    enabled: true, 
		    duration: 0,
		    easing: 'ease-in-out',
		    opener: function(openerElement) {
		      return openerElement.is('img') ? openerElement : openerElement.find('img');
		    }
		  }
	});


  /**
   * при нажатии на изображение в intro__image скрывается хедер
   */
	introImage.on('click', function() {
		mainHeader.addClass('is-hidden');
	});
  


	/**
	 * Shows and hides header when scrolling up
	 */
	let mainHeader = $('.cd-auto-hide-header'),
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	//set scrolling letiables
	let scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		let currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset ) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}
});
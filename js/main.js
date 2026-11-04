(function ($) {
	'use strict';

	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	if ( $('body').hasClass('offcanvas') ) {
    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});
	};

	var offcanvasMenu = function() {
		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas').find('li').removeClass('has-dropdown');

		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);
			$this.addClass('active').find('ul').slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){
			var $this = $(this);
			$this.removeClass('active').find('ul').slideUp(500, 'easeOutExpo');				
		});

		$(window).resize(function(){
			if ( $('body').hasClass('offcanvas') ) {
    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
		});
	};

	var burgerMenu = function() {
		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);
			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();
		});
	};

var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
				}, 100);
			}
		} , { offset: '85%' } );

	// Trigger fade-in on scroll down, fade-out on scroll up
		$('#fh5co-couple, #fh5co-event, #fh5co-testimonial').waypoint(function(direction) {
			if (direction === 'down') {
				$(this.element).addClass('in-view');
			} else if (direction === 'up') {
				$(this.element).removeClass('in-view');
			}
		}, { offset: '80%' });
	};

	var dropdown = function() {
		$('.has-dropdown').mouseenter(function(){
			var $this = $(this);
			$this.find('.dropdown').css('display', 'block').addClass('animated-fast fadeInUpMenu');
		}).mouseleave(function(){
			var $this = $(this);
			$this.find('.dropdown').css('display', 'none').removeClass('animated-fast fadeInUpMenu');
		});
	};
	
var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		
		// Randomize items before Owl Carousel initializes
		var items = owl.children('.item').toArray();
		items.sort(function() { return 0.5 - Math.random(); });
		owl.empty().append(items);

		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			autoplay: true,              // Enable automatic sliding
			autoplayTimeout: 3000,       // 3 seconds delay per slide
			autoplayHoverPause: true     // Pause slideshow when user touches/hovers over a comment
		});
	};
	
	var goToTop = function() {
		$('.js-gotop').on('click', function(event){
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			return false;
		});

		$(window).scroll(function(){
			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}
		});
	};

   var loaderPage = function() {
      setTimeout(function() {
          $(".fh5co-loader").addClass("fade-out");
       }, 700);
   };

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var parallax = function() {
		$(window).stellar();
	};
	
	var scrollTitle = function() {
		var titleText = " Que nos casamos! • On se marie ! • We are getting married! • "; 
		setInterval(function() {
			titleText = titleText.substring(1) + titleText.substring(0, 1);
			document.title = titleText;
		}, 120);
	};

// Language Switcher & Flag Overlay Logic
	var initLanguageSwitcher = function() {
		function applyTranslations(lang) {
			var langKey = lang.toLowerCase();
			$('[data-lang-' + langKey + ']').each(function() {
				var text = $(this).attr('data-lang-' + langKey);
				if (text) {
					$(this).html(text);
				}
			});
		}

		function disableScroll() {
			$('html, body').css({
				'overflow': 'hidden',
				'height': '100%'
			});
		}

		function enableScroll() {
			$('html, body').css({
				'overflow': '',
				'height': ''
			});
		}

		// Detect if we are on main page (handles main.html, root /, QR codes, or URLs with query strings)
		var path = window.location.pathname;
		var isMainPage = path.endsWith("main.html") || path.endsWith("/") || path === "" || path.indexOf("main.html") !== -1;

		function checkFlagPrompt() {
			if (isMainPage) {
				localStorage.removeItem("selectedLang");
				$('#flag-selection').css({
					'display': 'flex',
					'opacity': '1',
					'visibility': 'visible',
					'pointer-events': 'auto'
				}).show();
				disableScroll();
			} else {
				var savedLang = localStorage.getItem("selectedLang");
				if (savedLang) {
					applyTranslations(savedLang);
					$('#flag-selection').css({
						'display': 'none',
						'opacity': '0',
						'visibility': 'hidden',
						'pointer-events': 'none'
					}).hide();
					enableScroll();
				} else {
					$('#flag-selection').css({
						'display': 'flex',
						'opacity': '1',
						'visibility': 'visible',
						'pointer-events': 'auto'
					}).show();
					disableScroll();
				}
			}
		}

		// Run check immediately on load
		checkFlagPrompt();

		// Handle mobile back/forward cache and direct link restorations
		$(window).on('pageshow', function() {
			checkFlagPrompt();
		});

		// Flag click handler
		$(document).on('click', '.flag-btn', function(e) {
			var chosenLang = $(this).attr('data-lang');
			if (chosenLang) {
				localStorage.setItem("selectedLang", chosenLang);
				applyTranslations(chosenLang);
				
				// Smooth CSS fade-out transition
				$('#flag-selection').css({
					'opacity': '0',
					'visibility': 'hidden',
					'pointer-events': 'none'
				});

				setTimeout(function() {
					$('#flag-selection').hide();
					enableScroll();
				}, 600);
			}
		});
	};

// Save the Date Calendar Handler (Multi-language & New Tab Enabled)
	var initSaveTheDate = function() {
		$(document).on('click', '.btn-save-date', function(e) {
			e.preventDefault();

			var userAgent = navigator.userAgent || navigator.vendor || window.opera;
			var isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

			// Detect chosen language
			var lang = (localStorage.getItem("selectedLang") || "EN").toUpperCase();

			var detailsText = "Join us for Jimi & Pedro's Wedding Weekend!\n\nAccommodation provided in Camping Bellsol, Pineda de Mar, Barcelona, España";
			if (lang === "ES") {
				detailsText = "¡Acompáñanos en el fin de semana de boda de Jimi y Pedro!\n\nAlojamiento en Camping Bellsol, Pineda de Mar, Barcelona, España";
			} else if (lang === "FR") {
				detailsText = "Rejoignez-nous pour le week-end de mariage de Jimi & Pedro !\n\nHébergement sera dans Camping Bellsol, Pineda de Mar, Barcelona, España";
			}

			var locationText = "Can Marial, Barcelona, Spain";
			var titleText = "❤️ JIMI & PEDRO ❤️";

			// Dates: Nov 5, 2027 17:00 to Nov 7, 2027 13:00 (Europe/Madrid offset approx UTC+1 in Nov -> 16:00Z to 12:00Z)
			var startUtc = "20271105T160000Z";
			var endUtc = "20271107T120000Z";

			if (isIOS) {
				// iOS / iPhone: Download .ics file for native Apple Calendar import
				var icsDetails = detailsText.replace(/\n/g, "\\n");
				var icsData = [
					"BEGIN:VCALENDAR",
					"VERSION:2.0",
					"PRODID:-//Jimi and Pedro Wedding//EN",
					"CALSCALE:GREGORIAN",
					"METHOD:PUBLISH",
					"BEGIN:VEVENT",
					"SUMMARY:" + titleText,
					"DESCRIPTION:" + icsDetails,
					"LOCATION:" + locationText.replace(/,/g, "\\,"),
					"DTSTART:" + startUtc,
					"DTEND:" + endUtc,
					"STATUS:CONFIRMED",
					"SEQUENCE:0",
					"BEGIN:VALARM",
					"TRIGGER:-P1D",
					"ACTION:DISPLAY",
					"DESCRIPTION:Reminder: Jimi & Pedro Wedding Weekend starts tomorrow!",
					"END:VALARM",
					"END:VEVENT",
					"END:VCALENDAR"
				].join("\r\n");

				var blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.setAttribute('download', 'Jimi_and_Pedro_Wedding.ics');
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else {
				// Android & Desktop: Open Google Calendar in a NEW tab
				var googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
					"&text=" + encodeURIComponent(titleText) +
					"&dates=" + startUtc + "/" + endUtc +
					"&details=" + encodeURIComponent(detailsText) +
					"&location=" + encodeURIComponent(locationText);

				var newTab = window.open(googleUrl, '_blank');
				if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
					// Fallback if popup blocker intercepts window.open
					var anchor = document.createElement('a');
					anchor.href = googleUrl;
					anchor.target = '_blank';
					anchor.rel = 'noopener noreferrer';
					document.body.appendChild(anchor);
					anchor.click();
					document.body.removeChild(anchor);
				}
			}
		});
	};
	
	$(document).ready(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
		scrollTitle();
		initLanguageSwitcher();
		initSaveTheDate();
	});

})(jQuery);

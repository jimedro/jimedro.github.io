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
			autoPlay: 3000,        // Automatic slide every 3000ms (3 seconds)
			stopOnHover: true      // Pause sliding when user hovers or touches a testimonial
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

// Gift Modal & IBAN Copy Handler
var initGiftModal = function() {
    $(document).on('click', '.btn-gifts', function(e) {
        e.preventDefault();
        $('#gift-modal').addClass('active');
    });

    $(document).on('click', '.gift-modal-close, #gift-modal', function(e) {
        if (e.target === this || $(e.target).hasClass('gift-modal-close')) {
            $('#gift-modal').removeClass('active');
        }
    });

    $(document).on('click', '#copy-iban-btn', function(e) {
        e.preventDefault();
        var ibanText = $('#iban-text').text().trim();

        navigator.clipboard.writeText(ibanText).then(function() {
            var originalText = $('#copy-btn-text').text();
            $('#copy-btn-text').text('Copied! ✓');
            $('#copy-iban-btn').css('background', '#28a745');

            setTimeout(function() {
                $('#copy-btn-text').text(originalText);
                $('#copy-iban-btn').css('background', '#1e5312');
            }, 2000);
        });
    });
};

// Wish Submission & Thought Cloud Handler (Web3Forms Text-Only)
var initWishModal = function() {
    $(document).on('click', '.btn-wish-trigger', function(e) {
        e.preventDefault();
        $('#wish-modal').addClass('active');
    });

    $(document).on('click', '#wish-modal-close, #wish-modal', function(e) {
        if (e.target === this) {
            $('#wish-modal').removeClass('active');
        }
    });

    $(document).on('input', '#wish-message-input', function() {
        var currentLength = $(this).val().length;
        $('#char-count').text(currentLength);
    });

    $('#wish-form').on('submit', function(e) {
        e.preventDefault();

        var form = this;
        var submitBtn = $('#wish-submit-btn');
        var statusDiv = $('#wish-form-status');

        submitBtn.prop('disabled', true).text('Sending...');

        var formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(async function(response) {
            var res = await response.json();
            if (response.status === 200) {
                statusDiv.css('color', '#28a745').text('Thank you! Your wish has been sent! ❤️').show();
                form.reset();
                $('#char-count').text('0');

                setTimeout(function() {
                    $('#wish-modal').removeClass('active');
                    statusDiv.hide();
                    submitBtn.prop('disabled', false).html('<span>Send Wish 🚀</span>');
                }, 2500);
            } else {
                statusDiv.css('color', '#dc3545').text(res.message || 'Something went wrong. Please try again!').show();
                submitBtn.prop('disabled', false).html('<span>Send Wish 🚀</span>');
            }
        })
        .catch(function(error) {
            console.error(error);
            statusDiv.css('color', '#dc3545').text('Network error. Please try again!').show();
            submitBtn.prop('disabled', false).html('<span>Send Wish 🚀</span>');
        });
    });
};
	
var initTimelineGallery = function() {
    if ($('.timeline-img-preview').length > 0 && $.fn.magnificPopup) {
        
        // 1. Unbind previous handlers to prevent duplicate firing
        $(document).off('click touchend', '.timeline-img-preview:not(#engagement-trigger)');

        // 2. Initialize standard Magnific Popup
        $('.timeline-img-preview').not('#engagement-trigger').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom',
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300
            }
        });

        // 3. Universal Click & Tap Fallback (Works on BOTH Desktop & Mobile)
        $(document).on('click touchend', '.timeline-img-preview:not(#engagement-trigger)', function(e) {
            var $this = $(this);
            var targetUrl = $this.attr('href');

            if (targetUrl && targetUrl !== 'javascript:void(0);') {
                e.preventDefault(); 
                e.stopPropagation();

                $.magnificPopup.open({
                    items: {
                        src: targetUrl
                    },
                    type: 'image',
                    closeOnContentClick: true,
                    fixedContentPos: true
                });
            }
        });
    }
};
	
// Dynamic Programme Sliced Puzzle Switcher & Sequential Scroll Reveal Effect
var initProgrammeImageSwitcher = function() {
    function updateProgrammeSlices() {
        var lang = (localStorage.getItem("selectedLang") || "EN").toUpperCase();
        var isMobile = window.innerWidth <= 768;
        var orientation = isMobile ? 'portrait' : 'landscape';
        var totalSlices = (orientation === 'portrait') ? 10 : 8;

        var $container = $('#programme-puzzle-container');
        if ($container.length === 0) return;

        var html = '';
        for (var i = 1; i <= totalSlices; i++) {
            html += '<img src="images/programme_' + orientation + '_' + lang + '_' + i + '.png" alt="Wedding Programme Slice ' + i + '" class="img-responsive center-block programme-slice" style="width: 100%; height: auto; display: block;">';
        }
        $container.html(html);

        // Immediately reveal if the section is already visible in the viewport on load/resize
        var $section = $('#fh5co-venue-programme');
        if ($section.length > 0) {
            var elementTop = $section.offset().top;
            var viewportBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < viewportBottom) {
                $section.addClass('in-view');
                $section.find('.programme-slice').addClass('revealed');
            }
        }
    }

    // Run immediately and on resize/flag change
    updateProgrammeSlices();
    $(window).on('resize', function() {
        updateProgrammeSlices();
    });

    $(document).on('click', '.flag-btn', function() {
        setTimeout(updateProgrammeSlices, 50);
    });

    // Sequential Scroll Reveal & Fade-Out Waypoint
    if ($('#fh5co-venue-programme').length > 0) {
        $('#fh5co-venue-programme').waypoint(function(direction) {
            var $slices = $('#fh5co-venue-programme').find('.programme-slice');
            if (direction === 'down') {
                $('#fh5co-venue-programme').addClass('in-view');
                $slices.each(function(index) {
                    var $slice = $(this);
                    setTimeout(function() {
                        $slice.addClass('revealed');
                    }, index * 180); // Stagger each slice by 90ms for a smooth cascade
                });
            } else if (direction === 'up') {
                $('#fh5co-venue-programme').removeClass('in-view');
                $slices.removeClass('revealed');
            }
        }, { offset: '85%' });
    }
};

// Interactive Split Venue Slider & Swipe Handler
var initVenueSplitSection = function() {
    var $container = $('#split-container');
    if ($container.length === 0) return;

    var $left = $('#split-left');
    var $right = $('#split-right');
    var $slider = $('#split-slider');
    var $contentLeft = $('#content-left');
    var $contentRight = $('#content-right');
    var $title = $('#venue-split-title');
    var $indicator = $('#split-indicator');

    function updateSplit(pos) {
        var currentPos = Math.max(5, Math.min(95, pos));
        var revealThreshold = 35; // Threshold for full view unlock
        var rightWidth = 100 - currentPos;

        $left.css('width', currentPos + '%');
        $right.css('width', rightWidth + '%');
        $slider.css('left', currentPos + '%');
        
        $contentLeft.css('width', currentPos + '%');
        $contentRight.css('width', rightWidth + '%');

        // Title turns green when sliding left (revealing Bellsol / light-bg on the right side)
        if (currentPos <= revealThreshold) {
            $title.addClass('light-bg');
        } else {
            $title.removeClass('light-bg');
        }

        // Content reveal logic
        if (currentPos >= (100 - revealThreshold)) {
            $contentLeft.css({'opacity': '1', 'pointer-events': 'auto'});
        } else {
            $contentLeft.css({'opacity': '0', 'pointer-events': 'none'});
        }

        if (currentPos <= revealThreshold) {
            $contentRight.css({'opacity': '1', 'pointer-events': 'auto'});
        } else {
            $contentRight.css({'opacity': '0', 'pointer-events': 'none'});
        }

        // Center indicator fade out when fully unlocked, visible near center (40% to 60%)
        if (currentPos > 40 && currentPos < 60) {
            $indicator.removeClass('fade-out');
        } else {
            $indicator.addClass('fade-out');
        }
    }

    // Initialize at exact 50% split
    updateSplit(50);

    // Smooth Dragging & Touch/Mouse Support
    var isDragging = false;

    $container.on('mousedown touchstart', function(e) {
        if ($(e.target).closest('.travel-instructions-box, .inline-gallery-container, button').length > 0) return;
        isDragging = true;
        var clientX = e.clientX || (e.originalEvent.touches && e.originalEvent.touches[0].clientX);
        if (clientX) {
            var containerOffset = $container.offset().left;
            var containerWidth = $container.width();
            var newPos = ((clientX - containerOffset) / containerWidth) * 100;
            updateSplit(newPos);
        }
    });

    $(document).on('mousemove touchmove', function(e) {
        if (!isDragging) return;
        var clientX = e.clientX || (e.originalEvent.touches && e.originalEvent.touches[0].clientX);
        if (!clientX) return;
        var containerOffset = $container.offset().left;
        var containerWidth = $container.width();
        var newPos = ((clientX - containerOffset) / containerWidth) * 100;
        updateSplit(newPos);
    });

    $(document).on('mouseup touchend', function() {
        isDragging = false;
    });

    // Bellsol Inline Gallery Logic
    var bellsolIndex = 0;
    var bellsolItems = [
        'images/bellsol_0.jpg',
		'images/bellsol_01.jpg',
        'images/bellsol_1.jpg',
        'images/bellsol_2.jpg',
        'images/bellsol_3.jpg',
        'images/bellsol_4.jpg',
        'images/bellsol_5.jpg',
        'images/bellsol_6.jpg',
        'images/bellsol_7.jpg',
        'images/bellsol_8.jpg',
        'images/bellsol_9.jpg',
        'images/bellsol_10.jpg',
        'images/bellsol_11.jpg',
        'images/bellsol_12.jpg'
    ];

    function renderInlineBellsolItem(idx) {
        $('#inline-bellsol-stage').html('<img src="' + bellsolItems[idx] + '" alt="Venue photo ' + (idx + 1) + '" style="max-width:100%; max-height:100%; object-fit:contain;">');
        $('#inline-bellsol-counter').text((idx + 1) + ' / ' + bellsolItems.length);
    }

    renderInlineBellsolItem(0);

    $(document).on('click', '#inline-bellsol-next', function(e) {
        e.preventDefault();
        bellsolIndex = (bellsolIndex + 1) % bellsolItems.length;
        renderInlineBellsolItem(bellsolIndex);
    });

    $(document).on('click', '#inline-bellsol-prev', function(e) {
        e.preventDefault();
        bellsolIndex = (bellsolIndex - 1 + bellsolItems.length) % bellsolItems.length;
        renderInlineBellsolItem(bellsolIndex);
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
    initGiftModal();
    initWishModal();
    initTimelineGallery(); 
	initProgrammeImageSwitcher();
	initVenueSplitSection();
});

})(jQuery);

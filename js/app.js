/* Theme Name: Yaari - Landing page Template
   Author: Zoyothemes
   Version: 1.0.0
   Created:Oct 2016
   File Description:Main JS
*/

!function($) {
    "use strict";

    var ContactForm = function() {
        this.$contactForm = $("#cform"),
        this.$message = $("#message"),
        this.$submitButton = $("#submit")
    };
    //contact form submit handler
    ContactForm.prototype.submitForm = function(e) {
        var $this = this;

        var action = $(this).attr('action');

        $this.$message.slideUp(750, function () {
            $this.$message.hide();

            $this.$submitButton.before('<img src="images/ajax-loader.gif" class="contact-loader" id="contact-loader" />').attr('disabled', 'disabled');

            var data_string = $this.$contactForm.serialize(); // Collect data from form
            $.ajax({
                type: "POST",
                url: $this.$contactForm.attr('action'),
                data: data_string,
                timeout: 6000,
                cache: false,
                crossDomain: false,
                error: function (request, error) {
                    $this.$message.html('An error occurred: ' + error + '').show(500).delay(4000).animate({
                        height: 'toggle'
                    }, 500, function () {});
                    $('#contact-loader').fadeOut('slow', function () {
                        $(this).remove()
                    });
                },
                success: function (data) {
                    $this.$message.html(data).show(500).delay(4000).animate({
                        height: 'toggle'
                    }, 500, function () {});

                    $('#contact-loader').fadeOut('slow', function () {
                        $(this).remove()
                    });
                    $this.$submitButton.removeAttr('disabled');
                }
            });
        });
        return false;
    },

    ContactForm.prototype.init = function () {
        var $this = this;
        //initializing the contact form
        this.$contactForm.parsley().on('form:submit', function() {
            $this.submitForm();
            return false;
        });
    },
    $.ContactForm = new ContactForm, $.ContactForm.Constructor = ContactForm

}(window.jQuery),


function($) {
    "use strict";

    var YaariApp = function() {
        this.$body = $('body'),
        this.$preLoaderEl = $('#preloader'),
        this.$loaderStatus = $("#status"),
        this.$navbarLinks = $('.navbar-nav a'),
        this.$stickyElements = $(".sticky"),
        this.$topSectionEl = $('#home-fullscreen'),
        this.$popupVideo = $('#popup-video'),
        this.$contactForm = $("#cform"),
        this.$owlCarousel = $("#owl-carousel")
    };

    YaariApp.prototype.initNavbar = function () {
        this.$navbarLinks.on('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    },
    //full screen
    YaariApp.prototype.setFullScreen = function () {
        if(this.$topSectionEl.length>0) {
            var windowHeight = $(window).height();
            this.$topSectionEl.css('height', windowHeight);
        }
    },
    //Magnific Popup
    YaariApp.prototype.initMagnificPopup = function () {
        this.$popupVideo.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });
    },
    //owl carousel
    YaariApp.prototype.initCarousel = function () {
        this.$owlCarousel.owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            autoplay: true,
            autoplayTimeout: 4000,
            responsive:{
                0:{
                    items:1
                }
            }
        });
    },
    //Flex Slider
    YaariApp.prototype.initFlexslider = function ($element) {
        $element.flexslider({
            animation: "slide",
            slideshowSpeed: 5000,
            animationSpeed: 1000,
            controlNav: false,
            directionNav: true
        });

        $('.is-prev').on('click', function() {
            $element.flexslider('prev')
            return false;
        })

        $('.is-next').on('click', function() {
            $element.flexslider('next')
            return false;
        })
    },


    //init
    YaariApp.prototype.init = function () {
        var $this = this;
        //window related event

        //Handling load event
        $(window).on('load', function() {
            var windowHeight = $(window).height();

            //hiding the loader on window load
            $this.$loaderStatus.fadeOut();
            $this.$preLoaderEl.delay(350).fadeOut('slow');
            $this.$body.delay(350).css({
                'overflow': 'visible'
            });

            //sticky
            $this.$stickyElements.sticky({
                topSpacing: 0
            });
        });

        //doc ready
        $(document).ready(function(e) {
            //initialize navbar
            $this.initNavbar();
            //full screen
            $this.setFullScreen();

            if($this.$popupVideo.length>0)
                $this.initMagnificPopup();

            if($this.$owlCarousel.length>0)
                $this.initCarousel();
            if($('#home-slider').length>0)
                $this.initFlexslider($('#home-slider'));
            
        });

        //Handling the resize event
        $(window).on('resize', function() {
            $this.setFullScreen();
        });

        //init contact app if contact form added in a page
        if(this.$contactForm.length>0)
            $.ContactForm.init();
    },
    //init
    $.YaariApp = new YaariApp, $.YaariApp.Constructor = YaariApp
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.YaariApp.init()
}(window.jQuery);


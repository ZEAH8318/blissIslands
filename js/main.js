var mainJs = {};
this.mainJs = mainJs;
var ANIMATION_EASING = 'easeOutExpo';
var ACTIVE_CLASS = "active";

$(document).ready(function() {
    mainJs.setCarousel(".swiper-container");
    mainJs.setScrollInteractive();
    mainJs.setHeader();
    mainJs.setNavigator();

    // 메뉴 호버시 서브 메뉴 펼치기
    $(document).on('mouseenter', '.nav-menu-list li', function () {
        $(this).children('.sub-menu').stop().slideDown();
        $(this).children('a').addClass('on');
    });
    // 메뉴 호버X 서브 메뉴 닫기
    $(document).on('mouseleave', '.nav-menu-list li', function () {
        $(this).children('.sub-menu').stop().slideUp();
        $(this).children('a').removeClass('on');
    });

    // 메뉴 호버시 헤더예약조회 펼치기
    $(document).on('mouseenter', '.util-menu__list li.re_check', function () {
	
        $(this).children('.util-subMenu').show();
        $(this).children('a').addClass('on');
		$(".util-menu__list").addClass('on');
    });
    // 메뉴 호버X 헤더예약조회 닫기
    $(document).on('mouseleave', '.util-menu__list li.re_check', function () {
        $(this).children('.util-subMenu').hide();
        $(this).children('a').removeClass('on');
		$(".util-menu__list").removeClass('on');
    });
    $('.js-sitemap').click(function() {
        $('.footer-siteMap').stop().slideDown();
    });
	$('.footer-siteMap .btn-close').click(function() {
        $('.footer-siteMap').stop().slideUp();
    });

    /* 오늘 하루닫기 */
    $(".todayClose").on("click", function(){
        $(".main_banner_wrap").hide();
    });

    // 메인 팝업 펼치기
    $(".btn-bell").on("click", function(){
        $("#main_pop_wrap").stop().slideDown();
    });
    // 메인 팝업 닫기
    $(".main_pop_close").on("click", function(){
        $("#main_pop_wrap").stop().slideUp();
    });

    // header 마우스 스크롤시 이미지 변경
    if (!$(".header").hasClass(":header-active")){
        $(".btn-bell").addClass("btn-bell-black");
    }else{
        $(".btn-bell").removeClass("btn-bell-black");
    }

});

$(window).on('load', function() {

})


mainJs.setCarousel = function(element) {


    $(element).each(function(index, item) {

        var item = $(item);
        var carouselOption = {};
        var slidesLength;
        if(!item.length){return}

        if(item.hasClass("js-full-fade")) {

            carouselOption = {
                loop:true,
                speed: 400,
                autoplay: {
                    delay: 5000,
                },
                effect: "fade",

                on: {
                    init: function(swiper) {
                        $(swiper.$el).closest(".main-visual").find(".main-title").addClass("active");
                        $(swiper.$el).closest(".main-visual").find(".main-desc").addClass("active");
                        $(swiper.$el).closest(".main-visual").find(".btnMainT").addClass("active");
                    }
                }
            }


            var fullFadeSwiper = new Swiper(element + ".js-full-fade", carouselOption);

        }   


        if(item.hasClass("js-cover-flow")) {

            slidesLength = $(".swiper-container.js-cover-flow .swiper-slide").length;

            carouselOption = {

                effect: "coverflow",
                loop: true,
                autoplay: {
                    delay: 3500,  
                },
                speed:450,
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                initialSlide: 0,
                
                coverflowEffect: {
                    rotate: 0,
                    stretch: "45%",
                    depth: 550,
                    modifier: 1,
                    slideShadows: false,

                },

                pagination: {
                    el: ".js-cover-flow + .main-carousel__pagination .swiper-pagination",
                    type: 'progressbar',
                    clickable: false,
                    
                },
                navigation: {
                    nextEl: ".main-section--stay .main-carousel-btn__next",
                    prevEl: ".main-section--stay .main-carousel-btn__prev"
                },

                on: {
                    slideChange : function(swiper) {
                        $(this.$el).next().find(".carousel-current").text(swiper.realIndex + 1)
                    },

                    init: function(swiper) {
                        $(this.$el).next().find(".carousel-length").text(swiper.slides.length/3)
                    }
                }
            }
            var sycingSwiper = new Swiper(".swiper-container--sycing", {
                slidesPerView: "auto",
                loop:true,
                initialSlide: 0,
                centeredSlides: true,
                allowTouchMove: false,
            })

            var coverFlowSwiper = new Swiper(element + ".js-cover-flow", carouselOption);
            coverFlowSwiper.controller.control = sycingSwiper
        }
       
 

        if(item.hasClass("js-package")) {

            slidesLength = $(".swiper-container.js-package .swiper-slide").length;

            carouselOption = {
                loop:true,
                grabCursor:true,
                slidesPerView: 3,
                spaceBetween: 30,
                navigation: {
                    nextEl: ".js-package .main-carousel-btn__next",
                    prevEl: ".js-package .main-carousel-btn__prev"
                },

                on: {
                    slideChange : function(swiper) {
                        $(this.$el).find(".carousel-current").text(swiper.realIndex + 1)
                    },
                    init: function(swiper) {
                        $(this.$el).find(".carousel-length").text(slidesLength)
                    }
                }
                
            }
            var pacakgeSwiper = new Swiper(element + ".js-package", carouselOption);
        }

        if(item.hasClass("js-frame")) {

            slidesLength = $(".swiper-container.js-frame .swiper-slide").length;

            carouselOption = {
                loop:true,
                speed: 500,
                navigation: {
                    nextEl: ".js-frame .main-carousel-btn__next",
                    prevEl: ".js-frame .main-carousel-btn__prev"
                },
                pagination: {
                    el: ".js-frame .main-carousel__pagination .swiper-pagination",
                    type: 'progressbar',
                    clickable: false,
                    
                },

                on: {
                    slideChange : function(swiper) {
                        $(this.$el).find(".carousel-current").text(swiper.realIndex + 1)
                    },

                    init: function(swiper) {
                        $(this.$el).find(".carousel-length").text(slidesLength)
                    }
                }
            }

            var frameSwiper = new Swiper(element + ".js-frame", carouselOption);
        }

        if(item.hasClass("js-gallery")) {

            carouselOption = {
                loop:true,
                slidesPerView: "auto",
                grabCursor:true,
                spaceBetween: 30,
                autoplay: {
                    delay: 4000,  
                },
                pagination: {
                    el: ".js-gallery .swiper-pagination",
                    
                    clickable: false,
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '"></span>';
                    }
                    
                },
                
            }

            var gallerySwiper = new Swiper(element + ".js-gallery", carouselOption);
        }
    })

    
}



var mainVideoContainer = document.querySelector(".main-video");
var mainVideo = mainVideoContainer.querySelector("video");
var videoBtnGroup = mainVideoContainer.querySelector(".main-video__control");
var videoPlay = videoBtnGroup.querySelector(".btn-play");
var videoThumbnail = $(".main-video__thum");

videoPlay.addEventListener("click", playVideo)

function playVideo(e) {

    e.preventDefault();
    var playing = mainVideoContainer.classList.contains("active");

    if(!playing){
        mainVideo.play();
        mainVideoContainer.classList.add("active");
        videoThumbnail.fadeOut();

        setTimeout(function() {
            mainVideoContainer.setAttribute("onclick", "pauseVideo()")
            
        }, 100)
    }
}
    
var pauseVideo = function() {
    var playing = mainVideoContainer.classList.contains("active");

    if(playing){
        mainVideo.pause();
        mainVideoContainer.classList.remove("active");
        videoThumbnail.fadeIn();
        
        setTimeout(function() {
            mainVideoContainer.removeAttribute("onclick")
            
        }, 100)
    }
}




mainJs.setHeader = function () {

    var header = $(".header");

    var didScroll; 
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = header.outerHeight();

    $(window).scroll(function(event){ 
        didScroll = true; 
    }); 

    setInterval(function() { 
        if (didScroll) { 
            hasScrolled(); didScroll = false; 
        } }, 250); 
        function hasScrolled() { 
            var st = $(this).scrollTop();

            if(Math.abs(lastScrollTop - st) <= delta){return;}

            if (st > lastScrollTop || st > navbarHeight){ 
                // Scroll Down 
                header.addClass('header-active');
            } else { 
                if(st + $(window).height() < $(document).height() && $(document).scrollTop() === 0) {
                    
                    header.removeClass("header-active"); 

            }

        }

            lastScrollTop = st;
    }

}

mainJs.setNavigator = function() {

    var navBtn = $(".btn-main-menu");
    var navigator = $(".nav");
    var body = $("body");
    
    navBtn.click(function() {
        navigator.addClass("nav-active");

        // nav 오픈 시 body 스크롤 X
        body.addClass("scrollLock");
    })

    var navCloseBtn = navigator.find(".btn-close");

    navCloseBtn.click(function() {
        navigator.removeClass("nav-active");

        // nav 닫을시 body 스크롤 O
        body.removeClass('scrollLock');
    })
}

mainJs.openDetailView = function(element) {
    

    var el = $(element);

    if(!el.length){return}

    if((window.innerHeight / 2) - $(".header").outerHeight() < el.outerHeight()/2 ) {
        $(".header").removeClass("header-active")
    }

    el.addClass("show");
}

mainJs.closeDetailView = function(element) {
    

    var el = $(element);

    if(!el.length){return}

    el.removeClass("show");
}

mainJs.setScrollInteractive = function() {

    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
  
    $('.ml13').each(function(){
        $(this).html($(this).text().replace(/\S/g, "<span class='letter'>$&</span>"));
        
        var letters = $(this).find(".letter");
        for(i=0; i<letters.length; i++){
            letters.eq(i).css({"transitionDelay":(80*i)*.001 + "s"})
        }
    });
    
      
    //var parallax = document.querySelectorAll('.scroll-content');
    var scrollImages = document.querySelectorAll('.js-scroll-img');
    var scrollTitles = document.querySelectorAll('.js-scroll-tit');

    window.addEventListener('scroll', function () {
        var viewportOffset;
        var visibilityIndex;

        for (var i = 0; i < scrollImages.length; i++) {
            
            viewportOffset = scrollImages[i].getBoundingClientRect();
            visibilityIndex = viewportOffset.top / window.innerHeight * 100;
  
            if (visibilityIndex >= -30 && visibilityIndex <= 90) {
                
                if(!scrollImages[i].classList.contains(ACTIVE_CLASS)) {
                    scrollImages[i].classList.add(ACTIVE_CLASS);
                    js-scroll-tit[i].classList.add(ACTIVE_CLASS);
                }

                
            } else {
                // if(scrollImages[i].classList.contains(ACTIVE_CLASS)) {
                //     scrollImages[i].classList.remove(ACTIVE_CLASS);
                //     js-scroll-tit[i].classList.remove(ACTIVE_CLASS);
                     
                // }
            }
        }
  
        for(var j = 0; j < scrollTitles.length; j++) {

            viewportOffset = scrollTitles[j].getBoundingClientRect();
            visibilityIndex = viewportOffset.top / window.innerHeight * 100;

            var actived = scrollTitles[j].classList.contains(ACTIVE_CLASS);
            if (visibilityIndex >= -10 && visibilityIndex <= 100) {
                
                if(!actived) {
                    
                    $('.ml13').each(function(){
                        
                        var letters = $(this).find(".letter");
                        for(i=0; i<letters.length; i++){
                            letters.eq(i).css({"transitionDelay": (80*i)*.001 + "s"})
                        }
                    });

                    scrollTitles[j].classList.add(ACTIVE_CLASS);
                }
                
            } else {
                // if(actived) {

                //     $('.ml13').each(function(){
                        
                //         var letters = $(this).find(".letter");
                //         for(i=0; i<letters.length; i++){
                //             letters.eq(i).css({"transitionDelay": 0 + "s"})
                //         }
                //     });
                //     scrollTitles[j].classList.remove(ACTIVE_CLASS);
                    
                // }
            }
        }
      //}
    }, window.supportsPassive ? {
      passive: true
    } : false);
  
}

/*function moveLetters() {
    anime.timeline({loop: false})
    .add({
        targets: '.ml13 .letter',
        translateY: [50,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutCubic",
        duration: 750,
        delay: function(el, i) {
            return  100 + 80 * i;
        }
    })

    
}*/

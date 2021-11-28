function perker_svg(){
   jQuery('img.svg').each(function(){
        var jQueryimg 		= jQuery(this);
        var imgClass		= jQueryimg.attr('class');
        var imgURL			= jQueryimg.attr('src');

        jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var jQuerysvg = jQuery(data).find('svg');
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                jQuerysvg = jQuerysvg.removeAttr('xmlns:a');
                // Replace image with new SVG
                jQueryimg.replaceWith(jQuerysvg);
        }, 'xml');
    });
}

function tdProgress(container){
    container.find('.progress_inner').each(function(i) {
        var progress 		= jQuery(this);
        var pValue 			= parseInt(progress.data('value'), 10);
        var pColor			= progress.data('color');
        var pBarWrap 		= progress.find('.bar');
        var pBar 			= progress.find('.bar_in');
        pBar.css({width:pValue+'%', backgroundColor:pColor});
        setTimeout(function(){pBarWrap.addClass('open');},(i*300));
    });
}

function perker_images(){
    var data			= jQuery('*[data-img-url]');
    data.each(function(){
        var element		= jQuery(this);
        var url			= element.data('img-url');
        element.css({backgroundImage: 'url('+url+')'});
    });
}

function perker_hero_height(){
    var WH		= jQuery(window).height();
    var hero	= jQuery('.perker_hero_wrap');
    var bgimg = window.innerWidth < 790 ? 'url(/img/hero/4.jpg)' : 'url(/img/hero/3.jpg)';

    hero.css({
        height:WH,
        'background-image' : bgimg
    });
}

function perker_about_top(){
    var hero	= jQuery('.perker_hero_wrap').height();
    var about	= jQuery('#about');
    about.css({marginTop:hero});
}

function perker_menu_bg(){
    jQuery(window).on('scroll',function(){
        var WinOffset		= jQuery(window).scrollTop();
        var topBar			= jQuery('.perker_topbar');
        if(WinOffset >= 500){
            topBar.addClass('animate');
        }else{
            topBar.removeClass('animate');
        }
    });
}

function perker_mobile_menu(){
    var trigger			= jQuery('.perker_topbar .trigger');
    var triggerMenu		= jQuery('.perker_topbar .trigger .menu');
    var triggerClose	= jQuery('.perker_topbar .trigger .close');
    var dropdown		= jQuery('.perker_topbar .dropdown');

    trigger.on('click',function(){
        var element	= jQuery(this);

        if(element.hasClass('opened')){
            element.removeClass('opened');
            triggerMenu.removeClass('opened');
            triggerClose.removeClass('opened');
            dropdown.slideUp();
        }else{
            element.addClass('opened');
            triggerMenu.addClass('opened');
            triggerClose.addClass('opened');
            dropdown.slideDown();
        }
        return false;
    });
}

function perker_anchor(){
    jQuery('.perker_topbar .menu ul li a,.perker_topbar .dropdown .main ul li a').off().on('click',function(e){
        e.stopPropagation();
        var element = jQuery(this);
        var url			= element.attr('href');
        if(url !== '#' && url.charAt(0) === '#'){
            $('html, body').animate({
                scrollTop: $(url).offset().top-85
            }, 1000);
        }
        return false;
    });
}

function perker_appear(){
    var div		= jQuery('.perker_appear');
    div.each(function(){
        var element	= jQuery(this);
        element.waypoint({
            handler:function(){
                element.addClass('load');
            },
            offset:"60%"
        });
    });
}

function perker_popup(){
    jQuery('.gallery_zoom').each(function() { // the containers for all your galleries
        jQuery(this).magnificPopup({
            delegate: 'a.zoom', // the selector for gallery item
            type: 'image',
            gallery: {
              enabled:true
            },
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });
    });
}

function perker_ripple(){
    jQuery('#ripple').ripples({
        resolution: 500,
        dropRadius: 20,
        perturbance: 0.04
    });
}

function perker_hero_effect(){
    jQuery(window).on('scroll',function(){
        var currentScroll		= window.pageYOffset;
        jQuery(".perker_hero_wrap,.glitch").css({'transform': 'scale('+(100 - currentScroll/100)/99+')','opacity' : (1 - (currentScroll/20) / 15)});
    });
}

function perker_preloader(){
    var mainPreloader	 = $(".perker_loader-wrapper .loader");
    var WinWidth 		 = $(window).width();
    var WinHeight		 = $(window).height();
    var zero = 0;
    mainPreloader.css({
        top: WinHeight / 2 - 2.5,
        left: WinWidth / 2 - 200
    });
    do {
        mainPreloader.animate({
            width: zero
        }, 10);
        zero += 3;
    } while (zero <= 400);

    if (zero === 402) {
        mainPreloader.animate({
            left: 0,
            width: '100%'
        });
        mainPreloader.animate({
            top: '0',
            height: '100vh'
        });
    }

    setTimeout(function() {
        $(".perker_loader-wrapper").fadeOut('fast');
        (mainPreloader).fadeOut('fast');
    }, 4500);
}

function animateTyping(payload = {})
{
    new Typed(payload.selector ? payload.selector :'#typed-animation', {
        strings: payload.strings.length ? payload.strings : ['Software Developer', 'Software Developer'],
        typeSpeed: 60,
        loop: true,
        backDelay: 1200,
        backSpeed: 60,
    });
}

function notifyMe(title='', text='', icon='/img/logo/logo.png') {
  if (!("Notification" in window)) {
    console.warn("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(title ? title : 'Welcome', { body: text, icon: icon });
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(title ? title : 'Welcome', { body: text, icon: icon });
      }
    });
  }
}


if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/js/sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}

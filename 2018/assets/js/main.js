$(document).ready(function() {
    particlesJS.load('particles-js', '/assets/json/particles.json', function() {
        console.log('particles.js loaded');
    });

    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 387.5, 'easeOutSine', function() {
                window.location.hash = hash;
            });
        }
    });
});


$(window).scroll(function() {
    var max;
    var mq = window.matchMedia("(max-width: 992px)");
    if (mq.matches) {
        max = 100;
    }
    else {
        max = 75;
    }
    if ($(this).scrollTop() > 50) {
        $('#scrollToTop:hidden').fadeIn();
        if ($(this).scrollTop() > max) {
            $('#mlh-trust-badge').fadeIn();
        }
    }
    else if ($(this).scrollTop() < max) {
        $('#mlh-trust-badge').fadeOut();
        if ($(this).scrollTop() < 50) {
            $('#scrollToTop').fadeOut();
        }
    }


});

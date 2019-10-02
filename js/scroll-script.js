// Smooth Scrolling Script
$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
});

// Mobile menu icon rotation
i = 1;
$('.fas.fa-bars').click(function () {
    elem = this;

    $({rotation: 90 * !i}).animate({rotation: 90 * i}, {
        duration: 400,
        step: function (now) {
            $(elem).css({'transform': 'rotate(' + now + 'deg)'});
        }
    });
    i = !i;
});

// Navbar color change with scoll
$(window).scroll(function () {
    var hT = $('#about').offset().top,
        hH = $('#about').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
    if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
        $('nav').removeClass('scrolled')
    } else {
        $('nav').addClass('scrolled')
    }
});

// // Hide and show scroll-to-top button
// $(window).scroll(function() {
//     var scrollHeight = $(this).scrollTop();
//     var sponsorTop = $('#sponsors-head').offset().top;
//     var sponsorHeight = $('#sponsors-head').outerHeight();
//
//     if (!$('#top-button').hidden && scrollHeight > 100) {
//         $('#top-button').fadeIn();
//     } else {
//         $('#top-button').fadeOut();
//     }
//
//     var buttonTop = (scrollHeight + $(window).height() - 85);
//     var buttonBottom = (scrollHeight + $(window).height() - 50);
//     if (buttonTop >= sponsorTop && buttonBottom <= sponsorTop + sponsorHeight) {
//         $('#top-button').css('box-shadow', '0 0 5px #BBB');
//     } else {
//         $('#top-button').css('box-shadow', 'none');
//     }
//
// });
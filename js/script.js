// Smooth Scrolling Script
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});

// Mobile Menu Icon Rotation
i = 1;
$('.fas.fa-bars').click(function(){
  elem = this;
  
  $({rotation: 90*!i}).animate({rotation: 90*i}, {
    duration: 400,
    step: function(now) {
      $(elem).css({'transform' : 'rotate('+ now +'deg)'});
    }
  });
  i=!i;
});

// NavBar Color Change with Scoll
$(window).scroll(function() {
  var hT = $('#about').offset().top,
      hH = $('#about').outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
  if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
     $('nav').removeClass('scrolled')
  } else {
     $('nav').addClass('scrolled')
  }
});


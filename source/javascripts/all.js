$(document).on('ready page:load', function() {

  var $bar = $('.js-follow');
  var minY = $bar.height();
  var nowY = 0;
  var lastY = 0;
  var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  //http://stackoverflow.com/questions/2863547
  if (iOS) {
    $(window).on('touchstart', function () {
      lastY = $(window).scrollTop();
    });
    $(window).on('touchend', function () {
      var y = $(window).scrollTop();
      if (y < lastY || y - $bar.outerHeight() < minY) {
        scrollUp(y);
      } else if (y > lastY) {
        scrollDown(y);
      }
    });
  } else {
    $(window).on('scroll', _.throttle(updateScroll, 100));
  }
  function updateScroll() {
    var y = $(window).scrollTop();
    if (y < lastY) {
      scrollUp(y);
    } else if (y > lastY) {
      scrollDown(y);
    }
    lastY = $(window).scrollTop();
  }
  function scrollUp(y) {
    log('scrollUp, ', y+', ', lastY);
    $('.js-output').append('scrollUp');

    if (y >= minY) {
      $bar.css({top: '0px'});
      $bar.addClass('is-transition');
    } else if (y < 0) {
      $bar.removeClass('is-fixed');
    }
  };
  function scrollDown(y) {
    log('scrollDown, ', y+', ', lastY);
    if (y >= minY) {
      if($bar.hasClass('is-fixed')) {
        $bar.addClass('is-fixed');
        $bar.css({top: -minY+'px'});
        $bar.addClass('is-transition');
      } else {
        $bar.addClass('is-fixed');
        $bar.css({top: -minY+'px'});
        $bar.removeClass('is-transition');
      }
    } else {
      $bar.removeClass('is-fixed');
    }
  };
  function log() {
    if(typeof console == "undefined") return;
    $('.js-output').prepend(console, jQuery.makeArray(arguments));
  };

});

$(document).on('ready', function() {

  var $header = $('.js-follow');
  var minY = $header.height();
  var lastY = 0;
  $(window).on('scroll', _.throttle(updateScroll, 100));
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
      $header.css({top: '0px'});
      $header.addClass('is-transition');
    } else if (y < 0) {
      $header.removeClass('is-fixed');
    }
  };
  function scrollDown(y) {
    log('scrollDown, ', y+', ', lastY);
    if (y >= minY) {
      if($header.hasClass('is-fixed')) {
        $header.addClass('is-fixed');
        $header.css({top: -minY+'px'});
        $header.addClass('is-transition');
      } else {
        $header.addClass('is-fixed');
        $header.css({top: -minY+'px'});
        $header.removeClass('is-transition');
      }
    } else {
      $header.removeClass('is-fixed');
    }
  };
  function log() {
    if(typeof console == "undefined") return;
    $('.js-output').prepend(console, jQuery.makeArray(arguments));
  };

});

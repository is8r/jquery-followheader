/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Howto:

    $('.js-followheader').followheader();
*/

;(function(jQuery) {

  var pluginName = 'followheader';
  $[pluginName] = function(element, options) {

    var defaults = {
        pluginName: pluginName,
        minY: 0,
        lastY: 0,
        debug: ''
    }
    var plugin = this;
    plugin.settings = {}

    plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);
        plugin.initListner();
    },

    //----------------------------------------------------------------------

    plugin.initListner = function(e) {
      plugin.settings.lastY = 0;
      plugin.settings.minY = $(element).height();
      $(window).on('scroll', _.throttle(plugin.updateScroll, 100));
    },

    plugin.updateScroll = function(e) {
      var y = $(window).scrollTop();
      if (y < plugin.settings.lastY) {
        plugin.scrollUp(y);
      } else if (y > plugin.settings.lastY) {
        plugin.scrollDown(y);
      }
      plugin.settings.lastY = $(window).scrollTop();
    },

    plugin.scrollUp = function(y) {
      plugin.log('scrollUp, ', y+', ', plugin.settings.lastY);
      if (y >= plugin.settings.minY) {
        $(element).css({top: '0px'});
        $(element).addClass('is-transition');
      } else if (y < 0) {
        $(element).removeClass('is-fixed');
      }
    },

    plugin.scrollDown = function(y) {
      plugin.log('scrollDown, ', y+', ', plugin.settings.lastY);
      if (y >= plugin.settings.minY) {
        if($(element).hasClass('is-fixed')) {
          $(element).addClass('is-fixed');
          $(element).css({top: -plugin.settings.minY+'px'});
          $(element).addClass('is-transition');
        } else {
          $(element).addClass('is-fixed');
          $(element).css({top: -plugin.settings.minY+'px'});
          $(element).removeClass('is-transition');
        }
      } else {
        $(element).removeClass('is-fixed');
      }
    },

    plugin.log = function() {
      if(plugin.settings.debug == '') return;
      if(typeof console == "undefined") return;
      $(plugin.settings.debug).prepend(console, jQuery.makeArray(arguments));
    },

    //----------------------------------------------------------------------

    plugin.init();
  }

  $.fn[pluginName] = function(options) {if(!options) options = {};options.items = [];return this.each(function(i) {options.id = i;options.items.push($(this));if (undefined == $(this).data(pluginName)) {var plugin = new $[pluginName](this, options);$(this).data(pluginName, plugin);}});}

})(jQuery);

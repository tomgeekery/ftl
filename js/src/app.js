
/* JavaScript for FTL theme */

(function ($) {
  Drupal.behaviors.ftlTheme = {
    attach: function (context, settings) {
      alert('hello');

      // Give external links target="_blank"
      $a.each(function(i) {
        if (this.href.length && this.hostname !== window.location.hostname) {
          $(this).attr('target','_blank');
        }
      });
    }
  };

})(jQuery);

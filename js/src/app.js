
/* JavaScript for FTL theme */
Drupal.behaviors.ftlTheme = {
  attach: function (context, settings) {
    // Give external links target="_blank"
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      if (link.href.length && link.hostname !== window.location.hostname) {
        link.target = "_blank";
      }
    });
  }
};


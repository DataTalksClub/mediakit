(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    if (window.lucide) window.lucide.createIcons();

    // ---- Goal picker ----
    // The goal lives in the URL hash (#goal-trial). With a goal, the question
    // is replaced by that goal's formats; any other hash brings the question
    // back. Links do the navigation, so sharing and the back button just work.
    var section = document.getElementById("goals");
    var panels = document.querySelectorAll("[data-goal-panel]");
    if (!section || !panels.length) return;

    var goalFromHash = function () {
      var match = /^#goal-([a-z-]+)$/.exec(window.location.hash);
      if (!match) return null;
      return section.querySelector('[data-goal-panel="' + match[1] + '"]') ? match[1] : null;
    };

    var render = function () {
      var key = goalFromHash();
      panels.forEach(function (panel) {
        var on = panel.getAttribute("data-goal-panel") === key;
        panel.classList.toggle("is-active", on);
        if (!on) {
          panel.querySelectorAll("details[open]").forEach(function (d) {
            d.open = false;
          });
        }
      });
      section.classList.toggle("has-goal", !!key);
      window.scrollTo(0, 0);
    };

    render();
    window.addEventListener("hashchange", render);
  });
})();

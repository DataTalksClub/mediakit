(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // ---- Mobile menu ----
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (toggle && menu) {
      var openIcon = toggle.querySelector('[data-menu-icon="open"]');
      var closeIcon = toggle.querySelector('[data-menu-icon="close"]');
      var setOpen = function (open) {
        menu.classList.toggle("hidden", !open);
        if (openIcon) openIcon.classList.toggle("hidden", open);
        if (closeIcon) closeIcon.classList.toggle("hidden", !open);
      };
      toggle.addEventListener("click", function () {
        setOpen(menu.classList.contains("hidden"));
      });
      menu.querySelectorAll("[data-mobile-link]").forEach(function (link) {
        link.addEventListener("click", function () {
          setOpen(false);
        });
      });
    }

    // ---- Lightbox ----
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");
    var lightboxClose = document.getElementById("lightbox-close");
    if (lightbox && lightboxImg) {
      var closeLightbox = function () {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
        document.body.style.overflow = "";
      };
      document.querySelectorAll("[data-zoom-src]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          lightboxImg.src = btn.getAttribute("data-zoom-src");
          lightbox.classList.remove("hidden");
          document.body.style.overflow = "hidden";
        });
      });
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
      if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
      lightboxImg.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLightbox();
      });
    }

    // ---- Testimonial "Read more" (clamped cards) ----
    var tCards = document.querySelectorAll("[data-testimonial-card]");
    var revealReadMore = function () {
      tCards.forEach(function (card) {
        var quote = card.querySelector("[data-quote]");
        var btn = card.querySelector("[data-readmore]");
        if (!quote || !btn) return;
        var clamped = quote.classList.contains("line-clamp-[7]");
        if (clamped && quote.scrollHeight > quote.clientHeight + 4) {
          btn.classList.remove("hidden");
        } else if (clamped) {
          btn.classList.add("hidden");
        }
      });
    };
    tCards.forEach(function (card) {
      var quote = card.querySelector("[data-quote]");
      var btn = card.querySelector("[data-readmore]");
      if (!quote || !btn) return;
      btn.addEventListener("click", function () {
        var expanded = !quote.classList.contains("line-clamp-[7]");
        if (expanded) {
          quote.classList.add("line-clamp-[7]");
          btn.textContent = "Read more";
        } else {
          quote.classList.remove("line-clamp-[7]");
          btn.textContent = "Read less";
        }
      });
    });
    revealReadMore();
    window.addEventListener("load", revealReadMore);

    // ---- Goal picker ----
    // The sponsor picks what they want; only the matching formats are shown.
    // The choice lives in the URL hash (#goal-trial) so a link to one goal can
    // be shared.
    var goalButtons = document.querySelectorAll("[data-goal]");
    var goalPanels = document.querySelectorAll("[data-goal-panel]");
    var goalEmpty = document.getElementById("goal-empty");
    var goalFromHash = function () {
      var match = /^#goal-([a-z-]+)$/.exec(window.location.hash);
      if (!match) return null;
      return document.querySelector('[data-goal-panel="' + match[1] + '"]') ? match[1] : null;
    };
    var selectGoal = function (key, scroll) {
      var active = null;
      goalPanels.forEach(function (panel) {
        var on = panel.getAttribute("data-goal-panel") === key;
        panel.classList.toggle("is-active", on);
        if (on) active = panel;
      });
      goalButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.getAttribute("data-goal") === key ? "true" : "false");
      });
      if (goalEmpty) goalEmpty.classList.toggle("is-hidden", !!active);
      if (active && scroll) {
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        active.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
      revealReadMore();
    };
    goalButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.getAttribute("data-goal");
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#goal-" + key);
        }
        selectGoal(key, true);
      });
    });
    if (goalPanels.length) {
      var initialGoal = goalFromHash();
      if (initialGoal) selectGoal(initialGoal, true);
      window.addEventListener("hashchange", function () {
        var key = goalFromHash();
        if (key) selectGoal(key, true);
      });
    }
  });
})();

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

    // ---- Audience donut charts ----
    if (window.Chart && Array.isArray(window.CHART_DATA)) {
      Chart.defaults.font.family = "Inter, sans-serif";
      document.querySelectorAll("canvas.js-donut").forEach(function (canvas) {
        var idx = parseInt(canvas.getAttribute("data-chart-index"), 10);
        var chart = window.CHART_DATA[idx];
        if (!chart) return;
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: chart.data.map(function (d) { return d.name; }),
            datasets: [{
              data: chart.data.map(function (d) { return d.value; }),
              backgroundColor: chart.data.map(function (d) { return d.color; }),
              borderWidth: 0,
              spacing: 3,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "62%",
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (ctx) { return ctx.label + ": " + ctx.parsed + "%"; },
                },
              },
            },
          },
        });
      });
    }
  });
})();

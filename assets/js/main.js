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

    // ---- Audience analytics modal ----
    var audienceModal = document.getElementById("audience-modal");
    var audienceModalTitle = document.getElementById("audience-modal-title");
    var audienceModalItems = document.getElementById("audience-modal-items");
    var audienceModalClose = document.getElementById("audience-modal-close");
    var audienceModalBackdrop = audienceModal && audienceModal.querySelector("[data-audience-modal-backdrop]");
    var audienceModalPreviousFocus = null;
    if (audienceModal && audienceModalTitle && audienceModalItems && Array.isArray(window.CHART_DATA)) {
      var closeAudienceModal = function () {
        audienceModal.classList.add("hidden");
        audienceModal.classList.remove("flex");
        document.body.style.overflow = "";
        if (audienceModalPreviousFocus) audienceModalPreviousFocus.focus();
      };
      document.querySelectorAll("[data-audience-modal-open]").forEach(function (button) {
        button.addEventListener("click", function () {
          var idx = parseInt(button.getAttribute("data-chart-index"), 10);
          var chart = window.CHART_DATA[idx];
          if (!chart) return;

          audienceModalTitle.textContent = chart.title;
          audienceModalItems.textContent = "";
          chart.data.forEach(function (item) {
            var row = document.createElement("div");
            row.className = "flex items-center justify-between gap-3 rounded-xl bg-secondary/70 px-3 py-2.5";

            var label = document.createElement("div");
            label.className = "flex items-center gap-2 min-w-0";
            var marker = document.createElement("span");
            marker.className = "w-2.5 h-2.5 rounded-full flex-shrink-0";
            marker.style.backgroundColor = item.color;
            var name = document.createElement("span");
            name.className = "text-sm text-muted-foreground";
            name.textContent = item.name;
            label.appendChild(marker);
            label.appendChild(name);

            var value = document.createElement("span");
            value.className = "text-sm font-semibold text-foreground flex-shrink-0";
            value.textContent = Number(item.value).toFixed(1) + "%";
            row.appendChild(label);
            row.appendChild(value);
            audienceModalItems.appendChild(row);
          });

          audienceModalPreviousFocus = button;
          audienceModal.classList.remove("hidden");
          audienceModal.classList.add("flex");
          document.body.style.overflow = "hidden";
          if (audienceModalClose) audienceModalClose.focus();
        });
      });
      if (audienceModalClose) audienceModalClose.addEventListener("click", closeAudienceModal);
      if (audienceModalBackdrop) audienceModalBackdrop.addEventListener("click", closeAudienceModal);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !audienceModal.classList.contains("hidden")) closeAudienceModal();
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

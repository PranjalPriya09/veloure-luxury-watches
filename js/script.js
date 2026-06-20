document.addEventListener("DOMContentLoaded", function () {

  // a solid background to the sticky nav
  var nav = document.getElementById("siteNav");
  function updateNavBackground() {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  updateNavBackground();
  window.addEventListener("scroll", updateNavBackground);

  // Mobile menu toggle.
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Mobile menu close after picking a link.
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Fade sections up into view as the page scrolls.
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    // No IntersectionObserver support — just shows everything.
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  // Carousels (novelties + services)
 
  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var viewport = carousel.querySelector(".carousel-viewport");
    var track = carousel.querySelector(".carousel-track");
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
    var prevBtn = carousel.querySelector(".carousel-arrow.prev");
    var nextBtn = carousel.querySelector(".carousel-arrow.next");
    var dotsWrap = carousel.querySelector(".carousel-dots");
    var index = 0;
    var maxIndex = 0;
    var dots = [];

    function visibleCount() {
      var slideWidth = slides[0].getBoundingClientRect().width;
      return Math.max(1, Math.round(viewport.clientWidth / slideWidth));
    }

    function buildDots() {
      dotsWrap.innerHTML = "";
      dots = [];
      for (var i = 0; i <= maxIndex; i++) {
        var dot = document.createElement("button");
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", (function (slideIndex) {
          return function () { goTo(slideIndex); };
        })(i));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    function render() {
      var slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = "translateX(-" + (index * slideWidth) + "px)";
      dots.forEach(function (dot, d) {
        dot.classList.toggle("active", d === index);
      });
      prevBtn.classList.toggle("is-disabled", index === 0);
      nextBtn.classList.toggle("is-disabled", index === maxIndex);
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, maxIndex));
      render();
    }

    function refresh() {
      maxIndex = Math.max(0, slides.length - visibleCount());
      index = Math.min(index, maxIndex);
      buildDots();
      render();
    }

    prevBtn.addEventListener("click", function () { goTo(index - 1); });
    nextBtn.addEventListener("click", function () { goTo(index + 1); });

    // Swipe support for touch screens.
    var startX = null;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX > 50) goTo(index - 1);
      if (deltaX < -50) goTo(index + 1);
      startX = null;
    });

    // Arrow-key support when a slide is focused.
    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    refresh();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 150);
    });
  });

});

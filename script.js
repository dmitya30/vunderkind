(function () {
  'use strict';

  /* ====== BURGER MENU ====== */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Закрытие меню при клике на ссылку
  nav.querySelectorAll('.header__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Закрытие меню при клике вне его
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ====== REVIEWS CAROUSEL ====== */
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards = track.querySelectorAll('.review-card');
  const totalCards = cards.length;
  let currentIndex = 0;
  let autoplayTimer = null;
  let visibleCount = getVisibleCount();

  function getVisibleCount() {
    var w = window.innerWidth;
    if (w <= 768) return 1;
    return 2;
  }

  function getGap() {
    return 24;
  }

  function updateCarousel() {
    var gap = getGap();
    var cardWidth = (track.parentElement.offsetWidth - gap * (visibleCount - 1)) / visibleCount;
    var offset = currentIndex * (cardWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';
  }

  function goNext() {
    var maxIndex = totalCards - visibleCount;
    if (maxIndex < 0) maxIndex = 0;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function goPrev() {
    var maxIndex = totalCards - visibleCount;
    if (maxIndex < 0) maxIndex = 0;
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  }

  nextBtn.addEventListener('click', function () {
    goNext();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', function () {
    goPrev();
    resetAutoplay();
  });

  // Autoplay
  function startAutoplay() {
    autoplayTimer = setInterval(goNext, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();

  // Recalc on resize
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      visibleCount = getVisibleCount();
      var maxIndex = totalCards - visibleCount;
      if (maxIndex < 0) maxIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      updateCarousel();
    }, 150);
  });

  // Swipe support
  var touchStartX = 0;
  var touchEndX = 0;

  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
      resetAutoplay();
    }
  }, { passive: true });

  // Initial position
  updateCarousel();

  /* ====== CERTIFICATE MODAL ====== */
  var modal = document.getElementById('certModal');
  var modalImg = document.getElementById('modalImg');
  var modalClose = document.getElementById('modalClose');
  var modalOverlay = document.getElementById('modalOverlay');
  var certThumbs = document.querySelectorAll('[data-cert]');

  certThumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function (e) {
      e.preventDefault();
      var src = this.getAttribute('href');
      modalImg.src = src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ====== HEADER SHADOW ON SCROLL ====== */
  var header = document.getElementById('header');
  var scrollThreshold = 10;

  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

})();

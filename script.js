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

  function updateCarousel() {
    var gap = 24;
    var cardWidth = track.parentElement.offsetWidth;
    var offset = currentIndex * (cardWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';
  }

  function goNext() {
    currentIndex = currentIndex >= totalCards - 1 ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function goPrev() {
    currentIndex = currentIndex <= 0 ? totalCards - 1 : currentIndex - 1;
    updateCarousel();
  }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  // Recalc on resize
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      if (currentIndex >= totalCards) currentIndex = totalCards - 1;
      updateCarousel();
    }, 150);
  });

  // Swipe support
  var touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); else goPrev();
    }
  }, { passive: true });

  updateCarousel();

  // === IMAGE MODAL (certificates + gallery) ===
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || 'Изображение';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  // Certificates
  document.querySelectorAll('[data-cert]').forEach(thumb => {
    thumb.addEventListener('click', e => {
      e.preventDefault();
      openModal(thumb.href, thumb.querySelector('img')?.alt);
    });
  });

  // Gallery
  document.querySelectorAll('[data-gallery]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      openModal(item.href, item.querySelector('img')?.alt);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
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

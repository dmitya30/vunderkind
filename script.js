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
  var track = document.getElementById('track');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var progressFill = document.getElementById('progressFill');
  var reviewCounter = document.getElementById('reviewCounter');
  var cards = track.querySelectorAll('.review-card');
  var totalCards = cards.length;
  var currentIndex = 0;

  function updateCarousel() {
    var gap = 24;
    var containerWidth = track.parentElement.offsetWidth;
    var offset = currentIndex * (containerWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';

    // Обновляем индикатор
    var percent = ((currentIndex + 1) / totalCards) * 100;
    progressFill.style.width = percent + '%';
    reviewCounter.textContent = (currentIndex + 1) + ' / ' + totalCards;

    // Адаптируем высоту трека под текущую карточку
    var currentCard = cards[currentIndex];
    if (currentCard) {
      track.style.height = currentCard.offsetHeight + 'px';
    }
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

  // Пересчитать высоту после загрузки шрифтов
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      updateCarousel();
    });
  }

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

  /* ====== CTA MODAL ====== */
  var ctaModal = document.getElementById('ctaModal');
  var ctaClose = document.getElementById('ctaClose');
  var ctaOverlay = document.getElementById('ctaOverlay');

  function openCtaModal(e) {
    e.preventDefault();
    ctaModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCtaModal() {
    ctaModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', openCtaModal);
  });

  ctaClose.addEventListener('click', closeCtaModal);
  ctaOverlay.addEventListener('click', closeCtaModal);

  // Escape закрывает любую активную модалку (уже есть для сертификатов, добавляем CTA)

  /* ====== ACCESSIBILITY & UNIFIED UI STATE ====== */
  var lastDialogTrigger = null;
  var dialogSelector = '[role="dialog"], #modal, #ctaModal';

  function getActiveDialog() {
    return document.querySelector(
      '[role="dialog"].active, #modal.active, #ctaModal.active'
    );
  }

  function getFocusableElements(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), ' +
        'select:not([disabled]), textarea:not([disabled]), ' +
        '[tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (element) {
      return !element.hasAttribute('hidden') &&
        element.getAttribute('aria-hidden') !== 'true';
    });
  }

  function syncDialogAccessibility() {
    document.querySelectorAll(dialogSelector).forEach(function (dialog) {
      var isActive = dialog.classList.contains('active');
      dialog.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
  }

  function focusActiveDialog() {
    var dialog = getActiveDialog();

    if (!dialog) return;

    syncDialogAccessibility();

    var focusable = getFocusableElements(dialog);
    if (focusable.length) {
      focusable[0].focus();
    } else {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus();
    }
  }

  function restoreDialogTrigger() {
    syncDialogAccessibility();

    if (
      lastDialogTrigger &&
      document.contains(lastDialogTrigger) &&
      typeof lastDialogTrigger.focus === 'function'
    ) {
      lastDialogTrigger.focus();
    }

    lastDialogTrigger = null;
  }

  document.querySelectorAll(dialogSelector).forEach(function (dialog) {
    if (!dialog.classList.contains('active')) {
      dialog.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest(
      '[data-cta], a[href*="assets/certs/"], .gallery__item'
    );

    if (trigger) {
      lastDialogTrigger = trigger;
      window.setTimeout(focusActiveDialog, 0);
      return;
    }

    window.setTimeout(function () {
      if (!getActiveDialog() && lastDialogTrigger) {
        restoreDialogTrigger();
      }
    }, 0);
  });

  document.addEventListener('keydown', function (e) {
    var dialog = getActiveDialog();

    if (e.key === 'Escape') {
      if (dialog) {
        if (
          typeof ctaModal !== 'undefined' &&
          ctaModal &&
          ctaModal.classList.contains('active')
        ) {
          closeCtaModal();
        } else {
          closeModal();
        }

        restoreDialogTrigger();
        return;
      }

      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
      }

      return;
    }

    if (e.key !== 'Tab' || !dialog) return;

    var focusable = getFocusableElements(dialog);

    if (!focusable.length) {
      e.preventDefault();
      dialog.focus();
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

})();

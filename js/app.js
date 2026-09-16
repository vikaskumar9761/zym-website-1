/**
 * Personal Trainers HK (PTHK) - Main Application Controller
 * Handles trainer directory filtering, before/after slider, scroll animations, modals & dynamic UI
 */

let currentCurrency = 'HKD'; // 'HKD' or 'USD'

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderTrainers('all');
  initTrainerFilters();
  initTransformationSlider();
  initInstagramFeed();
  initModals();
  initCurrencyToggle();
  initFaqAccordion();
  initCounters();
  initScrollReveals();
});

// 1. Navigation & Header Effects
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('primary-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'ri-close-line';
        document.body.style.overflow = 'hidden';
      } else {
        icon.className = 'ri-menu-4-line';
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on clicking any link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-4-line';
      });
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-4-line';
      }
    });
  }
}

// 2. Scroll Reveals using IntersectionObserver
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .trainer-card, .program-card, .stat-box, .perk-card, .ig-card');
  
  revealElements.forEach((el, index) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      if (index % 3 === 1) el.classList.add('delay-1');
      if (index % 3 === 2) el.classList.add('delay-2');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// 3. Trainer Directory Renderer & Filter
function renderTrainers(disciplineFilter = 'all', locationFilter = 'all') {
  const grid = document.getElementById('trainers-grid');
  if (!grid || !PTHK_DATA) return;

  const filtered = PTHK_DATA.trainers.filter(trainer => {
    const matchDiscipline = disciplineFilter === 'all' || trainer.discipline === disciplineFilter;
    const matchLocation = locationFilter === 'all' || trainer.locations.includes(locationFilter);
    return matchDiscipline && matchLocation;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
        <i class="ri-user-search-line" style="font-size: 3rem; color: var(--primary-orange); margin-bottom: 1rem; display: inline-block;"></i>
        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">No coaches matched this exact combination</h3>
        <p style="color: var(--text-secondary);">Try resetting filters or use our <a href="#quiz-section" style="color: var(--primary-orange); text-decoration: underline;">Trainer Matchmaker Quiz</a>.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(t => {
    const rate = currentCurrency === 'HKD' ? `${t.rateHKD} HKD` : `$${t.rateUSD} USD`;
    return `
      <div class="trainer-card reveal" data-id="${t.id}">
        <div class="trainer-image-container">
          <img src="${t.image}" alt="${t.name} - Personal Trainer Hong Kong" class="trainer-img" loading="lazy">
          <div class="trainer-badge">${t.badge}</div>
          <div class="trainer-locations-overlay">
            <i class="ri-map-pin-2-fill"></i> ${t.locations.join(' • ')}
          </div>
        </div>

        <div class="trainer-content">
          <div class="trainer-header-row">
            <div>
              <h3 class="trainer-name">${t.name}</h3>
              <span class="trainer-subtitle">${t.title}</span>
            </div>
            <div class="trainer-rating-pill">
              <i class="ri-star-fill"></i> ${t.rating}
            </div>
          </div>

          <p class="trainer-bio-short">${t.bio}</p>

          <div class="trainer-cert-tags">
            ${t.certifications.slice(0, 3).map(cert => `<span class="cert-tag">${cert}</span>`).join('')}
          </div>

          <div class="trainer-stats-row">
            <div class="stat-item">
              <span class="stat-num">${t.experience}</span>
              <span class="stat-lbl">Experience</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">${t.transformationsCount}+</span>
              <span class="stat-lbl">Client Wins</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">${rate}</span>
              <span class="stat-lbl">Per Session</span>
            </div>
          </div>

          <div class="trainer-card-actions">
            <button class="btn btn-primary btn-block" onclick="openBookingModalWithTrainer('${t.id}')">
              <i class="ri-calendar-event-line"></i> Book Consultation
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-attach observer to new cards
  initScrollReveals();
}

function initTrainerFilters() {
  const filterBtns = document.querySelectorAll('.trainer-filter-btn');
  const locationSelect = document.getElementById('trainer-location-select');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const discipline = btn.getAttribute('data-discipline');
      const location = locationSelect ? locationSelect.value : 'all';
      renderTrainers(discipline, location);
    });
  });

  if (locationSelect) {
    locationSelect.addEventListener('change', () => {
      const activeBtn = document.querySelector('.trainer-filter-btn.active');
      const discipline = activeBtn ? activeBtn.getAttribute('data-discipline') : 'all';
      renderTrainers(discipline, locationSelect.value);
    });
  }
}

// 4. Transformation Before/After Slider (Mouse & Touch Enabled)
function initTransformationSlider() {
  const container = document.getElementById('transformation-slider-container');
  const handle = document.getElementById('slider-handle');
  const beforeImgWrapper = document.getElementById('slider-before-wrapper');

  if (!container || !handle || !beforeImgWrapper) return;

  let isDragging = false;

  function setSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let posX = clientX - rect.left;
    posX = Math.max(0, Math.min(rect.width, posX));
    const percent = (posX / rect.width) * 100;

    handle.style.left = `${percent}%`;
    beforeImgWrapper.style.width = `${percent}%`;
  }

  function onPointerDown(e) {
    isDragging = true;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function onPointerUp() {
    isDragging = false;
  }

  // Mouse events
  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  // Touch events for mobile phones
  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);
}

// 5. Instagram Feed Showcase
function initInstagramFeed() {
  const igGrid = document.getElementById('instagram-posts-grid');
  if (!igGrid || !PTHK_DATA.instagramPosts) return;

  const posts = [
    {
      img: 'assets/images/hero-bg.jpg',
      tag: '🔥 #PTHK Form Workshop',
      likes: '1,420',
      caption: 'Correcting deadlift lockout mechanics with coach @marcusvance in Central HK.'
    },
    {
      img: 'assets/images/trainer-sarah.jpg',
      tag: '✨ #PTHK Client Spotlight',
      likes: '2,150',
      caption: '12-Week Female Body Sculpting transformation. Sustainable nutrition, real strength.'
    },
    {
      img: 'assets/images/trainer-alex.jpg',
      tag: '🥊 #PTHK Fight Conditioning',
      likes: '1,890',
      caption: 'High-intensity boxing pad drills. Burn 700+ kcal in 45 focused minutes in TST.'
    },
    {
      img: 'assets/images/trainer-kenji.jpg',
      tag: '🌿 #PTHK Mobility Reset',
      likes: '1,120',
      caption: 'Say goodbye to lower back desk stiffness with these 3 decompression drills.'
    }
  ];

  igGrid.innerHTML = posts.map(post => `
    <a href="https://www.instagram.com/personaltrainershk/" target="_blank" rel="noopener noreferrer" class="ig-card reveal">
      <div class="ig-img-wrap">
        <img src="${post.img}" alt="Instagram Post - Personal Trainers HK" class="ig-img" loading="lazy">
        <div class="ig-overlay">
          <span class="ig-tag-badge">${post.tag}</span>
          <p class="ig-caption">${post.caption}</p>
          <div class="ig-metrics">
            <span><i class="ri-heart-3-fill"></i> ${post.likes}</span>
            <span><i class="ri-instagram-line"></i> @personaltrainershk</span>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

// 6. Booking & Consultation Modals
function initModals() {
  const bookingModal = document.getElementById('booking-modal');
  const trainerModal = document.getElementById('trainer-join-modal');

  // Close modals on backdrop or close button
  document.querySelectorAll('.modal-close, .modal-backdrop').forEach(btn => {
    btn.addEventListener('click', () => {
      if (bookingModal) bookingModal.classList.remove('open');
      if (trainerModal) trainerModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Booking Form Submission
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('book-name').value;
      const phone = document.getElementById('book-phone').value;
      const trainerSelect = document.getElementById('book-trainer-select').value;
      const goal = document.getElementById('book-goal').value;
      const location = document.getElementById('book-location').value;
      const date = document.getElementById('book-date').value;

      // Construct WhatsApp message
      const msg = encodeURIComponent(
        `*New Consultation Booking - PTHK Website*\n` +
        `👤 Name: ${name}\n` +
        `📱 Phone: ${phone}\n` +
        `🎯 Goal: ${goal}\n` +
        `🏋️ Coach: ${trainerSelect}\n` +
        `📍 Location: ${location}\n` +
        `📅 Preferred Date: ${date}`
      );

      const whatsappUrl = `https://wa.me/85291234567?text=${msg}`;
      
      showToast('Booking request submitted! Redirecting to WhatsApp Concierge...');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        bookingModal.classList.remove('open');
        document.body.style.overflow = '';
        bookingForm.reset();
      }, 1000);
    });
  }

  // Trainer Join Form Submission
  const trainerForm = document.getElementById('trainer-join-form');
  if (trainerForm) {
    trainerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('coach-name').value;

      showToast(`Thank you, Coach ${name}! Your #PTHK Collective application has been received. Our review committee will contact you within 24 hours.`);
      trainerModal.classList.remove('open');
      document.body.style.overflow = '';
      trainerForm.reset();
    });
  }
}

// Global modal triggers
window.openBookingModal = function() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.openBookingModalWithTrainer = function(trainerId) {
  const modal = document.getElementById('booking-modal');
  const trainerSelect = document.getElementById('book-trainer-select');
  if (trainerSelect && trainerId) {
    trainerSelect.value = trainerId;
  }
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.openTrainerJoinModal = function() {
  const modal = document.getElementById('trainer-join-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

// 7. Currency Switcher (HKD / USD)
function initCurrencyToggle() {
  const toggleBtn = document.getElementById('currency-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    currentCurrency = currentCurrency === 'HKD' ? 'USD' : 'HKD';
    toggleBtn.textContent = currentCurrency;
    
    // Re-render trainers
    const activeFilter = document.querySelector('.trainer-filter-btn.active');
    const discipline = activeFilter ? activeFilter.getAttribute('data-discipline') : 'all';
    renderTrainers(discipline);

    // Update program prices
    document.querySelectorAll('.program-price-tag').forEach(tag => {
      const hkd = tag.getAttribute('data-hkd');
      const usd = tag.getAttribute('data-usd');
      if (currentCurrency === 'HKD' && hkd) {
        tag.textContent = hkd;
      } else if (currentCurrency === 'USD' && usd) {
        tag.textContent = usd;
      }
    });

    showToast(`Currency switched to ${currentCurrency}`);
  });
}

// 8. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

// 9. Animated Stat Counters
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = el.getAttribute('data-decimal') === 'true';
        let current = 0;
        const duration = 1600;
        const step = target / (duration / 25);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
            clearInterval(timer);
          } else {
            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
          }
        }, 25);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

// 10. Toast Notification System
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'site-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: var(--accent-emerald);"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

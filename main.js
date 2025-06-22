// Stars generation
function createStars() {
  const starsContainer = document.querySelector('.stars');
  if (!starsContainer) return;
  starsContainer.innerHTML = '';
  const numElements = 80; // Total stars and ghosts
  const ghostChance = 0.1; // 10% chance

  for (let i = 0; i < numElements; i++) {
    if (Math.random() < ghostChance) {
      // Create a ghost
      const ghost = document.createElement('div');
      ghost.className = 'ghost';
      ghost.textContent = '👻';
      ghost.style.left = Math.random() * 95 + '%'; // Keep within bounds
      ghost.style.top = Math.random() * 95 + '%';
      ghost.style.animationDelay = Math.random() * 8 + 's';
      ghost.style.animationDuration = Math.random() * 8 + 8 + 's'; // Random duration
      starsContainer.appendChild(ghost);
    } else {
      // Create a star
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.width = Math.random() * 2 + 1 + 'px';
      star.style.height = star.style.width;
      star.style.animationDelay = Math.random() * 2 + 's';
      starsContainer.appendChild(star);
    }
  }
}

// Hyperspace animation
function createHyperspaceLines() {
  const hyperspaceContainer = document.querySelector('.hyperspace-overlay');
  const numLines = 30;
  
  for (let i = 0; i < numLines; i++) {
    const line = document.createElement('div');
    line.className = 'hyperspace-line';
    line.style.top = Math.random() * 100 + '%';
    line.style.animationDelay = Math.random() * 0.3 + 's';
    hyperspaceContainer.appendChild(line);
  }
}

// Connect button functionality
function initConnectButton() {
  const connectBtn = document.querySelector('#connectBtn');
  const connectBtnText = connectBtn ? connectBtn.querySelector('.connect-btn-text') : null;
  const starsContainer = document.querySelector('.stars');

  if (!connectBtn || !connectBtnText || !starsContainer) {
    console.error('Required elements for connect button not found!');
    return;
  }

  let isConnected = false;
  let isProcessing = false; 

  connectBtn.addEventListener('click', () => {
    if (isProcessing) return;
    isProcessing = true;

    if (!isConnected) {
      // === CONNECTING ===
connectBtnText.textContent = 'Connecting...';
      connectBtn.classList.add('connecting');

      // Add temporary stars for a denser hyperspace effect
      addTemporaryHyperspaceStars(120);
      starsContainer.classList.add('stars-hyperspace');

      setTimeout(() => {
        // Scroll to download section
        const downloadSection = document.querySelector('#download');
        if (downloadSection) {
          downloadSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Update button state after scroll starts
        connectBtn.classList.remove('connecting');
        connectBtn.classList.add('connected');
connectBtnText.textContent = 'Connected';
        isConnected = true;
        isProcessing = false;

        // Reset stars after the new, faster animation
        setTimeout(() => {
          starsContainer.classList.remove('stars-hyperspace');
          // Clear all stars (original + temporary) and recreate the base set
          starsContainer.innerHTML = '';
          createStars();
        }, 1000); // Match the new animation duration

      }, 100); // Start scroll almost immediately
    } else {
connectBtnText.textContent = 'Disconnecting...';
      connectBtn.classList.remove('connected');
      connectBtn.classList.add('connecting');

      setTimeout(() => {
        connectBtn.classList.remove('connecting');
connectBtnText.textContent = 'Connect';
        isConnected = false;
        isProcessing = false;
      }, 1500);
    }
  });
}

function addTemporaryHyperspaceStars(count) {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Parallax effect for stars
function initParallax() {
    const stars = document.querySelector('.stars');
    if (!stars) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        stars.style.transform = `translateY(${scrollY * 0.3}px)`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature, .pricing-card, .server-card, .section-title, .hero-subtitle');

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px' }); // Trigger a bit earlier

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Server status simulation
function initServerStatus() {
  const statusDots = document.querySelectorAll('.status-dot');
  
  statusDots.forEach(dot => {
    // Simulate occasional status changes
    setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance every interval
        dot.style.background = '#fbbf24'; // Yellow for maintenance
        setTimeout(() => {
          dot.style.background = '#4ade80'; // Back to green
        }, 2000);
      }
    }, 10000);
  });
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  images.forEach(img => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
  
  // Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduced-animations');
  }
}

// --- Helper Functions ---
function formatPrice(price, symbol, isBefore) {
    return isBefore ? `${symbol}${price}` : `${price}${symbol}`;
}

// --- Language Switcher & Localization Logic ---
let currentDictionary = {};

const LOCALES = {
  en: 'locales/en.json',
  ru: 'locales/ru.json',
  zh: 'locales/zh.json',
};
const DEFAULT_LANG = 'en';

function getSavedLang() {
  return localStorage.getItem('lang') || DEFAULT_LANG;
}

function setSavedLang(lang) {
  localStorage.setItem('lang', lang);
}

async function loadLocale(lang) {
  const url = LOCALES[lang] || LOCALES[DEFAULT_LANG];
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Locale fetch failed');
    return await res.json();
  } catch (e) {
    console.error('Failed to load locale:', e);
    return {};
  }
}

function applyTranslations(dict) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      // Handle placeholders for input/textarea
      if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.hasAttribute('placeholder')) {
        el.placeholder = dict[key];
      } else { // Handle innerHTML for other elements
        el.innerHTML = dict[key];
      }
    }
  });
}

async function setLanguage(lang) {
  setSavedLang(lang);
  currentDictionary = await loadLocale(lang);
  applyTranslations(currentDictionary);

  // Update dynamic elements that don't use data-i18n
  updatePricingDisplay();

  const langSel = document.getElementById('langSwitcher');
  if (langSel) langSel.value = lang;
  document.documentElement.setAttribute('lang', lang);
}

function initLangSwitcher() {
  const langSel = document.getElementById('langSwitcher');
  if (!langSel) return;
  langSel.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
}

// --- End Language Switcher ---

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Language logic
  initLangSwitcher();
  setLanguage(getSavedLang());

  createStars();
  initConnectButton();
  initSmoothScrolling();
  initParallax();
  initScrollAnimations();
  initServerStatus();
  optimizePerformance();
  initPricingSwitcher();
  initPaymentModal();
  initLegalModals();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  const stars = document.querySelectorAll('.star');
  if (document.hidden) {
    // Pause animations when page is not visible
    stars.forEach(star => {
      star.style.animationPlayState = 'paused';
    });
  } else {
    // Resume animations when page becomes visible
    stars.forEach(star => {
      star.style.animationPlayState = 'running';
    });
  }
});

// Add keyboard navigation support


// Add focus management for accessibility


// Pricing switcher functionality
// This function is now responsible for updating the display based on the current dictionary.
function updatePricingDisplay() {
    const activeBtn = document.querySelector('.plan-selector .plan-btn.active');
    if (!activeBtn) return;

    const priceElement = document.getElementById('premium-price');
    const priceInfoElement = document.getElementById('premium-price-info');
    if (!priceElement || !priceInfoElement) return;

    const symbol = currentDictionary.currency_symbol || '₽';
    const isSymbolBefore = currentDictionary.currency_symbol_before_price === true;
    const prices = currentDictionary.prices || {};

    const period = activeBtn.dataset.period;
    const price = prices[period] || 'N/A';

    let priceText = '';
    let infoText = '';

    const perMonthText = currentDictionary.price_per_month || '/мес';

    switch (period) {
        case 'month':
            priceText = `${formatPrice(price, symbol, isSymbolBefore)}<span class="period">${perMonthText}</span>`;
            infoText = currentDictionary.price_info_monthly || 'Ежемесячная оплата';
            break;
        case 'half-year':
            priceText = formatPrice(price, symbol, isSymbolBefore);
            const monthlyHalfYear = (price / 6).toFixed(2);
            infoText = (currentDictionary.price_info_half_year || '...').replace('{price}', formatPrice(monthlyHalfYear, symbol, isSymbolBefore));
            break;
        case 'year':
            priceText = formatPrice(price, symbol, isSymbolBefore);
            const monthlyYear = (price / 12).toFixed(2);
            infoText = (currentDictionary.price_info_year || '...').replace('{price}', formatPrice(monthlyYear, symbol, isSymbolBefore));
            break;
    }

    priceElement.innerHTML = priceText;
    priceInfoElement.textContent = infoText;
}

function initPricingSwitcher() {
    const switcher = document.querySelector('.plan-selector');
    if (!switcher) return;

    const planButtons = switcher.querySelectorAll('.plan-btn');
    const priceElement = document.getElementById('premium-price');
    const priceInfoElement = document.getElementById('premium-price-info');

    if (!planButtons.length || !priceElement || !priceInfoElement) return;

        const updatePrice = (button) => {
        if (!button) return;
        planButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Update the display with the new selection using the localized function
        updatePricingDisplay();
    };

    planButtons.forEach(button => {
        button.addEventListener('click', () => updatePrice(button));
    });

        // Set initial state by calling the main update function
    updatePricingDisplay();
}

// Payment Modal Functionality
function initPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const paymentBtn = document.getElementById('paymentBtn');
    const closeModal = document.querySelector('.close-modal');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const selectedPlanName = document.getElementById('selectedPlanName');
    const selectedPlanPrice = document.getElementById('selectedPlanPrice');
    const paymentForm = document.getElementById('paymentForm');

    // Update modal with selected plan details
            function updateSelectedPlan() {
        const activePlanBtn = document.querySelector('.plan-btn.active');
        if (!activePlanBtn) return;

        const symbol = currentDictionary.currency_symbol || '₽';
        const isSymbolBefore = currentDictionary.currency_symbol_before_price === true;
        const prices = currentDictionary.prices || {};

        const period = activePlanBtn.dataset.period;
        const price = prices[period] || 'N/A';

        let priceText = '';
        let planName = currentDictionary.premium_title || 'Global Premium';
        const perMonthText = currentDictionary.price_per_month || '/мес';

        switch (period) {
            case 'month':
                priceText = formatPrice(price, symbol, isSymbolBefore) + perMonthText;
                planName += ` ${currentDictionary.plan_period_month || '(Месяц)'}`;
                break;
            case 'half-year':
                const monthlyHalfYear = (price / 6).toFixed(2);
                const infoHalfYear = (currentDictionary.price_info_half_year || '').replace('{price}', formatPrice(monthlyHalfYear, symbol, isSymbolBefore));
                priceText = `${formatPrice(price, symbol, isSymbolBefore)} (${infoHalfYear})`;
                planName += ` ${currentDictionary.plan_period_half_year || '(6 месяцев)'}`;
                break;
            case 'year':
                const monthlyYear = (price / 12).toFixed(2);
                const infoYear = (currentDictionary.price_info_year || '').replace('{price}', formatPrice(monthlyYear, symbol, isSymbolBefore));
                priceText = `${formatPrice(price, symbol, isSymbolBefore)} (${infoYear})`;
                planName += ` ${currentDictionary.plan_period_year || '(Год)'}`;
                break;
        }

        selectedPlanName.textContent = planName;
        selectedPlanPrice.textContent = priceText;
    }

    // Open modal
    paymentBtn.addEventListener('click', () => {
        updateSelectedPlan();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Handle payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
        });
    });

    // Handle form submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const selectedMethod = document.querySelector('.payment-method.selected');

        if (!selectedMethod) {
            alert('Пожалуйста, выберите способ оплаты');
            return;
        }

        // Here you would typically handle the payment processing
        console.log('Processing payment:', {
            email,
            paymentMethod: selectedMethod.dataset.method,
            plan: selectedPlanName.textContent,
            price: selectedPlanPrice.textContent
        });

        // For demo purposes, show success message
        alert('The service is temporarily unavailable');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Update plan when switching between periods
    const planButtons = document.querySelectorAll('.plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (modal.style.display === 'block') {
                updateSelectedPlan();
            }
        });
    });
}

// Legal modals (Privacy & Terms)
function initLegalModals() {
  const privacyLink = document.getElementById('privacyLink');
  const termsLink = document.getElementById('termsLink');
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');
  const privacyClose = document.getElementById('privacyClose');
  const termsClose = document.getElementById('termsClose');

  const openModal = (modal) => {
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  if (privacyLink) privacyLink.addEventListener('click', (e) => { e.preventDefault(); openModal(privacyModal); });
  if (termsLink) termsLink.addEventListener('click', (e) => { e.preventDefault(); openModal(termsModal); });

  if (privacyClose) privacyClose.addEventListener('click', () => closeModal(privacyModal));
  if (termsClose) termsClose.addEventListener('click', () => closeModal(termsModal));

  window.addEventListener('click', (e) => {
    if (e.target === privacyModal) closeModal(privacyModal);
    if (e.target === termsModal) closeModal(termsModal);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Language switcher functionality
  initLanguageSwitcher();

  // Pricing toggle functionality
  initPricingToggle();

  // Mobile menu toggle
  initMobileMenu();

  // FAQ accordion
  initFaqAccordion();

  // Newsletter popup
  setTimeout(showNewsletterPopup, 5000);

  // Carousel functionality
  initCarousel();

  // Video placeholder click
  initVideoPlaceholder();

  // Initialize animations
  initAnimations();
});

// Language switcher functionality
function initLanguageSwitcher() {
  const languageToggle = document.getElementById('language-toggle');
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageOptions = document.querySelectorAll('.language-dropdown a');
  const footerLanguageSelector = document.getElementById('footer-language-selector');

  // Default language is English
  let currentLanguage = 'en';

  // Load translations if available
  loadTranslations(currentLanguage);

  // Toggle dropdown on click
  if (languageToggle) {
    languageToggle.addEventListener('click', function(e) {
      e.preventDefault();
      languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Change language when option is clicked
  languageOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
      languageDropdown.style.display = 'none';
    });
  });

  // Change language from footer selector
  if (footerLanguageSelector) {
    footerLanguageSelector.addEventListener('change', function() {
      changeLanguage(this.value);
    });
  }

  // Click outside to close dropdown
  document.addEventListener('click', function(e) {
    if (languageToggle && !languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
      languageDropdown.style.display = 'none';
    }
  });

  function changeLanguage(lang) {
    currentLanguage = lang;
    if (languageToggle) {
      languageToggle.querySelector('span').textContent = lang.toUpperCase();
    }
    if (footerLanguageSelector) {
      footerLanguageSelector.value = lang;
    }
    loadTranslations(lang);
  }

  function loadTranslations(lang) {
    fetch(`locale/${lang}.json`)
      .then(response => response.json())
      .then(translations => {
        document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          if (translations[key]) {
            element.textContent = translations[key];
          }
        });
      })
      .catch(error => console.error('Error loading translations:', error));
  }
}

// Pricing toggle functionality
function initPricingToggle() {
  const billingToggle = document.getElementById('billing-toggle');
  const prices = document.querySelectorAll('.price[data-monthly][data-annual]');

  if (billingToggle) {
    billingToggle.addEventListener('change', function() {
      const isAnnual = this.checked;
      prices.forEach(price => {
        price.textContent = isAnnual ? price.getAttribute('data-annual') : price.getAttribute('data-monthly');
      });
    });
  }
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navButtons = document.querySelector('.nav-buttons');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) {
          mobileMenu = document.createElement('div');
          mobileMenu.className = 'mobile-menu';
          
          // Clone navigation links
          if (navLinks) {
            const clonedLinks = navLinks.cloneNode(true);
            mobileMenu.appendChild(clonedLinks);
          }
          
          // Clone buttons
          if (navButtons) {
            const clonedButtons = navButtons.cloneNode(true);
            mobileMenu.appendChild(clonedButtons);
          }
          
          // Add to DOM after the header
          const header = document.querySelector('header');
          header.parentNode.insertBefore(mobileMenu, header.nextSibling);
        }
        
        mobileMenu.style.display = 'block';
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Change icon to X
        this.querySelector('i').className = 'fas fa-times';
      } else {
        // Hide mobile menu
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
          mobileMenu.style.display = 'none';
        }
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Change icon back to bars
        this.querySelector('i').className = 'fas fa-bars';
      }
    });
  }
}

// FAQ accordion functionality
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.toggle-icon i');
    
    // Set initial state
    item.classList.remove('active');
    answer.style.display = 'none';
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.display = 'none';
          otherItem.querySelector('.toggle-icon i').className = 'fas fa-plus';
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.display = 'none';
        icon.className = 'fas fa-plus';
      } else {
        item.classList.add('active');
        answer.style.display = 'block';
        icon.className = 'fas fa-minus';
      }
    });
  });
}

// Newsletter popup functionality
function showNewsletterPopup() {
  const popup = document.querySelector('.newsletter-popup');
  const closeBtn = document.querySelector('.close-newsletter');
  const form = document.querySelector('.newsletter-form');
  
  // Check if user has already closed the popup
  const hasClosedPopup = localStorage.getItem('newsletterPopupClosed');
  
  if (!hasClosedPopup && popup) {
    popup.style.display = 'block';
    
    // Close button functionality
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        localStorage.setItem('newsletterPopupClosed', 'true');
      });
    }
    
    // Form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && email.includes('@')) {
          // Here you would typically send this to your backend
          console.log('Newsletter signup:', email);
          
          // Show success message
          form.innerHTML = '<p class="success">Thanks for subscribing!</p>';
          
          // Close after delay
          setTimeout(() => {
            popup.style.display = 'none';
            localStorage.setItem('newsletterPopupClosed', 'true');
          }, 3000);
        }
      });
    }
  }
}

// Carousel functionality
function initCarousel() {
  const carousel = document.querySelector('.screenshots-carousel');
  const slides = document.querySelectorAll('.screenshot-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  
  if (!carousel || slides.length === 0) return;
  
  let currentSlide = 0;
  
  // Initially show only the first slide
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
  });
  
  // Function to show a specific slide
  function showSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
  }
  
  // Event listeners for controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Auto rotate slides every 5 seconds
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

// Video placeholder functionality
function initVideoPlaceholder() {
  const videoPlaceholder = document.querySelector('.video-placeholder');
  
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function() {
      // This would normally create an iframe with the actual video
      // For demo purposes, we'll just show an alert
      alert('Video player would load here in a production environment.');
      
      // In a real implementation, you would replace the placeholder with:
      /*
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      
      this.innerHTML = '';
      this.appendChild(iframe);
      */
    });
  }
}

// Animation functionality
function initAnimations() {
  // Simple animation function to add fade-in effects
  const animate = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(el => {
      observer.observe(el);
    });
  };
  
  // Add animation classes to elements
  animate(document.querySelectorAll('.hero-content, .hero-image'), 'fade-in');
  animate(document.querySelectorAll('.problem-card, .feature-card'), 'slide-up');
  animate(document.querySelectorAll('.workflow-step'), 'slide-up');
  animate(document.querySelectorAll('.testimonial-card'), 'slide-up');
  animate(document.querySelectorAll('.pricing-card'), 'slide-up');
  
  // Add CSS for animations if not already in styles.css
  if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
      .fade-in {
        animation: fadeIn 1s ease forwards;
      }
      .slide-up {
        animation: slideUp 0.8s ease forwards;
      }
      .hero-content, .hero-image, .problem-card, .feature-card, .workflow-step, .testimonial-card, .pricing-card {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }
}


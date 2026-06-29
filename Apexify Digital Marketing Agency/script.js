/* ============================================
   APEXIFY - Premium Digital Marketing Agency
   Complete JavaScript Functionality
   Version: 2.0
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ===== DOM References =====
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const loader = document.getElementById('loading-screen');
  const themeToggle = document.getElementById('themeToggle');
  const announcementBar = document.querySelector('.announcement-bar');
  const closeBtn = document.querySelector('.btn-announcement');

  // ===== 1. Loading Screen with Progress =====
  if (loader) {
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    loader.appendChild(progressBar);
    
    const fill = progressBar.querySelector('.progress-fill');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => loader.classList.add('hidden'), 300);
        }, 200);
      }
      fill.style.width = progress + '%';
    }, 200);
  }

  // ===== 2. Sticky Header with Scroll Effect =====
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (header) {
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide/show header on scroll
      if (currentScroll > lastScroll && currentScroll > 300) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
    
    // Back to top button
    if (backToTop) {
      backToTop.style.display = currentScroll > 500 ? 'flex' : 'none';
    }

    // Update active navigation
    updateActiveLink();
  });

  // Back to top click
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== 3. Mobile Hamburger Menu =====
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu when clicking links
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // ===== 4. Active Navigation Link =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && (href === `#${current}` || href === `index.html#${current}`)) {
        link.classList.add('active');
      }
    });
  }

  // ===== 5. Animated Counters =====
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const stepTime = duration / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
          } else {
            counter.innerText = Math.ceil(current);
          }
        }, stepTime);
        
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));

  // ===== 6. Testimonial Slider =====
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;
  let slideInterval;
  
  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.95)';
      });
      
      slides[index].classList.add('active');
      setTimeout(() => {
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'scale(1)';
      }, 50);
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    function startSlideshow() {
      stopSlideshow();
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    }
    
    // Navigation buttons
    document.getElementById('nextTestimonial')?.addEventListener('click', () => {
      nextSlide();
      startSlideshow();
    });
    
    document.getElementById('prevTestimonial')?.addEventListener('click', () => {
      prevSlide();
      startSlideshow();
    });
    
    // Initialize
    showSlide(0);
    startSlideshow();
    
    // Pause on hover
    const slider = document.getElementById('testimonialSlider');
    slider?.addEventListener('mouseenter', stopSlideshow);
    slider?.addEventListener('mouseleave', startSlideshow);
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
        startSlideshow();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        startSlideshow();
      }
    });
  }

  // ===== 7. Portfolio Filter =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Filter items with animation
      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ===== 8. FAQ Accordion =====
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isActive = header.classList.contains('active');
      const content = header.nextElementSibling;
      
      // Close all accordions
      accordionHeaders.forEach(h => {
        h.classList.remove('active');
        const c = h.nextElementSibling;
        if (c) c.style.maxHeight = null;
      });
      
      // Open clicked accordion
      if (!isActive) {
        header.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  // ===== 9. Form Validation =====
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      // Clear previous errors
      form.querySelectorAll('.error-message').forEach(msg => msg.remove());
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      
      inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        // Check if empty
        if (!input.value.trim()) {
          isValid = false;
          formGroup?.classList.add('error');
          showError(formGroup, 'This field is required');
        } 
        // Email validation
        else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
            formGroup?.classList.add('error');
            showError(formGroup, 'Please enter a valid email address');
          }
        }
        // Phone validation (optional)
        else if (input.type === 'tel' && input.value.trim()) {
          const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
          if (!phoneRegex.test(input.value)) {
            isValid = false;
            formGroup?.classList.add('error');
            showError(formGroup, 'Please enter a valid phone number');
          }
        }
      });
      
      // Check checkbox if required
      const checkboxes = form.querySelectorAll('input[type="checkbox"][required]');
      checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
          isValid = false;
          const formGroup = checkbox.closest('.form-group');
          formGroup?.classList.add('error');
          showError(formGroup, 'You must accept the terms');
        }
      });
      
      if (isValid) {
        submitForm(form);
      }
    });
    
    // Real-time validation on input
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        if (input.value.trim()) {
          formGroup?.classList.remove('error');
          const errorMsg = formGroup?.querySelector('.error-message');
          if (errorMsg) errorMsg.remove();
        }
      });
    });
  });
  
  function showError(formGroup, message) {
    if (!formGroup) return;
    let errorMsg = formGroup.querySelector('.error-message');
    if (!errorMsg) {
      errorMsg = document.createElement('span');
      errorMsg.className = 'error-message';
      errorMsg.style.cssText = 'color: #EF4444; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
      formGroup.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }
  
  function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    // Store original state
    const originalText = submitBtn.innerHTML;
    const originalBg = submitBtn.style.background;
    
    // Show success state
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
    submitBtn.style.background = 'var(--gradient-4)';
    submitBtn.disabled = true;
    
    // Reset after delay
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = originalBg;
      submitBtn.disabled = false;
      form.reset();
    }, 3000);
    
    // Show toast notification
    showToast('Message sent successfully!', 'success');
  }
  
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'success-message glass-card';
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    
    // Animate out
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===== 10. Theme Toggle with Persistence =====
  const themeIcon = themeToggle?.querySelector('i');
  
  // Check saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon?.classList.replace('fa-moon', 'fa-sun');
  }
  
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    
    if (isLight) {
      themeIcon?.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon?.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });

  // ===== 11. Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        mobileMenu?.classList.remove('active');
        
        // Reset hamburger
        if (hamburger) {
          hamburger.setAttribute('aria-expanded', 'false');
          const spans = hamburger.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  });

  // ===== 12. Announcement Bar Close =====
  closeBtn?.addEventListener('click', () => {
    if (!announcementBar) return;
    
    announcementBar.style.maxHeight = announcementBar.offsetHeight + 'px';
    requestAnimationFrame(() => {
      announcementBar.style.maxHeight = '0';
      announcementBar.style.opacity = '0';
      announcementBar.style.padding = '0';
    });
    
    setTimeout(() => {
      announcementBar.style.display = 'none';
    }, 400);
  });

  // ===== 13. Parallax Effect for Hero =====
  const heroSection = document.querySelector('.hero-section');
  const blobs = document.querySelectorAll('.blob');
  
  if (heroSection && blobs.length > 0) {
    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 768) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;
        
        blobs.forEach((blob, index) => {
          const speed = (index + 1) * 0.5;
          blob.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
      }
    });
  }

  // ===== 14. Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .glass-card, .stat-item, .timeline-step, .service-card, .portfolio-item, .pricing-card, .blog-card, .team-card'
  );
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
  });

  // ===== 15. Newsletter Form =====
  const newsletterForms = document.querySelectorAll('.newsletter-form, .sidebar-newsletter');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        showToast('Thank you for subscribing!', 'success');
        emailInput.value = '';
      }
    });
  });

  // ===== 16. Keyboard Navigation =====
  document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
      const spans = hamburger?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
      hamburger?.focus();
    }
  });

  // ===== 17. Console Welcome =====
  console.log('%c🚀 Apexify Premium Digital Marketing Agency %cReady', 
    'color: #4F46E5; font-size: 1.2em; font-weight: bold;', 
    'color: #06B6D4;');
  console.log('%c✨ All interactive features initialized successfully', 'color: #94A3B8;');
});

// ===== Performance Optimization =====
window.addEventListener('load', () => {
  // Remove loading screen if still present
  const loader = document.getElementById('loading-screen');
  if (loader && !loader.classList.contains('hidden')) {
    loader.style.opacity = '0';
    setTimeout(() => loader.classList.add('hidden'), 300);
  }
  
  // Lazy load images if any
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
});

// ===== Error Handling =====
window.onerror = function(msg, url, line, col, error) {
  console.error('Error:', msg, 'at', url, 'line:', line, 'col:', col);
  // Could send to error tracking service here
  return false;
};

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
});

// ===== Service Worker Registration (Optional) =====
// Uncomment to enable offline support
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => console.log('SW registered:', registration.scope))
//       .catch(error => console.log('SW registration failed:', error));
//   });
// }
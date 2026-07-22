import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  // --- Navigation & Mobile Menu ---
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = navLinks.querySelectorAll('a');

  // Sticky Header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // --- Floating CTA visibility ---
  const floatingCta = document.getElementById('floating-cta');
  const heroSection = document.getElementById('home');
  
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Show floating CTA only when hero section is out of view
      if (!entry.isIntersecting) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    });
  }, { threshold: 0 });
  
  if (heroSection) {
    ctaObserver.observe(heroSection);
  }

  // --- Number Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.innerText = Math.ceil(current) + (target > 500 ? '+' : (target < 10 ? '+' : ''));
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target + (target > 500 ? '+' : (target < 10 ? '+' : ''));
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));

  // --- Before & After Slider ---
  const splitSlider = document.getElementById('split-slider');
  const afterImg = document.getElementById('after-img');
  const sliderBar = document.getElementById('slider-bar');

  if (splitSlider && afterImg && sliderBar) {
      const updateSlider = () => {
          const val = splitSlider.value;
          // Update the clip path of the after-image
          afterImg.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
          // Update the position of the sliding chrome bar
          sliderBar.style.left = `${val}%`;
      };

      // Trigger on range change
      splitSlider.addEventListener('input', updateSlider);
      
      // Initial call to set 50% split on mount
      updateSlider();
  }

  // --- Portfolio Filtering (Visual only for now) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // In a real scenario, this would filter the grid items.
      // For visual demonstration, we'll just toggle the active class.
    });
  });

  // --- WhatsApp Booking Form Logic ---
  const whatsappForm = document.getElementById('whatsapp-form');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const brand = document.getElementById('brand').value;
      const model = document.getElementById('model').value;
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      const message = document.getElementById('message').value;
      
      // Format the WhatsApp message
      const text = `*New Booking Request - VR Detailers*%0A%0A` +
                   `*Name:* ${name}%0A` +
                   `*Phone:* ${phone}%0A` +
                   `*Vehicle:* ${brand} ${model}%0A` +
                   `*Service:* ${service}%0A` +
                   `*Preferred Date:* ${date}%0A` +
                   `*Message:* ${message ? message : 'N/A'}`;
      
      // Replace with actual business WhatsApp number
      const whatsappNumber = '917981510874';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
      
      window.open(whatsappUrl, '_blank');
    });
  }
});

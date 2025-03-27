// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Show content after loading animation
  setTimeout(function() {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
  }, 2000);
  
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile nav when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (navToggle && navToggle.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });
  
  // Contact Modal
  const contactBtn = document.getElementById('contact-btn');
  const contactModal = document.getElementById('contact-modal');
  const closeModal = document.querySelector('.close-modal');
  
  if (contactBtn && contactModal) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeModal && contactModal) {
    closeModal.addEventListener('click', function() {
      contactModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
      
      // Close modal
      contactModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
  
  // Slideshow functionality
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(n) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and activate the corresponding dot
      slides[n].classList.add('active');
      dots[n].classList.add('active');
      
      currentSlide = n;
    }
    
    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    // Event listeners for next and previous buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showSlide(index);
      });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
  }
  
  // Countdown timer for services page
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (daysEl && hoursEl && minutesEl && secondsEl) {
    // Set the launch date (30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    function updateCountdown() {
      const currentTime = new Date();
      const diff = launchDate - currentTime;
      
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);
      const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      const minutes = Math.floor(diff / 1000 / 60) % 60;
      const seconds = Math.floor(diff / 1000) % 60;
      
      daysEl.innerHTML = days < 10 ? '0' + days : days;
      hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
      minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
      secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Initial call
    updateCountdown();
  }
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.about-section, .vision-section, .projects-section, .contact-section, .services-section, .past-projects, .previous-projects');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial styles for animation
  const sectionsToAnimate = document.querySelectorAll('.about-section, .vision-section, .projects-section, .contact-section, .services-section, .past-projects, .previous-projects');
  sectionsToAnimate.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial check
  animateOnScroll();
});

// Handle network errors
window.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
    console.error('Resource loading error:', e);
  }
});

window.addEventListener('online', function() {
  if (document.getElementById('loading-screen').classList.contains('hidden')) {
    location.reload();
  }
});

window.addEventListener('offline', function() {
  window.location.href = 'error.html';
});
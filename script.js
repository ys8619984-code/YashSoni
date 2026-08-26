// Yash Soni Portfolio Website - Logic & Interactions (Technical Editorial Slate Edition)

document.addEventListener('DOMContentLoaded', () => {
  
  // Lucide Icons Initialization
  lucide.createIcons();

  // ----------------------------------------------------
  // Interactive Blueprint Drafting Grid Background
  // ----------------------------------------------------
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const mouse = { x: null, y: null };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function animateBlueprint() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 45;
      
      // Draw Blueprint Grid Lines
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.012)'; // Faint gray lines
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Cursor Drafting Crosshair Coordinates
      if (mouse.x !== null && mouse.y !== null) {
        ctx.strokeStyle = 'rgba(255, 106, 0, 0.08)'; // Faint orange coordinate lines
        ctx.lineWidth = 0.8;
        
        // Vertical Coordinate Axis
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.stroke();
        
        // Horizontal Coordinate Axis
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(canvas.width, mouse.y);
        ctx.stroke();

        // Coordinate indicator text
        ctx.fillStyle = 'rgba(255, 106, 0, 0.6)';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText(`X: ${Math.round(mouse.x)} px`, mouse.x + 12, mouse.y - 18);
        ctx.fillText(`Y: ${Math.round(mouse.y)} px`, mouse.x + 12, mouse.y - 6);
      }
      
      requestAnimationFrame(animateBlueprint);
    }

    animateBlueprint();
  }

  // ----------------------------------------------------
  // Navigation & Scroll Behaviors
  // ----------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      });
    });
  }

  // ----------------------------------------------------
  // Scroll Reveal Observer
  // ----------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });
  revealElements.forEach(el => revealObserver.observe(el));

  // ----------------------------------------------------
  // Skills Matrix Filtering
  // ----------------------------------------------------
  const filterButtons = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ----------------------------------------------------
  // Project Details Modals Logic
  // ----------------------------------------------------
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modals = document.querySelectorAll('.modal');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modals.forEach(modal => {
    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = modal.querySelector('.modal-close');
    
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });
    }
  });

  // ----------------------------------------------------
  // Contact Form Submission Action
  // ----------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.querySelector('span').textContent;
      
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending...';
      formFeedback.textContent = '';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = originalText;
        
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = `Thank you, ${name}. Your message has been transmitted successfully.`;
        
        contactForm.reset();
        
        setTimeout(() => {
          formFeedback.textContent = '';
        }, 5000);
        
      }, 1200);
    });
  }

});

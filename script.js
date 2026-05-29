// Portfolio Templates Data
const templates = [
  {
    name: 'Cafe Demo',
    img: 'Images/cafetemplate.png',
    price: 4999,
    category: 'Business',
    desc: 'Demo: Cafe & restaurant single page'
  },
  {
    name: 'Coaching Demo',
    img: 'Images/coachingtemplate.png',
    price: 4999,
    category: 'Education',
    desc: 'Demo: Coaching institute landing page'
  },
  {
    name: 'Gym Demo',
    img: 'Images/gymtemplate.png',
    price: 4999,
    category: 'Fitness',
    desc: 'Demo: Gym & fitness center page'
  },
  {
    name: 'Portfolio Demo',
    img: 'Images/portfoliotemplate.png',
    price: 4999,
    category: 'Personal',
    desc: 'Demo: Personal portfolio page'
  },
  {
    name: 'Studio Demo',
    img: 'Images/studiotemplate.png',
    price: 4999,
    category: 'Creative',
    desc: 'Demo: Photo studio landing page'
  },
];

// Render Portfolio Grid
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('portfolioGrid');
  if (grid) {
    templates.forEach(t => {
      grid.innerHTML += `
        <div class="portfolio-card">
          <div class="portfolio-img-wrap">
            <img src="${t.img}" class="portfolio-img" alt="${t.name}" loading="lazy">
            <div class="live-badge">Demo</div>
            <div class="portfolio-overlay">
              <button class="btn-primary btn-animated" onclick="openModal('${t.img}','${t.name}',${t.price})">
                <i class="fa-solid fa-eye"></i> View Demo
              </button>
            </div>
          </div>
          <div class="portfolio-body">
            <h4>${t.name}</h4>
            <p>${t.desc}</p>
            <div class="portfolio-bottom">
              <p style="font-size: 14px; color: #94a3b8;">Sample Design</p>
              <a href="https://wa.me/917077134418?text=Hi%20I%20like%20${encodeURIComponent(t.name)}%20style.%20Need%20custom%20quote" class="btn-primary btn-animated" style="font-size: 13px; padding: 8px 16px;" target="_blank">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      `;
    });
  }
});

// Modal Functions
function openModal(img, title, price) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  
  modal.classList.add('active');
  document.getElementById('modalImg').src = img;
  document.getElementById('modalImg').alt = title;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalPrice').textContent = 'From ₹' + price;
  
  const modalBuyBtn = document.getElementById('modalBuyBtn');
  modalBuyBtn.href = `https://wa.me/917077134418?text=Hi%20I%20like%20${encodeURIComponent(title)}%20design.%20Send%20custom%20quote`;
  modalBuyBtn.textContent = 'Get Custom Quote';
  modalBuyBtn.setAttribute('target', '_blank');
  
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal on ESC key or backdrop click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (modal && e.target === modal) closeModal();
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') 
          ? 'fa-solid fa-xmark' 
          : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const projectType = document.getElementById('projectType')?.value;
    const message = document.getElementById('message')?.value.trim();
    
    if (!name || !email || !phone || !message) {
      alert('Please fill all required fields');
      return;
    }
    
    const whatsappMsg = `Hi TDEV,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AProject: ${encodeURIComponent(projectType)}%0A%0AMessage: ${encodeURIComponent(message)}`;
    
    window.open(`https://wa.me/917077134418?text=${whatsappMsg}`, '_blank');
    contactForm.reset();
    alert('Opening WhatsApp... Please send the message to discuss your project!');
  });
}

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card, .portfolio-card, .price-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s ease-out';
    observer.observe(el);
  });
});

// Button Ripple Effect
document.addEventListener('click', function(e) {
  const button = e.target.closest('.btn-animated');
  if (!button) return;
  
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .btn-animated { position: relative; overflow: hidden; }
  .ripple {
    position: absolute; border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0); animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log('TDEV website loaded successfully');

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    
    // Active button style
    filterBtns.forEach(b => {
      b.style.background = '#fff';
      b.style.color = 'var(--dark)';
    });
    btn.style.background = 'var(--primary)';
    btn.style.color = '#fff';
    
    // Filter items
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
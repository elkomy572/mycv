function printPDF() {
  const element = document.querySelector('main');
  html2pdf()
    .set({
      filename: 'Abdelrhman_Elkomy_CV.pdf',
      margin: 1,
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .from(element)
    .save();
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    showSection(targetId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Toggle table of contents menu
const tocToggle = document.getElementById('toc-toggle');
const tocMenu = document.getElementById('toc-menu');
const tocClose = document.getElementById('toc-close');

if (tocToggle && tocMenu) {
  tocToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    tocMenu.classList.toggle('toc-menu-hidden');
    tocMenu.classList.toggle('toc-menu-open');
  });
}

if (tocClose) {
  tocClose.addEventListener('click', (e) => {
    e.preventDefault();
    tocMenu.classList.add('toc-menu-hidden');
    tocMenu.classList.remove('toc-menu-open');
  });
}

// Close TOC menu when clicking outside
document.addEventListener('click', (e) => {
  if (!tocMenu.contains(e.target) && !tocToggle.contains(e.target) && !tocMenu.classList.contains('toc-menu-hidden')) {
    tocMenu.classList.add('toc-menu-hidden');
    tocMenu.classList.remove('toc-menu-open');
  }
});

// Show selected section and hide others
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('section-hidden');
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove('section-hidden');
  }
  if (tocMenu) {
    tocMenu.classList.add('toc-menu-hidden');
    tocMenu.classList.remove('toc-menu-open');
  }
}

// Handle section links in TOC menu
document.querySelectorAll('.section-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    showSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize IntersectionObserver for animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__fadeInUp');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });

  // Initially show only the About section
  showSection('profile');
});

document.getElementById('toggle-theme').onclick = function() {
  document.body.classList.toggle('bg-gray-900');
  document.body.classList.toggle('bg-white');
  document.body.classList.toggle('text-white');
  document.body.classList.toggle('text-gray-900');
};

const testimonials = [
  {
    name: "Mohamed Ali",
    text: "Abdelrhman is a very creative and dedicated engineer. His teamwork and leadership skills are outstanding.",
    job: "Colleague, ECU",
  },
  {
    name: "Sara Mostafa",
    text: "I enjoyed working with Abdelrhman on several projects. He always delivers high-quality work on time.",
    job: "Project Partner",
  },
  {
    name: "Ahmed Hassan",
    text: "Professional, reliable, and always ready to help. Highly recommended!",
    job: "Client",
  }
];

let testimonialIndex = 0;
const testimonialBox = document.getElementById('testimonial-carousel');
function showTestimonial(idx) {
  const t = testimonials[idx];
  testimonialBox.innerHTML = `
    <p class="text-gray-200 text-lg mb-2">"${t.text}"</p>
    <div class="font-bold text-gold-500">${t.name}</div>
    <div class="text-gray-400 text-sm">${t.job}</div>
  `;
}
document.getElementById('prev-testimonial').onclick = function() {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
};
document.getElementById('next-testimonial').onclick = function() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
};
// عرض أول تقييم عند تحميل الصفحة

showTestimonial(testimonialIndex); const toggleThemeBtn = document.getElementById('toggle-theme');
    let darkMode = localStorage.getItem('dark-mode') === 'true';
  
    const applyTheme = () => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-gray-900', 'text-white');
        toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-gray-900', 'text-white');
        toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }

    toggleThemeBtn.addEventListener('click', () => {
      darkMode = !darkMode;
      localStorage.setItem('dark-mode', darkMode);
      applyTheme();
    });

    // Apply the theme on initial load
    applyTheme();

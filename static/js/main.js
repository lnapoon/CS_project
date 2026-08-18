/**
 * SSKRU CS - Main Interactive, Animation & Typewriter Scripts
 * Author: Expert Code & Security Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem('sskru_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlTag.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    localStorage.setItem('sskru_theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill text-warning';
      } else {
        themeIcon.className = 'bi bi-moon-stars-fill text-accent';
      }
    }
  }

  // 2. Typewriter / Dynamic Text Rotation Engine
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const words = JSON.parse(typewriterEl.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex] || 'มรภ.ศรีสะเกษ';

      if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 110;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2200; // Pause when word complete
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 450;
      }

      setTimeout(type, typeSpeed);
    }

    if (words.length > 0) setTimeout(type, 600);
  }

  // 3. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('show');
    });
  }

  if (mobileDrawerClose && mobileDrawer) {
    mobileDrawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('show');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('show');
    });
  });

  // 4. Smooth Navigation & ScrollSpy
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.offsetTop - 85;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 130;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link-custom').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 5. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const progressFills = entry.target.querySelectorAll('.progress-skill-fill');
        progressFills.forEach(fill => {
          const targetPct = fill.getAttribute('data-progress');
          fill.style.width = `${targetPct}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-init').forEach(el => revealObserver.observe(el));

  // 6. Hero Counter Animation
  const counters = document.querySelectorAll('.counter-value');
  let animatedCounters = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedCounters) {
        animatedCounters = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800;
          const step = Math.ceil(target / (duration / 25));
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = current;
            }
          }, 25);
        });
      }
    });
  }, observerOptions);

  const heroContainer = document.querySelector('.hero-stats-container');
  if (heroContainer) counterObserver.observe(heroContainer);

  // 7. About Section Tab Switcher
  const aboutTabBtns = document.querySelectorAll('.about-tab-btn');
  const aboutTabPanes = document.querySelectorAll('.tab-pane-custom');

  aboutTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      aboutTabBtns.forEach(b => b.classList.remove('active'));
      aboutTabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${tabId}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 8. Course Category Filter & Live Search
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  const catPanels = document.querySelectorAll('.course-category-panel');
  const searchInput = document.getElementById('courseSearchInput');
  const clearSearchBtn = document.getElementById('clearCourseSearch');
  const courseItems = document.querySelectorAll('.course-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCat = btn.getAttribute('data-target');

      filterBtns.forEach(b => {
        b.classList.remove('btn-accent', 'shadow');
        b.classList.add('btn-outline-secondary');
      });
      btn.classList.remove('btn-outline-secondary');
      btn.classList.add('btn-accent', 'shadow');

      catPanels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById(`cat-${targetCat}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query !== '') {
        catPanels.forEach(p => p.classList.add('active'));

        courseItems.forEach(item => {
          const title = item.getAttribute('data-title').toLowerCase();
          const code = item.getAttribute('data-code').toLowerCase();
          const desc = item.getAttribute('data-desc').toLowerCase();

          if (title.includes(query) || code.includes(query) || desc.includes(query)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      } else {
        courseItems.forEach(item => item.style.display = 'block');
        const activeFilterBtn = document.querySelector('.course-filter-btn.btn-accent');
        if (activeFilterBtn) {
          activeFilterBtn.click();
        }
      }
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    });
  }

  // 9. Schedule Year Switcher
  const yearTabBtns = document.querySelectorAll('.year-tab-btn');
  const yearPanels = document.querySelectorAll('.year-panel');

  yearTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const yearIdx = btn.getAttribute('data-year');

      yearTabBtns.forEach(b => {
        b.classList.remove('btn-accent', 'shadow');
        b.classList.add('btn-outline-secondary');
      });
      btn.classList.remove('btn-outline-secondary');
      btn.classList.add('btn-accent', 'shadow');

      yearPanels.forEach(p => p.classList.remove('active'));
      const targetYear = document.getElementById(`year-panel-${yearIdx}`);
      if (targetYear) targetYear.classList.add('active');
    });
  });

  // 10. Lecturer Modal Populator
  const viewLecturerBtns = document.querySelectorAll('.view-lecturer-btn');
  const lecturerModalEl = document.getElementById('lecturerModal');
  const lecturerModal = lecturerModalEl ? new bootstrap.Modal(lecturerModalEl) : null;
  const modalName = document.getElementById('modalLecturerName');
  const modalSpecialty = document.getElementById('modalLecturerSpecialty');
  const modalEdu = document.getElementById('modalLecturerEdu');
  const modalBio = document.getElementById('modalLecturerBio');
  const modalImg = document.getElementById('modalLecturerImg');

  viewLecturerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const specialty = btn.getAttribute('data-specialty');
      const edu = btn.getAttribute('data-edu');
      const bio = btn.getAttribute('data-bio');
      const img = btn.getAttribute('data-img');

      if (modalName) modalName.textContent = name;
      if (modalSpecialty) modalSpecialty.textContent = `เชี่ยวชาญ: ${specialty}`;
      if (modalEdu) modalEdu.textContent = edu;
      if (modalBio) modalBio.textContent = bio;
      if (modalImg && img) modalImg.src = img;

      if (lecturerModal) lecturerModal.show();
    });
  });

  // 11. Interactive CS Career Quiz Logic
  const calcQuizBtn = document.getElementById('calcQuizBtn');
  const quizResultBox = document.getElementById('quizResultBox');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultDesc = document.getElementById('quizResultDesc');

  if (calcQuizBtn) {
    calcQuizBtn.addEventListener('click', () => {
      const q1 = document.getElementById('quizQ1').value;
      const q2 = document.getElementById('quizQ2').value;

      let title = "";
      let desc = "";

      if (q1 === 'dev' || q2 === 'dev') {
        title = "💻 คุณเหมาะกับสาย Full-Stack Software Developer!";
        desc = "คุณมีพรสวรรค์ในการสร้างสรรค์ซอฟต์แวร์และเว็บไซต์! หลักสูตรเราจะเน้นปูพื้นฐานภาษา Python, JavaScript, Django, RESTful APIs และการพัฒนาระบบจริงเพื่อก้าวสู่ตลาดงานระดับโลก";
      } else if (q1 === 'ai' || q2 === 'ai') {
        title = "🤖 คุณเหมาะกับสาย AI & Machine Learning Engineer!";
        desc = "คุณมีความหลงใหลในเทคโนโลยีแห่งอนาคต! สาขาเราสอนวิชาคณิตศาสตร์สำหรับ AI, Deep Learning, การพัฒนา LLM และโปรเจกต์หุ่นยนต์ระดับประเทศ";
      } else if (q1 === 'data' || q2 === 'data') {
        title = "📊 คุณเหมาะกับสาย Data Scientist & Big Data Specialist!";
        desc = "คุณชอบค้นหาความรู้ที่ซ่อนอยู่ในข้อมูล! สาขาวิชาฯ มีรายวิชาการทำเหมืองข้อมูล, ระบบฐานข้อมูล SQL, และการวิเคราะห์ภาพเพื่อต่อยอดในองค์กรชั้นนำ";
      } else {
        title = "🛡️ คุณเหมาะกับสาย Cyber Security & Cloud Architect!";
        desc = "คุณคือนักปกป้องโลกดิจิทัล! สาขาวิชาฯ มีแล็บปฏิบัติการเครือข่าย, ความปลอดภัยของข้อมูล, ภูมิคุ้มกันไซเบอร์ และระบบคลาวด์เพื่อสร้างภูมิคุ้มกันให้ระบบ";
      }

      if (quizResultTitle && quizResultDesc && quizResultBox) {
        quizResultTitle.textContent = title;
        quizResultDesc.textContent = desc;
        quizResultBox.classList.remove('d-none');
      }
    });
  }
});

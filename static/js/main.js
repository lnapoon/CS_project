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

      let text = '';
      if (isDeleting) {
        text = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        text = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      typewriterEl.textContent = text || '\u00A0';

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

  // 10. Lecturer Modal Populator (Rich 2-Column Modal matching comsci-sskru.vercel.app)
  const viewLecturerBtns = document.querySelectorAll('.view-lecturer-btn');
  const lecturerModalEl = document.getElementById('lecturerModal');
  const lecturerModal = lecturerModalEl ? new bootstrap.Modal(lecturerModalEl) : null;
  const modalName = document.getElementById('modalLecturerName');
  const modalEnName = document.getElementById('modalLecturerEnName');
  const modalRole = document.getElementById('modalLecturerRole');
  const modalSpecialty = document.getElementById('modalLecturerSpecialty');
  const modalImg = document.getElementById('modalLecturerImg');
  const modalEduTimeline = document.getElementById('modalLecturerEduTimeline');
  const modalCoursesGrid = document.getElementById('modalLecturerCoursesGrid');
  const modalPubBox = document.getElementById('modalLecturerPubBox');

  viewLecturerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const en = btn.getAttribute('data-en');
      const role = btn.getAttribute('data-role');
      const specialty = btn.getAttribute('data-specialty');
      const img = btn.getAttribute('data-img');
      const pubTitle = btn.getAttribute('data-pubtitle');
      const pubAuthors = btn.getAttribute('data-pubauthors');
      const pubJournal = btn.getAttribute('data-pubjournal');

      if (modalName) modalName.textContent = name;
      if (modalEnName) modalEnName.textContent = en;
      if (modalRole) modalRole.textContent = role;
      if (modalSpecialty) modalSpecialty.textContent = specialty;
      if (modalImg && img) modalImg.src = img;

      // Parse JSON scripts for Education History and Courses Taught
      let eduhistory = [];
      let courses = [];

      try {
        const eduScript = document.getElementById(id);
        if (eduScript) eduhistory = JSON.parse(eduScript.textContent);
      } catch (e) { console.error(e); }

      try {
        const courseScript = document.getElementById(`${id}_courses`);
        if (courseScript) courses = JSON.parse(courseScript.textContent);
      } catch (e) { console.error(e); }

      // 1) Render Education Timeline
      if (modalEduTimeline) {
        if (eduhistory && eduhistory.length > 0) {
          modalEduTimeline.innerHTML = eduhistory.map(item => `
            <div class="timeline-item position-relative mb-3.5 ps-3" style="border-left: 2px solid var(--accent-color);">
              <div class="position-absolute" style="left:-6px;top:4px;width:10px;height:10px;border-radius:50%;background:var(--accent-color);"></div>
              <h5 class="fw-bold text-body mb-0 fs-6">${item.degree}</h5>
              <p class="text-muted small mb-1" style="font-size:0.85rem">${item.univ}</p>
              <span class="badge bg-accent-subtle text-accent rounded-pill px-2.5 py-0.5 font-monospace" style="font-size:0.75rem">${item.year}</span>
            </div>
          `).join('');
        } else {
          modalEduTimeline.innerHTML = `<p class="text-muted small">ไม่มีข้อมูลประวัติการศึกษา</p>`;
        }
      }

      // 2) Render Main Courses Taught Grid
      if (modalCoursesGrid) {
        if (courses && courses.length > 0) {
          modalCoursesGrid.innerHTML = courses.map(c => `
            <div class="col-12 col-sm-6">
              <div class="p-3 rounded-3 border bg-body-tertiary h-100 shadow-sm">
                <span class="badge bg-success-subtle text-success font-monospace fw-bold mb-1" style="font-size:0.78rem">${c.code}</span>
                <h6 class="fw-bold text-body mb-1" style="font-size:0.9rem">${c.name}</h6>
                <small class="text-muted d-block" style="font-size:0.78rem">หน่วยกิต: ${c.credit}</small>
              </div>
            </div>
          `).join('');
        } else {
          modalCoursesGrid.innerHTML = `<div class="col-12"><p class="text-muted small">ไม่มีข้อมูลรายวิชา</p></div>`;
        }
      }

      // 3) Render Publications Box
      if (modalPubBox) {
        if (pubTitle) {
          modalPubBox.innerHTML = `
            <div class="p-3.5 rounded-3 border bg-success-subtle border-success-subtle">
              <div class="d-flex align-items-start gap-2">
                <i class="bi bi-quote fs-2 text-success lh-1 flex-shrink-0"></i>
                <div>
                  <h6 class="fw-bold text-body mb-2" style="font-size:0.95rem;line-height:1.5">${pubTitle}</h6>
                  <p class="text-muted small mb-2" style="font-size:0.82rem">${pubAuthors}</p>
                  <span class="badge bg-success text-white rounded-pill px-3 py-1 font-monospace" style="font-size:0.78rem;white-space:normal;text-align:left;line-height:1.4">${pubJournal}</span>
                </div>
              </div>
            </div>
          `;
        } else {
          modalPubBox.innerHTML = `<p class="text-muted small">ไม่มีข้อมูลผลงานตีพิมพ์</p>`;
        }
      }

      if (lecturerModal) lecturerModal.show();
    });
  });

  // 11. Interactive CS Career Quiz Logic (8 Comprehensive Tech Career Tracks)
  const calcQuizBtn = document.getElementById('calcQuizBtn');
  const quizResultBox = document.getElementById('quizResultBox');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultDesc = document.getElementById('quizResultDesc');
  const quizSalaryBadge = document.getElementById('quizSalaryBadge');
  const quizSubjectsGrid = document.getElementById('quizSubjectsGrid');

  if (calcQuizBtn) {
    calcQuizBtn.addEventListener('click', () => {
      const q1El = document.getElementById('quizQ1');
      const q2El = document.getElementById('quizQ2');
      const q3El = document.getElementById('quizQ3');

      const q1 = q1El ? q1El.value : 'dev';
      const q2 = q2El ? q2El.value : 'dev';
      const q3 = q3El ? q3El.value : 'dev';

      // Score tallying
      const scoreMap = {};
      [q1, q2, q3].forEach(val => {
        scoreMap[val] = (scoreMap[val] || 0) + 1;
      });

      let topTrack = q1;
      let maxScore = 0;
      for (const track in scoreMap) {
        if (scoreMap[track] > maxScore) {
          maxScore = scoreMap[track];
          topTrack = track;
        }
      }

      const tracksInfo = {
        dev: {
          title: "💻 สาย Full-Stack Software & Mobile Developer",
          salary: "💰 เงินเดือนเริ่มต้น: 28,000 - 65,000+ บาท/เดือน",
          desc: "คุณมีพรสวรรค์ในการสร้างสรรค์ซอฟต์แวร์และแอปพลิเคชัน! หลักสูตรเราเน้นปูพื้นฐานภาษา Python, JavaScript, Django, Web Frameworks, RESTful APIs และการพัฒนาระบบจริงเพื่อก้าวสู่ตลาดงานระดับสากล",
          subjects: ["การโปรแกรมเชิงวัตถุ", "สถาปัตยกรรมซอฟต์แวร์", "การพัฒนาเว็บแอปพลิเคชัน", "การพัฒนาแอปมือถือ"]
        },
        ai: {
          title: "🤖 สาย AI & Machine Learning Engineer",
          salary: "💰 เงินเดือนเริ่มต้น: 35,000 - 85,000+ บาท/เดือน",
          desc: "คุณหลงใหลในเทคโนโลยีแห่งอนาคตและปัญญาประดิษฐ์! สาขาเราปูพื้นฐานคณิตศาสตร์คอมพิวเตอร์, Machine Learning, Deep Learning, การพัฒนา AI Chatbot/LLMs และระบบประมวลผลภาพ",
          subjects: ["ปัญญาประดิษฐ์", "การทำเหมืองข้อมูล", "การประมวลผลภาพดิจิทัล", "วิทยาการข้อมูล"]
        },
        data: {
          title: "📊 สาย Data Scientist & Big Data Specialist",
          salary: "💰 เงินเดือนเริ่มต้น: 32,000 - 75,000+ บาท/เดือน",
          desc: "คุณชอบค้นหาความลับและขุมทรัพย์ในข้อมูล! สาขาวิชาฯ มีรายวิชาระบบฐานข้อมูล SQL, Big Data Analytics, สถิติวัดผล และโมเดลทำนายข้อมูลเพื่อช่วยองค์กรตัดสินใจเชิงกลยุทธ์",
          subjects: ["ระบบจัดการฐานข้อมูล", "คลังข้อมูลและการทำเหมืองข้อมูล", "วิทยาการข้อมูล", "ระเบียบวิธีวิจัย"]
        },
        sec: {
          title: "🛡️ สาย Cybersecurity & Cloud Infrastructure",
          salary: "💰 เงินเดือนเริ่มต้น: 30,000 - 80,000+ บาท/เดือน",
          desc: "คุณคือผู้พิทักษ์โลกดิจิทัลและระบบคลาวด์! สาขาเราสอนแล็บปฏิบัติการเครือข่ายคอมพิวเตอร์, การป้องกันแฮกเกอร์, ความปลอดภัยข้อมูล และสถาปัตยกรรมคลาวด์คอมพิวติ้ง",
          subjects: ["การสื่อสารข้อมูลและเครือข่าย", "ความมั่นคงปลอดภัยไซเบอร์", "ระบบปฏิบัติการ", "การคำนวณแบบคลาวด์"]
        },
        game: {
          title: "🎮 สาย Game Developer & 3D Interactive Media",
          salary: "💰 เงินเดือนเริ่มต้น: 28,000 - 60,000+ บาท/เดือน",
          desc: "คุณมีจินตนาการและหลงใหลในโลกอินเทอร์แอคทีฟ! สาขาวิชาฯ ปูพื้นฐานการเขียนโปรแกรมเชิงวัตถุ, Computer Graphics, การออกแบบเกม และเอนจินจำลอง 3D/AR/VR",
          subjects: ["คอมพิวเตอร์กราฟิก", "การโปรแกรมเชิงวัตถุ", "การออกแบบประสบการณ์ผู้ใช้", "โครงงานนวัตกรรม"]
        },
        ux: {
          title: "🎨 สาย UI/UX Designer & Frontend Engineer",
          salary: "💰 เงินเดือนเริ่มต้น: 25,000 - 55,000+ บาท/เดือน",
          desc: "คุณมีสายตาที่เฉียบแหลมในการออกแบบการใช้งาน! สาขาวิชาฯ ปูพื้นฐาน Human-Computer Interaction (HCI), การออกแบบอินเทอร์เฟซสวยงาม และเทคโนโลยี Frontend สมัยใหม่",
          subjects: ["การปฏิสัมพันธ์ระหว่างมนุษย์และคอมพิวเตอร์", "การพัฒนาเว็บแอปพลิเคชัน", "เทคโนโลยีสื่อประสม", "การวิเคราะห์และออกแบบระบบ"]
        },
        devops: {
          title: "🚀 สาย Cloud DevOps Engineer & Site Reliability (SRE)",
          salary: "💰 เงินเดือนเริ่มต้น: 35,000 - 90,000+ บาท/เดือน",
          desc: "คุณชอบสร้างระบบอัตโนมัติและดูแลความเสถียรของเซิร์ฟเวอร์! สาขาเราเน้นการเรียนรู้ระบบปฏิบัติการ Linux, เครือข่ายคลาวด์, CI/CD และการบริหารทรัพยากรซอฟต์แวร์",
          subjects: ["ระบบปฏิบัติการ", "การคำนวณแบบคลาวด์", "เครือข่ายคอมพิวเตอร์", "วิศวกรรมซอฟต์แวร์"]
        },
        pm: {
          title: "📈 สาย Tech Product Manager & Entrepreneur",
          salary: "💰 เงินเดือนเริ่มต้น: 30,000 - 70,000+ บาท/เดือน",
          desc: "คุณมีทักษะความเป็นผู้นำและเข้าใจทั้งเทคโนโลยีและธุรกิจ! สาขาเราสอนกระบวนการวิเคราะห์และออกแบบระบบ, การบริหารโปรเจกต์ไอที และการสร้างโครงงานนวัตกรรมจริง",
          subjects: ["การวิเคราะห์และออกแบบระบบ", "วิศวกรรมซอฟต์แวร์", "การบริหารโปรเจกต์ไอที", "การจดสิทธิบัตรและนวัตกรรม"]
        }
      };

      const info = tracksInfo[topTrack] || tracksInfo.dev;

      if (quizResultTitle && quizResultDesc && quizResultBox) {
        quizResultTitle.textContent = info.title;
        if (quizSalaryBadge) quizSalaryBadge.textContent = info.salary;
        quizResultDesc.textContent = info.desc;

        if (quizSubjectsGrid && info.subjects) {
          quizSubjectsGrid.innerHTML = info.subjects.map(s => `
            <span class="badge bg-success-subtle text-success font-monospace px-2.5 py-1.5 small border border-success-subtle">${s}</span>
          `).join('');
        }

        quizResultBox.classList.remove('d-none');
        quizResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});

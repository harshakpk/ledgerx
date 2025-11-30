
/* ============================
   CURSOR GLOW FOLLOW
============================ */
const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});


/* ============================
   FADE-IN ON SCROLL
============================ */
const fadeElements = document.querySelectorAll('.fade');

function fadeInOnScroll() {
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);


/* ============================
   ACTIVE NAV HIGHLIGHT
============================ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function activateNav() {
  let scrollPos = window.scrollY + 120;

  sections.forEach((sec) => {
    if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach((a) => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href='#${sec.id}']`);
      if (link) link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', activateNav);


/* ============================
   SMOOTH NAV SCROLL CLICK
============================ */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


/* ============================
   PARALLAX EFFECT
============================ */
const parallaxSections = document.querySelectorAll(".parallax");

window.addEventListener('scroll', () => {
  let scrollY = window.scrollY;
  parallaxSections.forEach((sec) => {
    sec.style.transform = `translateY(${scrollY * -0.07}px)`;
  });
});


/* ============================
   TILT EFFECT (cards + images)
============================ */
document.querySelectorAll('.tilt').forEach((el) => {

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });

});


/* ============================
   KPI COUNTERS
============================ */
let countersStarted = false;
const counters = document.querySelectorAll('.counter');

function startCounters() {
  if (countersStarted) return;

  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.target);
    let current = 0;
    const step = target / 80;

    const update = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + "%";
        clearInterval(update);
      } else {
        counter.textContent = current.toFixed(1) + "%";
      }
    }, 20);
  });

  countersStarted = true;
}

window.addEventListener('scroll', () => {
  counters.forEach(counter => {
    if (counter.getBoundingClientRect().top < window.innerHeight - 60) {
      startCounters();
    }
  });
});


/* ============================
   TESTIMONIAL SLIDER
============================ */
const track = document.querySelector(".testimonial-track");
const btnPrev = document.querySelector(".slider-btn.prev");
const btnNext = document.querySelector(".slider-btn.next");

let index = 0;
const cards = document.querySelectorAll(".testimonial-card");
const totalCards = cards.length;
const visibleCards = 3;

function updateSlider() {
  const cardWidth = cards[0].offsetWidth + 20; 
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

btnNext.addEventListener("click", () => {
  if (index < totalCards - visibleCards) {
    index++;
  } else {
    index = 0;
  }
  updateSlider();
});

btnPrev.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = totalCards - visibleCards;
  }
  updateSlider();
});

// auto-slide every 6 seconds
setInterval(() => {
  btnNext.click();
}, 6000);


/* ============================
   AI WIDGET
============================ */
const aiToggle = document.querySelector(".ai-toggle");
const aiPanel = document.querySelector(".ai-panel");

aiToggle.addEventListener("click", () => {
  aiPanel.classList.toggle("open");
});


/* ============================
   FOOTER YEAR
============================ */
document.getElementById("year").textContent = new Date().getFullYear();

// LUMIÈRE EVENTS — INTERACTIONS

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Current year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Three-image slider
const track = document.getElementById("slideTrack");
const slides = track ? Array.from(track.children) : [];
const counter = document.getElementById("slideCounter");
let currentSlide = 0;

function showSlide(index) {
  if (!track || slides.length === 0) return;
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  if (counter) counter.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

document.getElementById("prevSlide")?.addEventListener("click", () => showSlide(currentSlide - 1));
document.getElementById("nextSlide")?.addEventListener("click", () => showSlide(currentSlide + 1));
showSlide(0);

// Scroll reveal with a small, one-time decorative shake as elements enter view
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Portfolio lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImage) lightboxImage.src = "";
}

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const imagePath = item.dataset.image;
    if (!imagePath || !lightbox || !lightboxImage) return;
    lightboxImage.src = imagePath;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});

// Front-end demo form only. It does not send messages to an email inbox.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  if (formMessage) {
    formMessage.textContent = "Thank you for your enquiry. This is a portfolio demo form and is not connected to an inbox yet.";
  }
  contactForm.reset();
});

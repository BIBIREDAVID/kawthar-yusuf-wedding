document.addEventListener("DOMContentLoaded", () => {

  /* ================= MOBILE MENU ================= */
  const menuBtn = document.getElementById("menuBtn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    mobileMenu.classList.add("open");
    menuOverlay.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-locked");
  }

  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-locked");
  }

  menuBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
  });

  /* ================= COUNTDOWN ================= */
  const weddingDate = new Date("2026-12-17T10:00:00+01:00").getTime();
  const elDays = document.getElementById("cd-days");
  const elHrs = document.getElementById("cd-hrs");
  const elMin = document.getElementById("cd-min");
  const elSec = document.getElementById("cd-sec");

  function tickCountdown() {
    const now = Date.now();
    let diff = weddingDate - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const sec = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, "0");
    elDays.textContent = pad(days);
    elHrs.textContent = pad(hrs);
    elMin.textContent = pad(min);
    elSec.textContent = pad(sec);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ================= STORY CAROUSEL ================= */
  const tabs = document.querySelectorAll(".tab");
  const slides = document.querySelectorAll(".slide");
  const progressSpans = document.querySelectorAll("#carouselProgress span");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let current = 0;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    tabs.forEach((t, i) => t.classList.toggle("active", i === current));
    progressSpans.forEach((s, i) => s.classList.toggle("filled", i === current));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => goToSlide(Number(tab.dataset.slide)));
  });
  prevBtn.addEventListener("click", () => goToSlide(current - 1));
  nextBtn.addEventListener("click", () => goToSlide(current + 1));
  goToSlide(0);

  /* ================= FAVOURITE HEARTS ================= */
  document.querySelectorAll(".heart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filled = btn.textContent.trim() === "♥";
      btn.innerHTML = filled ? "&#9825;" : "&#9829;";
      btn.style.color = filled ? "" : "#7a2a3d";
    });
  });

  /* ================= GALLERY CAROUSEL ================= */
  const galleryTrack = document.getElementById("galleryTrack");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");
  if (galleryTrack) {
    const scrollByCard = (dir) => {
      const card = galleryTrack.querySelector("img, .gallery-cta");
      const amount = card ? card.getBoundingClientRect().width + 14 : 240;
      galleryTrack.scrollBy({ left: dir * amount, behavior: "smooth" });
    };
    galleryPrev.addEventListener("click", () => scrollByCard(-1));
    galleryNext.addEventListener("click", () => scrollByCard(1));
  }

  /* ================= COPY VENUE ADDRESS ================= */
  const copyBtn = document.getElementById("copyAddressBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const address = "Magrettas Event Center, Beside Baystar Hotel, Abule Egba, Lagos";
      try {
        await navigator.clipboard.writeText(address);
        const original = copyBtn.textContent;
        copyBtn.textContent = "Address copied!";
        setTimeout(() => (copyBtn.textContent = original), 2000);
      } catch {
        alert(address);
      }
    });
  }

  /* ================= RSVP FORM ================= */
  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpSuccess = document.getElementById("rsvpSuccess");
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    rsvpForm.reset();
    rsvpSuccess.hidden = false;
    rsvpSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

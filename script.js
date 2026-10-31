// script.js - four small features: mobile menu, back-to-top button, footer year.
// Smooth scrolling is done in CSS (scroll-behavior: smooth), not here.

// 1. Find the HTML elements we want to control
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const backToTopButton = document.getElementById("back-to-top");
const yearText = document.getElementById("current-year");

// 2. Mobile menu: open or close when the Menu button is clicked
menuButton.addEventListener("click", function () {
  // toggle() adds the "open" class if missing, removes it if present.
  // It returns true when the class was added.
  const menuIsOpen = navLinks.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", menuIsOpen);   // for screen readers
  menuButton.textContent = menuIsOpen ? "Close" : "Menu";
});

// 3. Close the mobile menu after a link is clicked
const allNavLinks = navLinks.querySelectorAll("a");

allNavLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  });
});

// 4. Back-to-top button: show it only after scrolling down 400px
window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 5. Footer: write the current year automatically
yearText.textContent = new Date().getFullYear();

// 6. Certificate previews
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCloseButton = document.getElementById("lightbox-close");
const certificateCards = document.querySelectorAll(".certificate");
let lastPreviewButton = null;   // remembers which button opened the lightbox

function openLightbox(imageSource, imageDescription, button) {
  lightboxImage.src = imageSource;
  lightboxImage.alt = imageDescription;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lastPreviewButton = button;
  lightboxCloseButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
  if (lastPreviewButton) {
    lastPreviewButton.focus();   // return keyboard focus to where the user was
  }
}

// Set up every certificate card
certificateCards.forEach(function (card) {
  const previewImage = card.querySelector("img");
  const thumbnailBox = card.querySelector(".certificate-thumb");
  const previewButton = card.querySelector(".preview-button");

  // If the image file is missing: show the fallback text and disable Preview
  function showFallback() {
    thumbnailBox.classList.add("no-image");
    previewButton.disabled = true;
  }

  previewImage.addEventListener("error", showFallback);
  // The error may already have happened before this code ran, so check again
  if (previewImage.complete && previewImage.naturalWidth === 0) {
    showFallback();
  }

  previewButton.addEventListener("click", function () {
    openLightbox(previewImage.src, previewImage.alt, previewButton);
  });
});

// Close with the Close button
lightboxCloseButton.addEventListener("click", closeLightbox);

// Close by clicking the dark area (but not the image itself)
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Close with the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});
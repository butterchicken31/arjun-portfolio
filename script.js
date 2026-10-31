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

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 8);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

function setError(input, message) {
  const formGroup = input.closest(".form-group");
  const errorElement = formGroup?.querySelector(".error");
  if (!errorElement) return;
  errorElement.textContent = message;
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#name");
    const email = contactForm.querySelector("#email");
    const message = contactForm.querySelector("#message");

    let isValid = true;
    formStatus.textContent = "";

    if (!name.value.trim() || name.value.trim().length < 2) {
      setError(name, "Unesi ime sa najmanje 2 karaktera.");
      isValid = false;
    } else {
      setError(name, "");
    }

    if (!email.value.trim() || !isValidEmail(email.value.trim())) {
      setError(email, "Unesi ispravnu email adresu.");
      isValid = false;
    } else {
      setError(email, "");
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, "Poruka mora imati najmanje 10 karaktera.");
      isValid = false;
    } else {
      setError(message, "");
    }

    if (!isValid) {
      formStatus.textContent = "Forma ima greske. Proveri obelezena polja.";
      return;
    }

    formStatus.textContent =
      "Hvala! Forma je validna. Ovde kasnije mozes povezati slanje poruke.";
    contactForm.reset();
  });
}

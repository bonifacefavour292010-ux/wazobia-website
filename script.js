
// WAZOBIA website functionality

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const yearElement = document.getElementById("current-year");

    // Automatically update the footer year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile navigation menu
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            // Animate the three lines into an X
            menuToggle.classList.toggle("is-open", isOpen);
        });

        // Close menu after clicking a navigation link
        navItems.forEach(function (item) {
            item.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });
    }
});

/* =========================================
   WAZOBIA SCROLL REVEAL ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".section-heading, .service-card, .gallery-card, " +
    ".founder-photo, .founder-story, .workshop-panel, " +
    ".contact-information, .contact-form-panel"
  );

  // Respect users who prefer less animation.
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  animatedElements.forEach((element) => {
    element.classList.add("reveal");
  });

  document.documentElement.classList.add("animations-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px 40px 0px"
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});

/* =====================================
   WAZOBIA GALLERY IMAGE VIEWER
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const galleryCards = document.querySelectorAll(".gallery-card");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeButton = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImage || !closeButton) return;

  let previousFocus = null;

  function openLightbox(card) {
    const image = card.querySelector("img");

    if (!image) return;

    previousFocus = document.activeElement;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent =
      card.querySelector(".gallery-caption")?.textContent.trim()
      || image.alt;

    lightbox.classList.add("active");

    lightbox.style.position = "fixed";
lightbox.style.inset = "0";
lightbox.style.zIndex = "999999";
lightbox.style.display = "flex";
lightbox.style.alignItems = "center";
lightbox.style.justifyContent = "center";
lightbox.style.background = "rgba(0, 0, 0, 0.95)";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.style.display = "none";
lightbox.style.background = "";
    document.body.style.overflow = "";
    lightboxImage.removeAttribute("src");

    if (previousFocus?.focus) previousFocus.focus();
  }

  galleryCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "View gallery image");

    card.addEventListener("click", () => openLightbox(card));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(card);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      closeButton.focus();
    }
  });
});

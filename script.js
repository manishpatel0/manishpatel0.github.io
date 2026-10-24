// Keep the mobile navigation usable with both pointer and keyboard input.
const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector("#nav-links");

function closeNavigation() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}

// Keep the copyright year current without requiring a yearly site edit.
const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

// Mark the current section in the navigation when IntersectionObserver is available.
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter((section) => section instanceof HTMLElement);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentHref = `#${entry.target.id}`;
        sectionLinks.forEach((link) => {
          if (link.getAttribute("href") === currentHref) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

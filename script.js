document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navbar = document.getElementById("navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });

    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
      });
    });
  }

  const filters = document.querySelectorAll(".filter");
  const menuCards = document.querySelectorAll(".menu-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((btn) => btn.classList.remove("active"));
      filter.classList.add("active");

      const category = filter.getAttribute("data-category");

      menuCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    counter.innerText = "0";

    const target = Number(counter.getAttribute("data-target")) || 0;
    const speed = 80;
    const increment = Math.max(1, Math.ceil(target / speed));

    const updateCounter = () => {
      const current = Number(counter.innerText.replace("+", "")) || 0;

      if (current < target) {
        counter.innerText = Math.min(current + increment, target);
        setTimeout(updateCounter, 25);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCounter();
  });

  const revealElements = document.querySelectorAll(
    "section, .menu-card, .highlight-card, .feature-card, .testimonial-card, .gallery-grid img",
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
  });

  function revealOnScroll() {
    revealElements.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    if (loader) {
      loader.style.display = "none";
    }
  });

  const modal = document.getElementById("menuModal");
  const closeModal = document.getElementById("closeModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrice = document.getElementById("modalPrice");
  const orderBtn = document.getElementById("orderBtn");

  if (
    modal &&
    closeModal &&
    modalImg &&
    modalTitle &&
    modalDesc &&
    modalPrice &&
    orderBtn
  ) {
    menuCards.forEach((card) => {
      card.addEventListener("click", () => {
        const name = card.dataset.name || "Menu Yammatcha";
        const desc = card.dataset.desc || "";
        const price = card.dataset.price || "";
        const img = card.dataset.img || "";

        modalImg.src = img;
        modalTitle.textContent = name;
        modalDesc.textContent = desc;
        modalPrice.textContent = price;

        const pesan = `Halo Yammatcha, saya ingin memesan ${name}`;
        orderBtn.href = `https://wa.me/6285882851487?text=${encodeURIComponent(
          pesan,
        )}`;

        modal.classList.add("active");
      });
    });

    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }
});

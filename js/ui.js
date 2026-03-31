import { auth } from "./auth.js";
import { currentYear, isValidUrl, isNoroffEmail } from "./utils.js";

export const ui = {
  renderNav() {
    const nav = document.getElementById("auth-links");
    const welcomeUser = document.getElementById("welcome-user");

    if (!nav) return;

    if (auth.isLoggedIn()) {
      const user = auth.getUser();

      nav.innerHTML = `
        <a href="../index.html" class="nav-link">Browse Artworks</a>
        <a href="../pages/create-artwork.html" class="btn btn-primary">Add Artwork</a>
        <button id="logout-btn" type="button" class="btn btn-link">Logout</button>
      `;

      if (window.location.pathname.includes("/index.html") || window.location.pathname === "/") {
        nav.innerHTML = `
          <a href="./index.html" class="nav-link">Browse Artworks</a>
          <a href="./pages/create-artwork.html" class="btn btn-primary">Add Artwork</a>
          <button id="logout-btn" type="button" class="btn btn-link">Logout</button>
        `;
      }

      if (welcomeUser && user?.name) {
        welcomeUser.textContent = `Welcome, ${user.name}`;
      }

      document.getElementById("logout-btn")?.addEventListener("click", () => {
        auth.logout();
      });
    } else {
      nav.innerHTML = `
        <a href="../index.html" class="nav-link">Browse Artworks</a>
        <a href="../pages/login.html" class="nav-link">Login</a>
        <a href="../pages/register.html" class="btn btn-primary">Register</a>
      `;

      if (window.location.pathname.includes("/index.html") || window.location.pathname === "/") {
        nav.innerHTML = `
          <a href="./index.html" class="nav-link">Browse Artworks</a>
          <a href="./pages/login.html" class="nav-link">Login</a>
          <a href="./pages/register.html" class="btn btn-primary">Register</a>
        `;
      }

      if (welcomeUser) {
        welcomeUser.textContent = "";
      }
    }
  },

  showMessage(message, type = "error") {
    const box = document.getElementById("message");
    if (!box) return;

    box.textContent = message;
    box.className = `alert alert-${type}`;
    box.classList.remove("hidden");
  },

  clearMessage() {
    const box = document.getElementById("message");
    if (!box) return;

    box.textContent = "";
    box.className = "alert hidden";
  },

  toggleLoader(show) {
    const loader = document.getElementById("loader");
    if (!loader) return;
    loader.classList.toggle("hidden", !show);
  },

  toggleContent(show) {
    const content = document.getElementById("main-content");
    if (!content) return;
    content.classList.toggle("hidden", !show);
  },

  setButtonLoading(button, loading, loadingText = "Please wait...") {
    if (!button) return;

    if (loading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = loadingText;
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || button.textContent;
    }
  },

  setFieldError(field, message = "") {
    const errorBox = document.querySelector(`[data-error-for="${field.name}"]`);
    if (message) {
      field.classList.add("input-error");
      if (errorBox) errorBox.textContent = message;
    } else {
      field.classList.remove("input-error");
      if (errorBox) errorBox.textContent = "";
    }
  },

  clearFieldErrors(form) {
    const fields = form.querySelectorAll("input, textarea");
    fields.forEach((field) => this.setFieldError(field, ""));
  },

  validateForm(form, options = {}) {
    this.clearFieldErrors(form);
    let valid = true;

    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      let message = "";

      if (!value) {
        message = "This field is required.";
      } else if (field.name === "email" && !field.validity.valid) {
        message = "Enter a valid email address.";
      } else if (field.name === "email" && options.requireNoroffEmail && !isNoroffEmail(value)) {
        message = "Use a valid Noroff email address.";
      } else if ((field.name === "password" || field.name === "confirmPassword") && value.length < 8) {
        message = "Password must be at least 8 characters.";
      } else if (field.name === "year") {
        const year = Number(value);
        if (!Number.isInteger(year) || year < 1000 || year > currentYear()) {
          message = `Enter a valid year between 1000 and ${currentYear()}.`;
        }
      } else if (field.name === "imageUrl" && !isValidUrl(value)) {
        message = "Enter a valid image URL.";
      }

      if (message) {
        valid = false;
        this.setFieldError(field, message);
      }
    });

    return valid;
  },

  artworkCard(art) {
    const imageUrl = art.image?.url || "https://placehold.co/600x750?text=No+Image";
    const imageAlt = art.image?.alt || art.title || "Artwork image";
    const artist = art.artist || "Unknown artist";
    const year = art.year || "Unknown year";
    const medium = art.medium || "Unknown medium";

    return `
      <article class="art-card">
        <a href="./pages/artwork-detail.html?id=${art.id}" class="art-card-link" aria-label="View ${art.title}">
          <img src="${imageUrl}" alt="${imageAlt}" class="art-card-image" />
          <div class="art-card-body">
            <h3 class="art-card-title">${art.title}</h3>
            <p class="art-card-artist">${artist}</p>
            <div class="art-card-tags">
              <span class="tag">${year}</span>
              <span class="tag">${medium}</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }
};
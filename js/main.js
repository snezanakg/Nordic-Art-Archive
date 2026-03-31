import { ui } from "./ui.js";
import { loadGallery } from "./gallery.js";
import { loadArtworkDetail } from "./artwork-detail.js";
import { initCreateArtworkPage } from "./create-artwork.js";
import { initEditArtworkPage } from "./edit-artwork.js";
import { initLoginPage, initRegisterPage } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderNav();

  const page = document.body.dataset.page;

  if (page === "feed") {
    loadGallery();
  }

  if (page === "details") {
    loadArtworkDetail();
  }

  if (page === "create") {
    initCreateArtworkPage();
  }

  if (page === "edit") {
    initEditArtworkPage();
  }

  if (page === "login") {
    initLoginPage();
  }

  if (page === "register") {
    initRegisterPage();
  }
});
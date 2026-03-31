import { API_URL, fetchApi } from "./api.js";
import { requireAuth } from "./auth.js";
import { ui } from "./ui.js";

export function initCreateArtworkPage() {
  if (!requireAuth()) return;

  const form = document.getElementById("create-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    ui.clearMessage();

    if (!ui.validateForm(form)) {
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    ui.setButtonLoading(submitButton, true, "Creating...");

    try {
      const formData = new FormData(form);

      const payload = {
        title: formData.get("title").trim(),
        artist: formData.get("artist").trim(),
        year: Number(formData.get("year")),
        medium: formData.get("medium").trim(),
        description: formData.get("description").trim(),
        location: formData.get("location").trim(),
        image: {
          url: formData.get("imageUrl").trim(),
          alt: formData.get("title").trim(),
        },
      };

      const createdArtwork = await fetchApi(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      ui.showMessage("Artwork created successfully.", "success");

      setTimeout(() => {
        window.location.href = `./artwork-detail.html?id=${createdArtwork.id}`;
      }, 700);
    } catch (error) {
      ui.showMessage(error.message, "error");
      ui.setButtonLoading(submitButton, false);
    }
  });
}
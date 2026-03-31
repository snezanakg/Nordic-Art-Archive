import { API_URL, fetchApi } from "./api.js";
import { auth, requireAuth } from "./auth.js";
import { getQueryParam } from "./utils.js";
import { ui } from "./ui.js";

export async function initEditArtworkPage() {
  if (!requireAuth()) return;

  const id = getQueryParam("id");
  const form = document.getElementById("edit-form");
  const deleteBtn = document.getElementById("delete-btn");

  if (!id || !form) {
    ui.showMessage("Missing artwork information.", "error");
    return;
  }

  ui.clearMessage();
  ui.toggleLoader(true);

  try {
    const art = await fetchApi(`${API_URL}/${id}`);
    const user = auth.getUser();

    if (!user || art.owner?.name !== user.name) {
      ui.toggleLoader(false);
      ui.showMessage("You do not have permission to edit this artwork.", "error");
      return;
    }

    form.title.value = art.title || "";
    form.artist.value = art.artist || "";
    form.year.value = art.year || "";
    form.medium.value = art.medium || "";
    form.location.value = art.location || "";
    form.description.value = art.description || "";
    form.imageUrl.value = art.image?.url || "";

    ui.toggleLoader(false);
    ui.toggleContent(true);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      ui.clearMessage();

      if (!ui.validateForm(form)) {
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      ui.setButtonLoading(submitButton, true, "Saving...");

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

        await fetchApi(`${API_URL}/${id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        ui.showMessage("Artwork updated successfully.", "success");

        setTimeout(() => {
          window.location.href = `./artwork-detail.html?id=${id}`;
        }, 700);
      } catch (error) {
        ui.showMessage(error.message, "error");
        ui.setButtonLoading(submitButton, false);
      }
    });

    deleteBtn.addEventListener("click", async () => {
      const confirmed = window.confirm("Delete this artwork permanently?");
      if (!confirmed) return;

      try {
        ui.setButtonLoading(deleteBtn, true, "Deleting...");
        await fetchApi(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        window.location.href = "../index.html";
      } catch (error) {
        ui.showMessage(error.message, "error");
        ui.setButtonLoading(deleteBtn, false);
      }
    });
  } catch (error) {
    ui.toggleLoader(false);
    ui.showMessage(error.message, "error");
  }
}
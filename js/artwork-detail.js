import { API_URL, fetchApi } from "./api.js";
import { auth } from "./auth.js";
import { getQueryParam } from "./utils.js";
import { ui } from "./ui.js";

export async function loadArtworkDetail() {
  const id = getQueryParam("id");

  if (!id) {
    ui.showMessage("No artwork ID provided.", "error");
    return;
  }

  ui.clearMessage();
  ui.toggleLoader(true);

  try {
    const art = await fetchApi(`${API_URL}/${id}`);

    document.getElementById("art-img").src =
      art.image?.url || "https://placehold.co/900x900?text=No+Image";
    document.getElementById("art-img").alt =
      art.image?.alt || art.title || "Artwork image";

    document.getElementById("art-title").textContent = art.title || "Untitled";
    document.getElementById("art-artist").textContent = art.artist || "Unknown artist";
    document.getElementById("art-year").textContent = art.year || "Unknown year";
    document.getElementById("art-medium").textContent = art.medium || "Unknown medium";
    document.getElementById("art-location").textContent = art.location || "Unknown location";
    document.getElementById("art-desc").textContent =
      art.description || "No description available.";

    const user = auth.getUser();
    const adminActions = document.getElementById("admin-actions");
    const editLink = document.getElementById("edit-link");
    const deleteBtn = document.getElementById("delete-btn");

    if (user && art.owner?.name === user.name) {
      adminActions.classList.remove("hidden");
      editLink.href = `./edit-artwork.html?id=${art.id}`;

      deleteBtn.addEventListener("click", async () => {
        const confirmed = window.confirm("Delete this artwork?");
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
    }

    ui.toggleLoader(false);
    ui.toggleContent(true);
  } catch (error) {
    ui.toggleLoader(false);
    ui.showMessage(error.message, "error");
  }
}
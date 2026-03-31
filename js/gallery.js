import { API_URL, fetchApi } from "./api.js";
import { ui } from "./ui.js";

export async function loadGallery() {
  const grid = document.getElementById("grid");
  const feedCount = document.getElementById("feed-count");
  const artworkCount = document.getElementById("artwork-count");

  if (!grid) return;

  ui.clearMessage();
  ui.toggleLoader(true);

  try {
    const artworks = await fetchApi(`${API_URL}?page=1&limit=12`);
    ui.toggleLoader(false);

    if (!artworks.length) {
      grid.innerHTML = `<p class="empty-state">No artworks found.</p>`;
      if (feedCount) feedCount.textContent = "0";
      if (artworkCount) artworkCount.textContent = "0";
      return;
    }

    grid.innerHTML = artworks.map((art) => ui.artworkCard(art)).join("");

    if (feedCount) feedCount.textContent = String(artworks.length);
    if (artworkCount) artworkCount.textContent = String(artworks.length);
  } catch (error) {
    ui.toggleLoader(false);
    ui.showMessage(error.message, "error");
  }
}
import { STORAGE_KEYS } from "./utils.js";

export const API_BASE = "https://v2.api.noroff.dev";
export const API_URL = `${API_BASE}/artworks`;
export const AUTH_URL = `${API_BASE}/auth`;

export async function fetchApi(url, options = {}) {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  const apiKey = localStorage.getItem(STORAGE_KEYS.apiKey);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (apiKey) {
    headers["X-Noroff-API-Key"] = apiKey;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  let json = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (!response.ok) {
    console.error("API ERROR:", json);
    throw new Error(
      json?.errors?.[0]?.message ||
      json?.message ||
      `Request failed with status ${response.status}`
    );
  }

  return json?.data ?? null;
}

export async function registerUser({ name, email, password }) {
  return fetchApi(`${AUTH_URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function loginUser({ email, password }) {
  return fetchApi(`${AUTH_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function createApiKey(accessToken) {
  const response = await fetch(`${AUTH_URL}/create-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: "Nordic Art Archive Key",
    }),
  });

  let json = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (!response.ok) {
    console.error("CREATE API KEY ERROR:", json);
    throw new Error(
      json?.errors?.[0]?.message ||
      json?.message ||
      `API key request failed with status ${response.status}`
    );
  }

  return json?.data ?? null;
}
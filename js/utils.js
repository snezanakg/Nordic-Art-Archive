export const STORAGE_KEYS = {
  token: "naa_token",
  user: "naa_user",
  apiKey: "naa_api_key",
};

export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isNoroffEmail(email) {
  return /^[\w\-.]+@(stud\.)?noroff\.no$/i.test(email);
}

export function currentYear() {
  return new Date().getFullYear();
}
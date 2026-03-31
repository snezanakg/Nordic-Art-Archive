import { loginUser, registerUser, createApiKey } from "./api.js";
import { STORAGE_KEYS, isNoroffEmail } from "./utils.js";
import { ui } from "./ui.js";

export const auth = {
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.token);
  },

  getUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  },

  getApiKey() {
    return localStorage.getItem(STORAGE_KEYS.apiKey);
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  setSession({ token, user, apiKey = null }) {
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));

    if (apiKey) {
      localStorage.setItem(STORAGE_KEYS.apiKey, apiKey);
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.apiKey);
    window.location.href = "../index.html";
  },
};

export function requireAuth() {
  if (!auth.isLoggedIn()) {
    window.location.href = "../pages/login.html";
    return false;
  }
  return true;
}

export function initLoginPage() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    ui.clearMessage();

    if (!ui.validateForm(form, { requireNoroffEmail: true })) {
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    ui.setButtonLoading(submitButton, true, "Signing in...");

    try {
      const formData = new FormData(form);

      const payload = {
        email: formData.get("email").trim(),
        password: formData.get("password").trim(),
      };

      console.log("LOGIN PAYLOAD:", payload);

      // 1. Login
      const loginData = await loginUser(payload);
      console.log("LOGIN SUCCESS:", loginData);

      // 2. Create API key using fresh access token
      const keyData = await createApiKey(loginData.accessToken);
      console.log("API KEY SUCCESS:", keyData);

      // 3. Save everything
      auth.setSession({
        token: loginData.accessToken,
        user: {
          name: loginData.name,
          email: loginData.email,
          avatar: loginData.avatar || null,
        },
        apiKey: keyData?.key || null,
      });

      ui.showMessage("Login successful. Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 700);
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      ui.showMessage(error.message || "Login failed.", "error");
      ui.setButtonLoading(submitButton, false);
    }
  });
}

export function initRegisterPage() {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    ui.clearMessage();

    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    if (!ui.validateForm(form, { requireNoroffEmail: true })) {
      return;
    }

    if (!isNoroffEmail(email)) {
      ui.setFieldError(form.email, "Use a valid Noroff email address.");
      return;
    }

    if (password !== confirmPassword) {
      ui.setFieldError(form.confirmPassword, "Passwords do not match.");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    ui.setButtonLoading(submitButton, true, "Creating account...");

    try {
      const formData = new FormData(form);

      const payload = {
        name: formData.get("name").trim(),
        email,
        password,
      };

      console.log("REGISTER PAYLOAD:", payload);

      await registerUser(payload);

      ui.showMessage("Account created successfully. Redirecting to login...", "success");

      setTimeout(() => {
        window.location.href = "../pages/login.html";
      }, 900);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      ui.showMessage(error.message || "Registration failed.", "error");
      ui.setButtonLoading(submitButton, false);
    }
  });
}
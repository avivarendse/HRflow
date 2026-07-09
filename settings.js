document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  setupDarkMode();
  setupButtons();
});

function loadSettings() {
  document.getElementById("companyName").value =
    localStorage.getItem("companyName") || "ModernTech Solutions";
  document.getElementById("companyEmail").value =
    localStorage.getItem("companyEmail") || "hr@moderntech.com";

  const notifications = localStorage.getItem("notifications");
  document.getElementById("notifications").checked = notifications !== "false";

  const darkMode = localStorage.getItem("darkMode") === "true";
  document.getElementById("darkMode").checked = darkMode;
}

function saveSettings() {
  const pass = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (pass && pass !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem(
    "companyName",
    document.getElementById("companyName").value,
  );
  localStorage.setItem(
    "companyEmail",
    document.getElementById("companyEmail").value,
  );
  localStorage.setItem(
    "notifications",
    document.getElementById("notifications").checked,
  );

  alert("Settings saved successfully!");
  if (pass) {
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  }
}

function setupDarkMode() {
  const toggle = document.getElementById("darkMode");
  toggle?.addEventListener("change", () => {
    const isDark = toggle.checked;
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("darkMode", isDark);
  });

  // respond to theme changes from other tabs/windows
  window.addEventListener("storage", (e) => {
    if (e.key !== "darkMode") return;
    const isDark = e.newValue === "true";
    document.body.classList.toggle("dark-mode", isDark);
    const cb = document.getElementById("darkMode");
    if (cb) cb.checked = isDark;
  });
}

function setupButtons() {
  document.getElementById("saveBtn")?.addEventListener("click", saveSettings);
  document.getElementById("resetBtn")?.addEventListener("click", () => {
    if (confirm("Reset all settings to default?")) {
      localStorage.clear();
      location.reload();
    }
  });
}

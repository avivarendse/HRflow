document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  setupDarkMode();
  setupButtons();
});

// Helper utility to replace native alert() with Bootstrap Modals
function showUiAlert(title, message, isSuccess = true) {
  const modalEl = document.getElementById("hrflowModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("modalCancelBtn").classList.add("d-none");
  
  const iconBox = document.getElementById("modalIcon");
  if (isSuccess) {
    iconBox.className = "mb-3 fs-1 text-success";
    iconBox.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
  } else {
    iconBox.className = "mb-3 fs-1 text-danger";
    iconBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i>';
  }
  
  // Clear old event listener mappings
  const confirmBtn = document.getElementById("modalConfirmBtn");
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  modal.show();
}

// Helper utility to replace native confirm() with Bootstrap Modals
function showUiConfirm(title, message, onConfirm) {
  const modalEl = document.getElementById("hrflowModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMessage").textContent = message;
  
  const iconBox = document.getElementById("modalIcon");
  iconBox.className = "mb-3 fs-1 text-warning";
  iconBox.innerHTML = '<i class="bi bi-question-circle-fill"></i>';
  
  document.getElementById("modalCancelBtn").classList.remove("d-none");
  
  const confirmBtn = document.getElementById("modalConfirmBtn");
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  
  newConfirmBtn.addEventListener("click", () => {
    onConfirm();
  });
  
  modal.show();
}

function loadSettings() {
  document.getElementById("companyName").value =
    localStorage.getItem("companyName") || "ModernTech Solutions";
  document.getElementById("companyEmail").value =
    localStorage.getItem("companyEmail") || "hr@moderntech.com";

  const notifications = localStorage.getItem("notifications");
  document.getElementById("notifications").checked = notifications !== "false";

  const darkMode = localStorage.getItem("darkMode") === "true";
  const cb = document.getElementById("darkMode");
  if (cb) cb.checked = darkMode;
}

function saveSettings() {
  const pass = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (pass && pass !== confirm) {
    showUiAlert("Validation Error", "Passwords do not match!", false);
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

  showUiAlert("Success", "Settings saved successfully!", true);
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
    showUiConfirm("Reset Defaults", "Are you sure you want to restore factory default configuration states?", () => {
      localStorage.clear();
      location.reload();
    });
  });

  document.getElementById("logoutBtn")?.addEventListener("click", function(e) {
    e.preventDefault();
    showUiConfirm("Confirm Log Out", "Are you sure you want to sign out of the HRflow gateway?", () => {
      sessionStorage.removeItem("isAuthenticated");
      window.location.href = "login.html";
    });
  });
}

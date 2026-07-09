let currentFilteredList = [];
const dummyData = window.__DUMMY_DATA__ || {};
const employees = dummyData.employees || [];
const attendance = dummyData.attendance || [];

document.addEventListener("DOMContentLoaded", () => {
  if (employees.length && attendance.length) {
    currentFilteredList = [...employees];
    initReportSystem();
  } else {
    console.error("Data sources missing.");
  }
});

function initReportSystem() {
  updateDashboardMetrics();
  renderTable(employees);
  renderAnalyticalGraphs();
  setupFilterInterface();
  setupExport();
}

function updateDashboardMetrics() {
  document.getElementById("employeeCount").textContent = employees.length;

  let totalDays = 0,
    presentDays = 0;
  attendance.forEach((record) => {
    record.attendance.forEach((day) => {
      totalDays++;
      if (day.status === "Present") presentDays++;
    });
  });

  const rate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  document.getElementById("attendanceRate").textContent = rate + "%";

  let pendingCount = 0;
  attendance.forEach((record) => {
    record.leaveRequests.forEach((req) => {
      if (req.status === "Pending") pendingCount++;
    });
  });
  document.getElementById("pendingLeave").textContent = pendingCount;
}

function renderTable(list) {
  currentFilteredList = list;
  const tbody = document.getElementById("reportTable");
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4">No results found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list
    .map(
      (emp) => `
    <tr>
      <td class="fw-semibold text-secondary">#${emp.employeeId}</td>
      <td class="fw-bold">${emp.name}</td>
      <td><span class="badge badge-dept">${emp.department}</span></td>
      <td>${emp.position}</td>
      <td class="text-secondary small">${emp.contact}</td>
    </tr>
  `,
    )
    .join("");
}

function setupFilterInterface() {
  const searchInput = document.getElementById("searchEmployee");
  searchInput?.addEventListener("input", function () {
    const q = this.value.toLowerCase();
    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.position.toLowerCase().includes(q),
    );
    setActiveFilterChip(q ? `Search: ${q}` : "");
    renderTable(filtered);
  });
}

function setActiveFilterChip(label) {
  const chip = document.getElementById("activeFilterChip");
  if (!chip) return;
  if (!label) {
    chip.classList.add("d-none");
    return;
  }
  chip.classList.remove("d-none");
  chip.innerHTML = `${label} <i class="bi bi-x-circle ms-1" style="cursor:pointer"></i>`;
  chip.querySelector("i").onclick = () => {
    document.getElementById("searchEmployee").value = "";
    setActiveFilterChip("");
    renderTable(employees);
  };
}

function renderAnalyticalGraphs() {

  // Attendance Pie

  let pres = 0,
    abs = 0;
  attendance.forEach((r) =>
    r.attendance.forEach((d) => (d.status === "Present" ? pres++ : abs++)),
  );

  new Chart(document.getElementById("attendanceChart"), {
    type: "doughnut",
    data: {
      labels: ["Present", "Absent"],
      datasets: [
        {
          data: [pres, abs],
          backgroundColor: ["#10b981", "#ef4444"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
    },
  });

  // Department Bar
  
  const depts = {};
  employees.forEach(
    (e) => (depts[e.department] = (depts[e.department] || 0) + 1),
  );

  new Chart(document.getElementById("departmentChart"), {
    type: "bar",
    data: {
      labels: Object.keys(depts),
      datasets: [
        {
          label: "Headcount",
          data: Object.values(depts),
          backgroundColor: "#12766b",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (e, el) => {
        if (!el.length) return;
        const label = Object.keys(depts)[el[0].index];
        setActiveFilterChip(`Dept: ${label}`);
        renderTable(employees.filter((emp) => emp.department === label));
      },
      plugins: { legend: { display: false } },
    },
  });
}

function setupExport() {
  document.getElementById("exportBtn")?.addEventListener("click", () => {
    const headers = ["ID", "Name", "Department", "Position", "Contact"];
    const rows = currentFilteredList.map((e) => [
      e.employeeId,
      e.name,
      e.department,
      e.position,
      e.contact,
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "hr_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

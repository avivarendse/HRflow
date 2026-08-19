// ======================================================
// HR FLOW - REPORTS
// Connected to the backend API
// ======================================================

const API_URL = "http://localhost:4000/api/reports";

let reportData = [];
let currentFilteredList = [];

let performanceChart = null;
let departmentChart = null;


// ======================================================
// PAGE INITIALISATION
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  loadReports();

  setupSearch();
  setupExport();
});


// ======================================================
// LOAD REPORT DATA
// ======================================================

async function loadReports() {
  try {
    console.log("Loading reports from:", API_URL);

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const result = await response.json();

    console.log("Reports API response:", result);

    if (!result.success) {
      throw new Error(result.message || "Failed to load reports");
    }

    reportData = result.data || [];

    console.log("Report data:", reportData);

    if (reportData.length === 0) {
      showTableMessage("No report data was returned from the database.");
      return;
    }

    currentFilteredList = [...reportData];

    updateDashboardMetrics();
    renderTable(currentFilteredList);
    renderPerformanceChart();
    renderDepartmentChart();

  } catch (error) {
    console.error("Reports API error:", error);

    showTableMessage(
      "Unable to load report data. Please make sure the backend is running."
    );
  }
}


// ======================================================
// DASHBOARD METRICS
// ======================================================

function updateDashboardMetrics() {

  // -------------------------------
  // TOTAL STAFF
  // -------------------------------

  const employeeCount =
    document.getElementById("employeeCount");

  if (employeeCount) {
    employeeCount.textContent = reportData.length;
  }


  // -------------------------------
  // PERFORMANCE RATE
  // -------------------------------

  const performanceRateElement =
    document.getElementById("PerformanceRate");

  if (performanceRateElement) {

    const employeesWithPerformance =
      reportData.filter(
        employee =>
          employee.performance_score !== null &&
          employee.performance_score !== undefined
      );

    if (employeesWithPerformance.length > 0) {

      const totalPerformance =
        employeesWithPerformance.reduce(
          (total, employee) =>
            total + Number(employee.performance_score || 0),
          0
        );

      const averagePerformance =
        totalPerformance /
        employeesWithPerformance.length;

      performanceRateElement.textContent =
        `${Math.round(averagePerformance)}%`;

    } else {
      performanceRateElement.textContent = "0%";
    }
  }


  // -------------------------------
  // PENDING LEAVE
  // -------------------------------

  const pendingLeaveElement =
    document.getElementById("pendingLeave");

  if (pendingLeaveElement) {

    const pendingLeave =
      reportData.reduce(
        (total, employee) =>
          total +
          Number(employee.pending_leave || 0),
        0
      );

    pendingLeaveElement.textContent =
      pendingLeave;
  }
}


// ======================================================
// EMPLOYEE TABLE
// ======================================================

function renderTable(list) {

  currentFilteredList = list;

  const tbody =
    document.getElementById("reportTable");

  if (!tbody) return;


  if (!list || list.length === 0) {

    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4">
          No results found.
        </td>
      </tr>
    `;

    return;
  }


  tbody.innerHTML = list
    .map(employee => {

      const employeeId =
        employee.employee_id ?? "N/A";

      const employeeName =
        employee.employee_name ?? "N/A";

      const department =
        employee.department ?? "N/A";

      const position =
        employee.position ?? "N/A";

      const contact =
        employee.contact ?? "N/A";


      return `
        <tr>

          <td class="fw-semibold text-secondary">
            #${escapeHtml(employeeId)}
          </td>

          <td class="fw-bold">
            ${escapeHtml(employeeName)}
          </td>

          <td>
            <span class="badge badge-dept">
              ${escapeHtml(department)}
            </span>
          </td>

          <td>
            ${escapeHtml(position)}
          </td>

          <td class="text-secondary small">
            ${escapeHtml(contact)}
          </td>

        </tr>
      `;
    })
    .join("");
}


// ======================================================
// SEARCH
// ======================================================

function setupSearch() {

  const searchInput =
    document.getElementById("searchEmployee");

  if (!searchInput) return;


  searchInput.addEventListener("input", function () {

    const query =
      this.value.trim().toLowerCase();


    if (!query) {

      setActiveFilterChip("");

      renderTable(reportData);

      return;
    }


    const filteredEmployees =
      reportData.filter(employee => {

        const name =
          String(employee.employee_name || "")
            .toLowerCase();

        const department =
          String(employee.department || "")
            .toLowerCase();

        const position =
          String(employee.position || "")
            .toLowerCase();

        const contact =
          String(employee.contact || "")
            .toLowerCase();

        const id =
          String(employee.employee_id || "")
            .toLowerCase();


        return (
          name.includes(query) ||
          department.includes(query) ||
          position.includes(query) ||
          contact.includes(query) ||
          id.includes(query)
        );
      });


    setActiveFilterChip(`Search: ${query}`);

    renderTable(filteredEmployees);
  });
}


// ======================================================
// FILTER CHIP
// ======================================================

function setActiveFilterChip(label) {

  const chip =
    document.getElementById("activeFilterChip");

  if (!chip) return;


  if (!label) {

    chip.classList.add("d-none");
    chip.innerHTML = "";

    return;
  }


  chip.classList.remove("d-none");

  chip.innerHTML = `
    ${escapeHtml(label)}
    <i
      class="bi bi-x-circle ms-1"
      style="cursor:pointer"
      title="Clear filter"
    ></i>
  `;


  const closeButton =
    chip.querySelector("i");


  closeButton?.addEventListener("click", () => {

    const searchInput =
      document.getElementById("searchEmployee");

    if (searchInput) {
      searchInput.value = "";
    }

    setActiveFilterChip("");

    renderTable(reportData);
  });
}


// ======================================================
// PERFORMANCE / ATTENDANCE CHART
// ======================================================

function renderPerformanceChart() {

  const canvas =
    document.getElementById("PerformanceChart");

  if (!canvas) return;


  if (performanceChart) {
    performanceChart.destroy();
  }


  let presentCount = 0;
  let absentCount = 0;


  reportData.forEach(employee => {

    presentCount +=
      Number(employee.days_present || 0);

    absentCount +=
      Number(employee.days_absent || 0);
  });


  performanceChart = new Chart(canvas, {

    type: "doughnut",

    data: {

      labels: [
        "Present",
        "Absent"
      ],

      datasets: [
        {
          data: [
            presentCount,
            absentCount
          ],

          backgroundColor: [
            "#10b981",
            "#ef4444"
          ],

          borderWidth: 0
        }
      ]
    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {
          position: "bottom"
        }
      }
    }
  });
}


// ======================================================
// DEPARTMENT BAR CHART
// ======================================================

function renderDepartmentChart() {

  const canvas =
    document.getElementById("departmentChart");

  if (!canvas) return;


  if (departmentChart) {
    departmentChart.destroy();
  }


  const departments = {};


  reportData.forEach(employee => {

    const department =
      employee.department || "Unknown";


    if (!departments[department]) {
      departments[department] = 0;
    }


    departments[department]++;
  });


  const departmentNames =
    Object.keys(departments);

  const departmentCounts =
    Object.values(departments);


  departmentChart = new Chart(canvas, {

    type: "bar",

    data: {

      labels: departmentNames,

      datasets: [
        {
          label: "Employees",

          data: departmentCounts,

          backgroundColor: "#12766b",

          borderRadius: 6
        }
      ]
    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {
          display: false
        }
      },

      scales: {

        y: {

          beginAtZero: true,

          ticks: {
            precision: 0
          }
        }
      },


      onClick: function (event, elements) {

        if (!elements.length) {
          return;
        }


        const index =
          elements[0].index;


        const selectedDepartment =
          departmentNames[index];


        const filteredEmployees =
          reportData.filter(
            employee =>
              employee.department ===
              selectedDepartment
          );


        setActiveFilterChip(
          `Dept: ${selectedDepartment}`
        );


        const searchInput =
          document.getElementById(
            "searchEmployee"
          );


        if (searchInput) {
          searchInput.value = "";
        }


        renderTable(filteredEmployees);
      }
    }
  });
}


// ======================================================
// CSV EXPORT
// ======================================================

function setupExport() {

  const exportButton =
    document.getElementById("exportBtn");

  if (!exportButton) return;


  exportButton.addEventListener("click", () => {

    if (!currentFilteredList.length) {

      alert(
        "There is no report data to export."
      );

      return;
    }


    const headers = [
      "ID",
      "Name",
      "Department",
      "Position",
      "Contact"
    ];


    const rows =
      currentFilteredList.map(employee => [

        employee.employee_id ?? "",

        employee.employee_name ?? "",

        employee.department ?? "",

        employee.position ?? "",

        employee.contact ?? ""
      ]);


    const csvRows = [
      headers,
      ...rows
    ];


    const csvContent =
      csvRows
        .map(row =>
          row
            .map(csvEscape)
            .join(",")
        )
        .join("\n");


    const blob =
      new Blob(
        [csvContent],
        {
          type: "text/csv;charset=utf-8;"
        }
      );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "hrflow_report.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  });
}


// ======================================================
// CSV ESCAPE
// ======================================================

function csvEscape(value) {

  const stringValue =
    String(value ?? "");


  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {

    return `"${stringValue.replace(/"/g, '""')}"`;
  }


  return stringValue;
}


// ======================================================
// HTML ESCAPE
// ======================================================

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ======================================================
// TABLE ERROR MESSAGE
// ======================================================

function showTableMessage(message) {

  const tbody =
    document.getElementById("reportTable");

  if (!tbody) return;


  tbody.innerHTML = `
    <tr>
      <td colspan="5" class="text-center py-4 text-danger">
        ${escapeHtml(message)}
      </td>
    </tr>
  `;
}

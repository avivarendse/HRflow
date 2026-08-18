// ======================================================
// HR FLOW - REPORTS
// Connected directly to the backend API
// ======================================================

const API_BASE_URL = "http://localhost:5000/api/reports";

let performanceData = [];
let attendanceData = [];
let payrollData = [];
let currentFilteredList = [];

let performanceChart = null;
let departmentChart = null;


// ======================================================
// PAGE INITIALISATION
// ======================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadReports();

    setupSearch();
    setupExport();

  } catch (error) {
    console.error("Failed to load Reports page:", error);

    showTableMessage(
      "Unable to load report data. Please make sure the backend is running."
    );
  }
});


// ======================================================
// LOAD DATA FROM BACKEND
// ======================================================

async function loadReports() {
  try {
    const [
      performanceResponse,
      attendanceResponse,
      payrollResponse,
      pendingLeaveResponse
    ] = await Promise.all([
      fetch(`${API_BASE_URL}/performance`),
      fetch(`${API_BASE_URL}/attendance`),
      fetch(`${API_BASE_URL}/payroll`),
      fetch(`${API_BASE_URL}/pending-leave`)
    ]);

    // Check performance response
    if (!performanceResponse.ok) {
      throw new Error("Failed to retrieve performance report");
    }

    // Check attendance response
    if (!attendanceResponse.ok) {
      throw new Error("Failed to retrieve attendance report");
    }

    // Check payroll response
    if (!payrollResponse.ok) {
      throw new Error("Failed to retrieve payroll report");
    }

    // Pending leave may not exist yet
    let pendingLeaveData = 0;

    if (pendingLeaveResponse.ok) {
      const pendingLeaveResult = await pendingLeaveResponse.json();

      if (pendingLeaveResult.success) {
        pendingLeaveData =
          Number(
            pendingLeaveResult.data?.pending_leave ??
            pendingLeaveResult.data ??
            0
          );
      }
    }

    const performanceResult = await performanceResponse.json();
    const attendanceResult = await attendanceResponse.json();
    const payrollResult = await payrollResponse.json();

    if (!performanceResult.success) {
      throw new Error(
        performanceResult.message || "Performance report failed"
      );
    }

    if (!attendanceResult.success) {
      throw new Error(
        attendanceResult.message || "Attendance report failed"
      );
    }

    if (!payrollResult.success) {
      throw new Error(
        payrollResult.message || "Payroll report failed"
      );
    }

    // Store backend data
    performanceData = performanceResult.data || [];
    attendanceData = attendanceResult.data || [];
    payrollData = payrollResult.data || [];

    // Build employee list from performance report
    currentFilteredList = getUniqueEmployees(performanceData);

    // Update everything on the page
    updateDashboardMetrics(pendingLeaveData);
    renderTable(currentFilteredList);
    renderPerformanceChart();
    renderDepartmentChart();

  } catch (error) {
    console.error("Reports API error:", error);

    throw error;
  }
}


// ======================================================
// GET UNIQUE EMPLOYEES
// ======================================================

function getUniqueEmployees(data) {
  const employeeMap = new Map();

  data.forEach((employee) => {
    if (!employeeMap.has(employee.employee_id)) {
      employeeMap.set(employee.employee_id, employee);
    }
  });

  return Array.from(employeeMap.values());
}


// ======================================================
// DASHBOARD METRICS
// ======================================================

function updateDashboardMetrics(pendingLeaveCount) {
  const employees = getUniqueEmployees(performanceData);

  // -------------------------------
  // TOTAL STAFF
  // -------------------------------

  const employeeCount = document.getElementById("employeeCount");

  if (employeeCount) {
    employeeCount.textContent = employees.length;
  }


  // -------------------------------
  // PERFORMANCE RATE
  // -------------------------------

  const performanceRateElement =
    document.getElementById("PerformanceRate");

  if (performanceRateElement) {
    if (performanceData.length > 0) {

      const totalPerformance = performanceData.reduce(
        (total, employee) =>
          total + Number(employee.performance_score || 0),
        0
      );

      const averagePerformance =
        totalPerformance / performanceData.length;

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
    pendingLeaveElement.textContent =
      Number(pendingLeaveCount) || 0;
  }
}


// ======================================================
// EMPLOYEE TABLE
// ======================================================

function renderTable(list) {
  currentFilteredList = list;

  const tbody = document.getElementById("reportTable");

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
    .map((employee) => {

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
            #${employeeId}
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

    const employees =
      getUniqueEmployees(performanceData);

    if (!query) {
      setActiveFilterChip("");
      renderTable(employees);
      return;
    }

    const filteredEmployees =
      employees.filter((employee) => {

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

  const closeButton = chip.querySelector("i");

  closeButton?.addEventListener("click", () => {

    const searchInput =
      document.getElementById("searchEmployee");

    if (searchInput) {
      searchInput.value = "";
    }

    setActiveFilterChip("");

    renderTable(
      getUniqueEmployees(performanceData)
    );
  });
}


// ======================================================
// PERFORMANCE / ATTENDANCE PIE CHART
// ======================================================

function renderPerformanceChart() {

  const canvas =
    document.getElementById("PerformanceChart");

  if (!canvas) return;

  if (performanceChart) {
    performanceChart.destroy();
  }


  // Count attendance statuses
  let presentCount = 0;
  let absentCount = 0;

  attendanceData.forEach((record) => {

    if (record.status === "Present") {
      presentCount++;
    }

    if (record.status === "Absent") {
      absentCount++;
    }
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


  const employees =
    getUniqueEmployees(performanceData);

  const departments = {};


  employees.forEach((employee) => {

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
          employees.filter(
            (employee) =>
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


  exportButton.addEventListener(
    "click",
    () => {

      if (!currentFilteredList.length) {
        alert("There is no report data to export.");
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
        currentFilteredList.map(
          (employee) => [

            employee.employee_id ?? "",

            employee.employee_name ?? "",

            employee.department ?? "",

            employee.position ?? "",

            employee.contact ?? ""
          ]
        );


      const csvRows = [
        headers,
        ...rows
      ];


      const csvContent =
        csvRows
          .map((row) =>
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
    }
  );
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

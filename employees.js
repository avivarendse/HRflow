(function () {
  const dummyData = window.__DUMMY_DATA__ || {};
  const employeeRecords = Array.isArray(dummyData.attendance)
    ? dummyData.attendance
    : [];
  const tableBody = document.getElementById("employee-table-body");
  const departmentFilter = document.getElementById("department-filter");
  const searchInput = document.getElementById("search-input");
  const previousButton = document.getElementById("btn-previous");
  const nextButton = document.getElementById("btn-next");

  if (!tableBody) return;

  const departments = [
    "Engineering",
    "Human Resources",
    "Operations",
    "Finance",
    "Sales",
  ];
  const positions = [
    "Software Engineer",
    "HR Specialist",
    "Operations Lead",
    "Financial Analyst",
    "Sales Executive",
  ];

  const employees = employeeRecords.map((employee, index) => ({
    id: employee.employeeId || index + 1,
    name: employee.name || `Employee ${index + 1}`,
    position: positions[index % positions.length],
    department: departments[index % departments.length],
    salary: `R${(45000 + index * 5000).toLocaleString("en-ZA")}`,
    contact: `+27 82 000 ${1000 + index}`,
  }));

  let currentPage = 1;
  const pageSize = 6;

  function getFilteredEmployees() {
    const searchTerm = (searchInput?.value || "").trim().toLowerCase();
    const selectedDepartment = departmentFilter?.value || "";

    return employees.filter((employee) => {
      const matchesDepartment =
        !selectedDepartment || employee.department === selectedDepartment;
      const matchesSearch =
        !searchTerm ||
        [
          employee.name,
          employee.position,
          employee.department,
          String(employee.id),
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm);

      return matchesDepartment && matchesSearch;
    });
  }

  function renderDepartments() {
    if (!departmentFilter) return;

    const uniqueDepartments = [
      ...new Set(employees.map((employee) => employee.department)),
    ].sort();
    departmentFilter.innerHTML =
      '<option value="">All Departments</option>' +
      uniqueDepartments
        .map(
          (department) =>
            `<option value="${department}">${department}</option>`,
        )
        .join("");
  }

  function renderEmployees() {
    const filteredEmployees = getFilteredEmployees();
    const totalPages = Math.max(
      1,
      Math.ceil(filteredEmployees.length / pageSize),
    );

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const visibleEmployees = filteredEmployees.slice(
      startIndex,
      startIndex + pageSize,
    );

    tableBody.innerHTML = visibleEmployees.length
      ? visibleEmployees
          .map(
            (employee) => `
          <tr>
            <td>
              <div class="fw-semibold">${employee.name}</div>
            </td>
            <td>${employee.id}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.contact}</td>
          </tr>
        `,
          )
          .join("")
      : '<tr><td colspan="6" class="text-center py-4">No employees found.</td></tr>';

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage >= totalPages;
  }

  renderDepartments();
  renderEmployees();

  [searchInput, departmentFilter].forEach((element) => {
    element?.addEventListener("input", () => {
      currentPage = 1;
      renderEmployees();
    });
  });

  previousButton?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderEmployees();
    }
  });

  nextButton?.addEventListener("click", () => {
    const filteredEmployees = getFilteredEmployees();
    const totalPages = Math.max(
      1,
      Math.ceil(filteredEmployees.length / pageSize),
    );
    if (currentPage < totalPages) {
      currentPage += 1;
      renderEmployees();
    }
  });
})();

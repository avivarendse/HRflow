(function () {
  const tableBody = document.getElementById("employee-table-body");
  const departmentFilter = document.getElementById("department-filter");
  const searchInput = document.getElementById("search-input");
  const previousButton = document.getElementById("btn-previous");
  const nextButton = document.getElementById("btn-next");

  if (!tableBody) return;

  let employees = [];
  let currentPage = 1;
  const pageSize = 6;

  async function loadEmployees() {
    try {
      const response = await fetch("http://localhost:4000/api/employees");

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      employees = data.map((employee) => ({
        id: employee.employees_id,
        name: `${employee.first_name} ${employee.last_name}`,
        position: employee.position,
        department: employee.department_name,
        salary: `R${Number(employee.salary).toLocaleString("en-ZA")}`,
        contact: employee.contact,
      }));

      renderDepartments();
      renderEmployees();

    } catch (error) {
      console.error("Failed to load employees:", error);

      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4">
            Failed to load employees.
          </td>
        </tr>
      `;
    }
  }

  function getFilteredEmployees() {
    const searchTerm = (searchInput?.value || "").trim().toLowerCase();
    const selectedDepartment = departmentFilter?.value || "";

    return employees.filter((employee) => {
      const matchesDepartment =
        !selectedDepartment ||
        employee.department === selectedDepartment;

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
            `<option value="${department}">${department}</option>`
        )
        .join("");
  }

  function renderEmployees() {
    const filteredEmployees = getFilteredEmployees();

    const totalPages = Math.max(
      1,
      Math.ceil(filteredEmployees.length / pageSize)
    );

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * pageSize;

    const visibleEmployees = filteredEmployees.slice(
      startIndex,
      startIndex + pageSize
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
            `
          )
          .join("")
      : `
          <tr>
            <td colspan="6" class="text-center py-4">
              No employees found.
            </td>
          </tr>
        `;

    if (previousButton) {
      previousButton.disabled = currentPage === 1;
    }

    if (nextButton) {
      nextButton.disabled = currentPage >= totalPages;
    }
  }

  searchInput?.addEventListener("input", () => {
    currentPage = 1;
    renderEmployees();
  });

  departmentFilter?.addEventListener("input", () => {
    currentPage = 1;
    renderEmployees();
  });

  previousButton?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderEmployees();
    }
  });

  nextButton?.addEventListener("click", () => {
    const filteredEmployees = getFilteredEmployees();

    const totalPages = Math.max(
      1,
      Math.ceil(filteredEmployees.length / pageSize)
    );

    if (currentPage < totalPages) {
      currentPage++;
      renderEmployees();
    }
  });

  loadEmployees();
})();
// =====================================================
// HRflow Employees Management
// employees.js
// =====================================================

// ---------- Load Employees ----------
let employeeData = JSON.parse(localStorage.getItem("employees"));

if (employeeData) {
    employees = employeeData;
}

let filteredEmployees = [...employees];

let editingId = null;

let currentPage = 1;

const rowsPerPage = 8;

// ---------- DOM ----------
const tableBody = document.getElementById("employee-table-body");
const searchInput = document.getElementById("search-input");
const departmentFilter = document.getElementById("department-filter");

const previousButton = document.getElementById("btn-previous");
const nextButton = document.getElementById("btn-next");

const saveButton = document.getElementById("saveEmployee");

const employeeModal =
    new bootstrap.Modal(document.getElementById("employeeModal"));

// =====================================================
// Utility Functions
// =====================================================

function saveEmployees() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}

function resetForm() {

    document.getElementById("empName").value = "";

    document.getElementById("empId").value = "";

    document.getElementById("empPosition").value = "";

    document.getElementById("empDepartment").value = "";

    document.getElementById("empSalary").value = "";

    document.getElementById("empEmail").value = "";

    editingId = null;

}

function populateDepartments() {

    const departments =
        [...new Set(employees.map(emp => emp.department))];

    departmentFilter.innerHTML =
        `<option value="">All Departments</option>`;

    departments.forEach(department => {

        departmentFilter.innerHTML +=
        `
        <option value="${department}">
            ${department}
        </option>
        `;

    });

}

// =====================================================
// Table Rendering
// =====================================================

function renderTable() {

    tableBody.innerHTML = "";

    const start =
        (currentPage - 1) * rowsPerPage;

    const end =
        start + rowsPerPage;

    const pageEmployees =
        filteredEmployees.slice(start, end);

    pageEmployees.forEach(emp => {

        tableBody.innerHTML +=
        `
        <tr>

            <td>${emp.name}</td>

            <td>${emp.employeeId}</td>

            <td>${emp.position}</td>

            <td>${emp.department}</td>

            <td>

                R${Number(emp.salary).toLocaleString()}

            </td>

            <td>

                <a href="mailto:${emp.contact}">
                    ${emp.contact}
                </a>

            </td>

            <td class="text-center">

                <button
                    class="btn btn-sm btn-outline-secondary view-btn"
                    data-id="${emp.employeeId}"
                    title="View">

                    <i class="bi bi-eye"></i>

                </button>

                <button
                    class="btn btn-sm btn-outline-primary edit-btn"
                    data-id="${emp.employeeId}"
                    title="Edit">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-sm btn-outline-danger delete-btn"
                    data-id="${emp.employeeId}"
                    title="Delete">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updatePagination();

}

// =====================================================
// Pagination
// =====================================================

function updatePagination() {

    previousButton.disabled =
        currentPage === 1;

    nextButton.disabled =
        currentPage >=
        Math.ceil(filteredEmployees.length / rowsPerPage);

}

// =====================================================
// Filtering
// =====================================================

function applyFilters() {

    const search =
        searchInput.value.toLowerCase();

    const department =
        departmentFilter.value;

    filteredEmployees = employees.filter(emp => {

        const matchesSearch =

            emp.name.toLowerCase().includes(search) ||

            emp.employeeId.toString().includes(search) ||

            emp.position.toLowerCase().includes(search) ||

            emp.department.toLowerCase().includes(search);

        const matchesDepartment =

            department === "" ||

            emp.department === department;

        return matchesSearch && matchesDepartment;

    });

    currentPage = 1;

    renderTable();

}

// =====================================================
// Validation
// =====================================================

function validateEmployee(employee) {

    if (

        employee.name.trim() === "" ||

        employee.employeeId.trim() === "" ||

        employee.position.trim() === "" ||

        employee.department.trim() === "" ||

        employee.contact.trim() === "" ||

        employee.salary <= 0

    ) {

        alert("Please complete all fields.");

        return false;

    }

    const duplicate = employees.find(emp =>

        emp.employeeId === employee.employeeId &&

        emp.employeeId !== editingId

    );

    if (duplicate) {

        alert("Employee ID already exists.");

        return false;

    }

    return true;

}

// =====================================================
// Add / Edit Employee
// =====================================================

saveButton.addEventListener("click", () => {

    const employee = {

        employeeId:
            document.getElementById("empId").value.trim(),

        name:
            document.getElementById("empName").value.trim(),

        position:
            document.getElementById("empPosition").value.trim(),

        department:
            document.getElementById("empDepartment").value.trim(),

        salary:
            Number(document.getElementById("empSalary").value),

        contact:
            document.getElementById("empEmail").value.trim()

    };

    if (!validateEmployee(employee)) return;

    if (editingId === null) {

        employees.push(employee);

    } else {

        const index = employees.findIndex(emp =>
            emp.employeeId === editingId
        );

        if (index !== -1) {

            employees[index] = employee;

        }

    }

    saveEmployees();

    populateDepartments();

    applyFilters();

    employeeModal.hide();

    resetForm();

});

// =====================================================
// Edit Button
// =====================================================

document.addEventListener("click", function(e) {

    const editButton =
        e.target.closest(".edit-btn");

    if (!editButton) return;

    const id =
        editButton.dataset.id;

    const employee =
        employees.find(emp =>
            emp.employeeId == id
        );

    if (!employee) return;

    editingId = employee.employeeId;

    document.getElementById("empName").value =
        employee.name;

    document.getElementById("empId").value =
        employee.employeeId;

    document.getElementById("empPosition").value =
        employee.position;

    document.getElementById("empDepartment").value =
        employee.department;

    document.getElementById("empSalary").value =
        employee.salary;

    document.getElementById("empEmail").value =
        employee.contact;

    employeeModal.show();

});

// =====================================================
// Delete Employee
// =====================================================

document.addEventListener("click", function (e) {

    const deleteButton = e.target.closest(".delete-btn");

    if (!deleteButton) return;

    const id = deleteButton.dataset.id;

    if (!confirm("Are you sure you want to delete this employee?")) return;

    employees = employees.filter(emp => emp.employeeId != id);

    filteredEmployees = filteredEmployees.filter(emp => emp.employeeId != id);

    saveEmployees();

    populateDepartments();

    applyFilters();

});

// =====================================================
// View Employee
// =====================================================

document.addEventListener("click", function (e) {

    const viewButton = e.target.closest(".view-btn");

    if (!viewButton) return;

    const id = viewButton.dataset.id;

    const employee = employees.find(emp => emp.employeeId == id);

    if (!employee) return;

    alert(
`Employee Details

Name: ${employee.name}

Employee ID: ${employee.employeeId}

Position: ${employee.position}

Department: ${employee.department}

Salary: R${Number(employee.salary).toLocaleString()}

Email: ${employee.contact}`
    );

});

// =====================================================
// Pagination
// =====================================================

previousButton.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderTable();

    }

});

nextButton.addEventListener("click", () => {

    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

    if (currentPage < totalPages) {

        currentPage++;

        renderTable();

    }

});

// =====================================================
// Search & Filter Events
// =====================================================

searchInput.addEventListener("input", applyFilters);

departmentFilter.addEventListener("change", applyFilters);

// =====================================================
// Modal Reset
// =====================================================

document
    .getElementById("employeeModal")
    .addEventListener("hidden.bs.modal", resetForm);

// =====================================================
// Initial Page Load
// =====================================================

populateDepartments();

applyFilters();

renderTable();
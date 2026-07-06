function renderTable(employees, tBodyId) {
    const container = document.getElementById(tBodyId);
const tableRows = employees.map(emp => 
    `<tr>
        <td>${emp.employeeId}</td>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>${emp.department}</td>
        <td>${emp.salary.toLocaleString()}</td>
        <td><a href="mailto:${emp.contact}">${emp.contact}</a></td>
    </tr>`
).join('');

container.innerHTML = tableRows;}
renderTable(employees, "employee-table-body"
);

document.getElementById("search-input").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filtered = employees.filter(emp => 
        emp.name.toLowerCase().includes(query) ||
        emp.employeeId.toString().includes(query) ||
        emp.position.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
    );
    renderTable(filtered, "employee-table-body");
});

departmentFilter.addEventListener("change", function() {
    const selected = this.value;
    const filtered = selected === "" ? employees : employees.filter(emp => emp.department === selected);
    renderTable(filtered, "employee-table-body");
});

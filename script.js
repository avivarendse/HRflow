const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('hrflowTheme') || 'light';

function applyTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  document.body.classList.toggle('light-mode', theme === 'light');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-regular fa-moon"></i>';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('hrflowTheme', newTheme);
    applyTheme(newTheme);
  });
}

applyTheme(storedTheme);

const employees = [
  {name: 'Sibongile Nkosi', id: 'MT-1005', status: 'Present', in: '08:30', out: '17:30', initials: 'SN'},
  {name: 'Lungile Moyo', id: 'MT-1006', status: 'Absent', in: '–', out: '–', initials: 'LM'},
  {name: 'Thabo Molefe', id: 'MT-1007', status: 'Present', in: '08:45', out: '17:45', initials: 'TM'},
  {name: 'Kheshav Naidoo', id: 'MT-1008', status: 'On leave', in: '–', out: '–', initials: 'KN'},
  {name: 'Zanele Khumalo', id: 'MT-1009', status: 'Present', in: '08:55', out: '18:05', initials: 'ZK'},
];

const requestList = document.getElementById("requestList");

if (requestList) {

function displayLeaveRequests() {

    requestList.innerHTML = "";

    let pending = 0;
    let approved = 0;
    let rejected = 0;

    employees.forEach(employee => {

        if (!employee.leaveRequests) return;

        employee.leaveRequests.forEach(request => {

            const initials = employee.name
                .split(" ")
                .map(word => word[0])
                .join("");

            const card = document.createElement("div");

            card.className = "employee-card";

            card.innerHTML = `

            <div class="left">

                <div class="avatar">
                    ${initials}
                </div>

                <div>

                    <h3>${employee.name}</h3>

                    <p>${request.reason}</p>

                    <small>${request.date}</small>

                </div>

            </div>

            <div class="buttons">

                ${
                    request.status === "Pending"
                    ?

                    `<button class="reject">Reject</button>
                     <button class="approve">Approve</button>`

                    :

                    request.status === "Approved"

                    ?

                    `<span style="color:green;font-weight:bold;">Approved ✔</span>`

                    :

                    `<span style="color:red;font-weight:bold;">Rejected ✖</span>`

                }

            </div>

            `;

            requestList.appendChild(card);

            if(request.status === "Pending"){

                card.querySelector(".approve").onclick = () => {

                    request.status = "Approved";

                    displayLeaveRequests();

                }

                card.querySelector(".reject").onclick = () => {

                    request.status = "Rejected";

                    displayLeaveRequests();

                }

                pending++;

            }

            else if(request.status === "Approved"){

                approved++;

            }

            else{

                rejected++;

            }

        });

    });

    const pendingCount = document.getElementById("pendingCount");
    const approvedCount = document.getElementById("approvedCount");
    const rejectedCount = document.getElementById("rejectedCount");

    if (pendingCount) pendingCount.textContent = pending;
    if (approvedCount) approvedCount.textContent = approved;
    if (rejectedCount) rejectedCount.textContent = rejected;

}

displayLeaveRequests();

}

/*ATTENDANCE JS*/

// 1. Set today's date
document.getElementById('todayDate').textContent =
  new Date('2026-07-03').toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});

// 2. Chart.js Stacked Bar - no changes
const ctx = document.getElementById('trendChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Present', data: [90, 93, 88, 95, 91, 96], backgroundColor: '#2563eb', borderRadius: 4 },
      { label: 'On leave', data: [5, 3, 6, 3, 4, 2], backgroundColor: '#f59e0b', borderRadius: 4 },
      { label: 'Absent', data: [5, 4, 6, 2, 5, 2], backgroundColor: '#ef4444', borderRadius: 4 },
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    scales: { x: { stacked: true, grid:{display:false} }, y: { stacked: true, max: 100 } },
    plugins: { legend: { display: false } }
  }
});

// 4. DOM Manipulation for Table - this will now loop 9 people
const tbody = document.querySelector('#attendanceTable tbody');
tbody.innerHTML = ''; // clear first so we don't duplicate on refresh

employees.forEach(emp => {
  const tr = document.createElement('tr');

  let statusClass = 'green';
  let statusIcon = '✓';
  if(emp.status === 'On leave'){ statusClass = 'amber'; statusIcon = '◎'; }
  if(emp.status === 'Absent'){ statusClass = 'red'; statusIcon = '✕'; }

  tr.innerHTML = `
    <td><div class="emp"><div class="avatar-sm">${emp.initials}</div>${emp.name}</div></td>
    <td class="muted">${emp.id}</td>
    <td><span class="pill ${statusClass}">${statusIcon} ${emp.status}</span></td>
    <td>${emp.in}</td>
    <td>${emp.out}</td>
  `;
  tbody.appendChild(tr); // DOM manipulation
});

// 5. CSV Export - will now export all 9
document.getElementById('exportBtn').addEventListener('click', () => {
  let csv = 'Employee,ID,Status,Check-in,Check-out\n';
  employees.forEach(e => csv += `${e.name},${e.id},${e.status},${e.in},${e.out}\n`);
  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'attendance_2026-07-03.csv'; a.click();
  URL.revokeObjectURL(url);
});

// 6. Update the 4 stat cards to match new totals
const total = employees.length; // 9
const present = employees.filter(e => e.status === 'Present').length; // 6
const absent = employees.filter(e => e.status === 'Absent').length; // 1
const leave = employees.filter(e => e.status === 'On leave').length; // 2
const percent = Math.round((present/total)*100); // 67%

document.querySelectorAll('.stat-value')[0].textContent = present;
document.querySelectorAll('.stat-label')[0].textContent = `of ${total}`;
document.querySelectorAll('.stat-value')[1].textContent = absent;
document.querySelectorAll('.stat-value')[2].textContent = leave;
document.querySelectorAll('.stat-value')[3].textContent = `${percent}%`;
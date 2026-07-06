var employees = [
  {
    id: 1,
    name: "Sibongile Nkosi",
    position: "Software Engineer",
    department: "Development",
    salary: 70000,
    history: "Joined in 2015, promoted to Senior in 2018",
    contact: "sibongile.nkosi@moderntech.com",
    hoursWorked: 160,
    leaveDeductions: 8,
    finalSalary: 69500,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Absent",
      },
      {
        date: "2025-07-27",
        status: "Present",
      },
      {
        date: "2025-07-28",
        status: "Present",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2025-07-22",
        reason: "Sick Leave",
        status: "Approved",
      },
      {
        date: "2024-12-01",
        reason: "Personal",
        status: "Pending",
      },
    ],
  },
  {
    id: 2,
    name: "Lungile Moyo",
    position: "HR Manager",
    department: "HR",
    salary: 80000,
    history: "Joined in 2013, promoted to Manager in 2017",
    contact: "lungile.moyo@moderntech.com",
    hoursWorked: 150,
    leaveDeductions: 10,
    finalSalary: 79000,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Absent",
      },
      {
        date: "2025-07-28",
        status: "Present",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2025-07-15",
        reason: "Family Responsibility",
        status: "Denied",
      },
      {
        date: "2024-12-02",
        reason: "Vacation",
        status: "Approved",
      },
    ],
  },
  {
    id: 3,
    name: "Thabo Molefe",
    position: "Quality Analyst",
    department: "QA",
    salary: 55000,
    history: "Joined in 2018",
    contact: "thabo.molefe@moderntech.com",
    hoursWorked: 170,
    leaveDeductions: 4,
    finalSalary: 54800,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Present",
      },
      {
        date: "2025-07-28",
        status: "Absent",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2025-07-10",
        reason: "Medical Appointment",
        status: "Approved",
      },
      {
        date: "2024-12-05",
        reason: "Personal",
        status: "Pending",
      },
    ],
  },
  {
    id: 4,
    name: "Keshav Naidoo",
    position: "Sales Representative",
    department: "Sales",
    salary: 60000,
    history: "Joined in 2020",
    contact: "keshav.naidoo@moderntech.com",
    hoursWorked: 165,
    leaveDeductions: 6,
    finalSalary: 59700,
    attendance: [
      {
        date: "2025-07-25",
        status: "Absent",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Present",
      },
      {
        date: "2025-07-28",
        status: "Present",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2025-07-20",
        reason: "Bereavement",
        status: "Approved",
      },
    ],
  },
  {
    id: 5,
    name: "Zanele Khumalo",
    position: "Marketing Specialist",
    department: "Marketing",
    salary: 58000,
    history: "Joined in 2019",
    contact: "zanele.khumalo@moderntech.com",
    hoursWorked: 158,
    leaveDeductions: 5,
    finalSalary: 57850,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Absent",
      },
      {
        date: "2025-07-28",
        status: "Present",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2024-12-01",
        reason: "Childcare",
        status: "Pending",
      },
    ],
  },
  {
    id: 6,
    name: "Sipho Zulu",
    position: "UI/UX Designer",
    department: "Design",
    salary: 65000,
    history: "Joined in 2016",
    contact: "sipho.zulu@moderntech.com",
    hoursWorked: 168,
    leaveDeductions: 2,
    finalSalary: 64800,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Absent",
      },
      {
        date: "2025-07-28",
        status: "Present",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2025-07-18",
        reason: "Sick Leave",
        status: "Approved",
      },
    ],
  },
  {
    id: 7,
    name: "Naledi Moeketsi",
    position: "DevOps Engineer",
    department: "IT",
    salary: 72000,
    history: "Joined in 2017",
    contact: "naledi.moeketsi@moderntech.com",
    hoursWorked: 175,
    leaveDeductions: 3,
    finalSalary: 71800,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Present",
      },
      {
        date: "2025-07-28",
        status: "Absent",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2025-07-22",
        reason: "Vacation",
        status: "Pending",
      },
    ],
  },
  {
    id: 8,
    name: "Farai Gumbo",
    position: "Content Strategist",
    department: "Marketing",
    salary: 56000,
    history: "Joined in 2021",
    contact: "farai.gumbo@moderntech.com",
    hoursWorked: 160,
    leaveDeductions: 0,
    finalSalary: 56000,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Absent",
      },
      {
        date: "2025-07-27",
        status: "Present",
      },
      {
        date: "2025-07-28",
        status: "Present",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2024-12-02",
        reason: "Medical Appointment",
        status: "Approved",
      },
    ],
  },
  {
    id: 9,
    name: "Karabo Dlamini",
    position: "Accountant",
    department: "Finance",
    salary: 62000,
    history: "Joined in 2018",
    contact: "karabo.dlamini@moderntech.com",
    hoursWorked: 155,
    leaveDeductions: 5,
    finalSalary: 61500,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Present",
      },
      {
        date: "2025-07-28",
        status: "Absent",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2025-07-19",
        reason: "Childcare",
        status: "Denied",
      },
    ],
  },
  {
    id: 10,
    name: "Fatima Patel",
    position: "Customer Support Lead",
    department: "Support",
    salary: 58000,
    history: "Joined in 2016",
    contact: "fatima.patel@moderntech.com",
    hoursWorked: 162,
    leaveDeductions: 4,
    finalSalary: 57750,
    attendance: [
      {
        date: "2025-07-25",
        status: "Present",
      },
      {
        date: "2025-07-26",
        status: "Present",
      },
      {
        date: "2025-07-27",
        status: "Absent",
      },
      {
        date: "2025-07-28",
        status: "Present",
      },
      {
        date: "2025-07-29",
        status: "Present",
      },
    ],
    leaveRequests: [
      {
        date: "2024-12-03",
        reason: "Vacation",
        status: "Pending",
      },
    ],
  },
];

var select = document.getElementById("empSelect");
employees.forEach(function (emp, i) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.textContent = emp.name + " \u00B7 EMP-" + emp.id;
  select.appendChild(opt);
});

function formatMoney(n) {
  var rounded = Math.round(n);
  return "ZAR" + rounded.toLocaleString("en-SA");
}

function initials(name) {
  return name
    .split(" ")
    .map(function (p) {
      return p[0];
    })
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function loadEmployee() {
  var emp = employees[parseInt(select.value, 10) || 0];
  document.getElementById("monthlyBase").value = Math.round(emp.salary / 12);
  document.getElementById("hoursWorked").value = emp.hoursWorked;
  document.getElementById("leaveHours").value = emp.leaveDeductions;
  document.getElementById("bonus").value = 0;
  document.getElementById("taxRate").value = 18;

  document.getElementById("psName").textContent = emp.name;
  document.getElementById("psId").textContent = "EMP-" + emp.id;
  document.getElementById("psPosition").textContent = emp.position;
  document.getElementById("psDept").textContent = emp.department;
  document.getElementById("psContact").textContent = emp.contact;
  document.getElementById("psHistory").textContent = emp.history;
  document.getElementById("refSalary").textContent = formatMoney(
    emp.finalSalary,
  );
  document.getElementById("chipSalary").textContent = formatMoney(emp.salary);
  document.getElementById("crumbName").textContent = emp.name;
  document.getElementById("userAvatar").textContent = initials(emp.name);

  var attList = document.getElementById("attList");
  attList.innerHTML = "";
  emp.attendance.forEach(function (a) {
    var row = document.createElement("div");
    row.className = "att-row";
    row.innerHTML =
      '<span class="att-date">' +
      a.date +
      '</span><span class="status-pill ' +
      a.status.toLowerCase() +
      '">' +
      a.status +
      "</span>";
    attList.appendChild(row);
  });

  var leaveList = document.getElementById("leaveList");
  leaveList.innerHTML = "";
  if (emp.leaveRequests.length === 0) {
    leaveList.innerHTML =
      '<div class="att-row"><span class="leave-reason">No leave requests on file</span></div>';
  } else {
    emp.leaveRequests.forEach(function (l) {
      var row = document.createElement("div");
      row.className = "att-row";
      row.innerHTML =
        '<span class="leave-reason">' +
        l.reason +
        '<br><span class="att-date">' +
        l.date +
        '</span></span><span class="status-pill ' +
        l.status.toLowerCase() +
        '">' +
        l.status +
        "</span>";
      leaveList.appendChild(row);
    });
  }

  calculate();
}

function calculate() {
  var monthlyBase =
    parseFloat(document.getElementById("monthlyBase").value) || 0;
  var hoursWorked =
    parseFloat(document.getElementById("hoursWorked").value) || 0;
  var leaveHours = parseFloat(document.getElementById("leaveHours").value) || 0;
  var bonus = parseFloat(document.getElementById("bonus").value) || 0;
  var taxRate = parseFloat(document.getElementById("taxRate").value) || 0;

  var standardHours = 160;
  var hourlyRate = monthlyBase / standardHours;
  var leaveDeductionAmt = leaveHours * hourlyRate;

  var gross = monthlyBase + bonus;
  var tax = gross * (taxRate / 100);
  var net = gross - tax - leaveDeductionAmt;

  document.getElementById("netFigure").textContent = formatMoney(net);

  document.getElementById("psBase").textContent = formatMoney(monthlyBase);
  document.getElementById("psBonus").textContent = formatMoney(bonus);
  document.getElementById("psGross").textContent = formatMoney(gross);

  document.getElementById("psLeaveLabel").textContent =
    "Leave (" + leaveHours + " hrs)";
  document.getElementById("psLeave").textContent =
    formatMoney(leaveDeductionAmt);
  document.getElementById("psTaxLabel").textContent =
    "Income tax (" + taxRate + "%)";
  document.getElementById("psTax").textContent = formatMoney(tax);
  document.getElementById("psNet").textContent = formatMoney(net);

  document.getElementById("chipHours").textContent = hoursWorked;
}

function buildReceiptData(emp, values) {
  var monthlyBase =
    values && values.monthlyBase !== undefined
      ? values.monthlyBase
      : Math.round(emp.salary / 12);
  var hoursWorked =
    values && values.hoursWorked !== undefined
      ? values.hoursWorked
      : emp.hoursWorked;
  var leaveHours =
    values && values.leaveHours !== undefined
      ? values.leaveHours
      : emp.leaveDeductions;
  var bonus = values && values.bonus !== undefined ? values.bonus : 0;
  var taxRate = values && values.taxRate !== undefined ? values.taxRate : 18;
  var standardHours = 160;
  var hourlyRate = monthlyBase / standardHours;
  var leaveDeductionAmt = leaveHours * hourlyRate;
  var gross = monthlyBase + bonus;
  var tax = gross * (taxRate / 100);
  var net = gross - tax - leaveDeductionAmt;

  return {
    monthlyBase: monthlyBase,
    hoursWorked: hoursWorked,
    leaveHours: leaveHours,
    bonus: bonus,
    taxRate: taxRate,
    gross: gross,
    tax: tax,
    net: net,
    leaveDeductionAmt: leaveDeductionAmt,
  };
}

function buildReceiptMarkup(emp, data) {
  return (
    "" +
    '<section class="receipt-print-card">' +
    "  <h2>" +
    emp.name +
    "</h2>" +
    "  <p>" +
    emp.position +
    " · " +
    emp.department +
    "</p>" +
    '  <div class="receipt-print-row"><span>Base pay</span><strong>' +
    formatMoney(data.monthlyBase) +
    "</strong></div>" +
    '  <div class="receipt-print-row"><span>Bonus</span><strong>' +
    formatMoney(data.bonus) +
    "</strong></div>" +
    '  <div class="receipt-print-row total"><span>Gross</span><strong>' +
    formatMoney(data.gross) +
    "</strong></div>" +
    '  <div class="receipt-print-row"><span>Leave (' +
    data.leaveHours +
    " hrs)</span><strong>- " +
    formatMoney(data.leaveDeductionAmt) +
    "</strong></div>" +
    '  <div class="receipt-print-row"><span>Income tax (' +
    data.taxRate +
    "%)</span><strong>- " +
    formatMoney(data.tax) +
    "</strong></div>" +
    '  <div class="receipt-print-row total"><span>Net pay</span><strong>' +
    formatMoney(data.net) +
    "</strong></div>" +
    "</section>"
  );
}

function openReceiptPrint(mode) {
  var printWindow = window.open("", "_blank", "width=900,height=800");
  if (!printWindow) {
    alert("Please allow pop-ups so the receipts can be printed.");
    return;
  }

  var sections = [];
  if (mode === "single") {
    var activeEmployee = employees[parseInt(select.value, 10) || 0];
    var currentValues = {
      monthlyBase:
        parseFloat(document.getElementById("monthlyBase").value) || 0,
      hoursWorked:
        parseFloat(document.getElementById("hoursWorked").value) || 0,
      leaveHours: parseFloat(document.getElementById("leaveHours").value) || 0,
      bonus: parseFloat(document.getElementById("bonus").value) || 0,
      taxRate: parseFloat(document.getElementById("taxRate").value) || 0,
    };
    sections.push(
      buildReceiptMarkup(
        activeEmployee,
        buildReceiptData(activeEmployee, currentValues),
      ),
    );
  } else {
    employees.forEach(function (emp) {
      sections.push(buildReceiptMarkup(emp, buildReceiptData(emp)));
    });
  }

  var html =
    "<!DOCTYPE html><html><head><title>Payroll receipts</title><style>" +
    "body{font-family: Arial, sans-serif; margin:24px; color:#1c2624; background:#fff;}" +
    ".receipt-print-card{border:1px solid #e9e6de; border-radius:14px; padding:20px; margin:0 0 18px; page-break-inside:avoid;}" +
    "h2{margin:0 0 4px; font-size:20px;}" +
    "p{margin:0 0 12px; color:#7c8b88;}" +
    ".receipt-print-row{display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0ece4; font-size:14px;}" +
    ".receipt-print-row.total{font-weight:700; border-bottom:none; padding-top:10px;}" +
    "@media print{body{margin:0;} .receipt-print-card{box-shadow:none;}}" +
    "</style></head><body><h1>Payroll receipts</h1>" +
    sections.join("") +
    "</body></html>";

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

["monthlyBase", "hoursWorked", "leaveHours", "bonus", "taxRate"].forEach(
  function (id) {
    document.getElementById(id).addEventListener("input", calculate);
  },
);
select.addEventListener("change", loadEmployee);

var runBatchBtn = document.getElementById("runBatchBtn");
var printModal = document.getElementById("printModal");
var printCancelBtn = document.getElementById("printCancel");

function closePrintModal() {
  if (printModal) {
    printModal.classList.add("hidden");
    printModal.setAttribute("aria-hidden", "true");
  }
}

function openPrintModal() {
  if (printModal) {
    printModal.classList.remove("hidden");
    printModal.setAttribute("aria-hidden", "false");
  }
}

if (runBatchBtn) {
  runBatchBtn.addEventListener("click", openPrintModal);
}

if (printCancelBtn) {
  printCancelBtn.addEventListener("click", closePrintModal);
}

if (printModal) {
  printModal.addEventListener("click", function (e) {
    if (e.target === printModal) {
      closePrintModal();
    }
  });
}

document.querySelectorAll(".print-choice").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var choice = btn.getAttribute("data-choice");
    closePrintModal();
    openReceiptPrint(choice);
  });
});

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const storedTheme = localStorage.getItem("hrflow-theme") || "light";
  document.body.setAttribute("data-theme", storedTheme);
  themeToggle.textContent = storedTheme === "dark" ? "☀" : "☾";

  themeToggle.addEventListener("click", function () {
    const nextTheme =
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("hrflow-theme", nextTheme);
    themeToggle.textContent = nextTheme === "dark" ? "☀" : "☾";
  });
}

loadEmployee();

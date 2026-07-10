# HRFlow — HR Management System

A front-end HR web application built for **ModernTech Solutions**, addressing the
pain points outlined in the Module 1 Core Project brief: scattered employee
spreadsheets, email-based leave requests, manual payroll spreadsheets, and
performance reviews buried in Word documents.

This is a **front-end only** proof of concept. There is no server or database —
all data is dummy data defined in one JavaScript file and manipulated entirely
in the browser, as required by the brief.

---

## Getting Started

No build step or install required.

1. Unzip the project.
2. Open `index.html` in a browser (or serve the folder with any static server,
   e.g. `python3 -m http.server` from inside the project folder).
3. Sign in with **any** username and password — this is a demo login, not real
   authentication.

You'll land on the Dashboard after signing in.

---

## Project Structure

```
HRFlow/
├── index.html          Login page (opening page of the app)
├── dashboard.html       Overview stats + recent activity
├── employees.html       Searchable / filterable employee directory
├── payroll.html         Payslip calculator, receipts, attendance & leave panel
├── attendance.html      Daily attendance log + CSV export
├── leave.html            Leave request list + new request form
├── performance.html     Ratings, quarterly scores, goals, review notes
├── reports.html          Charts, searchable report table, CSV export
├── settings.html         Company info + dark mode toggle
├── css/
│   └── style.css         The ONE stylesheet used by every page
└── js/
    └── app.js             The ONE script used by every page
```

Every page links the same `css/style.css` and `js/app.js` — there are no
per-page stylesheets or scripts, so a style or data change made once applies
everywhere automatically.

---

## How `js/app.js` Is Organized

The file is split into clearly labeled sections, in this order:

1. **Dummy Data** — a single `HR_DATA` object (employees, attendance, leave
   requests, payroll figures, performance reviews). Every page reads from
   this same object, so numbers always match across pages.
2. **Login / Auth** — a simple check: if you're not logged in and you're not
   on the login page, you get sent back to it.
3. **Theme (Dark Mode)** — one function keeps every page's dark/light mode in
   sync via `localStorage`.
4. **Sidebar & Clock** — shared sidebar collapse/expand and the live topbar
   clock.
5. **Page Scripts** — one small function per page (`initDashboardPage`,
   `initPayrollPage`, etc.). Each function checks whether its page's elements
   exist before doing anything, which is what makes it safe to load the same
   `app.js` on every page.

No frameworks, build tools, or advanced JavaScript patterns are used —
plain functions, `document.getElementById`, and simple loops throughout, so
the code is easy to read and modify.

---

## Feature Overview

| Page | What it does |
|---|---|
| **Login** | Dummy sign-in (any credentials), remember-me, redirects to Dashboard |
| **Dashboard** | Live counts pulled from `HR_DATA`: total employees, payroll processed, pending leave requests, attendance rate |
| **Employees** | Search + department filter + pagination over the employee list |
| **Payroll** | Prorated pay based on hours worked, tax and leave deductions, printable payslip receipts (single or all employees) |
| **Attendance** | Today's status per employee, present/absent/on-leave counts, CSV export |
| **Leave** | List of all leave requests with status, plus a demo request form |
| **Performance** | Star rating, quarterly score bar chart, goal progress bars, manager review note |
| **Reports** | Attendance and department charts (Chart.js), searchable employee table, CSV export |
| **Settings** | Company name/email (saved to `localStorage`), dark mode toggle |

Dark mode, once toggled from Settings (or the sun/moon icon in the topbar),
applies to the entire site immediately and stays applied across page loads
and browser tabs.

---

## Technologies Used

- HTML5 / CSS3 (one shared stylesheet, custom properties for theming)
- Vanilla JavaScript (no framework)
- [Bootstrap 5](https://getbootstrap.com/) for grid/utility classes and components
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/) — used only on the Reports page
- `localStorage` — remembers login state, dark mode, and settings between visits

---

## Known Limitations (by design)

- This is a front-end demo — nothing is saved to a real database. Refreshing
  after adding a leave request, for example, resets it, since there's no
  back end to persist it to.
- Login accepts any non-empty username/password — it's a UI demonstration of
  an auth flow, not real authentication.
- Payroll and performance figures are dummy data for demonstration purposes,
  not real employee records.

---

## Credits

Built as part of the Life Choices Academy Module 1 Core Project —
*Case Study: ModernTech Solutions*.

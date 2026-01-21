import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* ---------------- ELEMENTS ---------------- */

const calendar = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const selectedDateText = document.getElementById("selectedDate");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

const logoutBtn = document.getElementById("logout");
const themeToggle = document.getElementById("themeToggle");

const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

/* ---------------- AUTH PROTECTION ---------------- */

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

/* ---------------- CALENDAR ---------------- */

let currentDate = new Date();

function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.textContent = day;

    const dateKey = `${year}-${month + 1}-${day}`;

    dayDiv.onclick = () => {
      document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
      dayDiv.classList.add("selected");
      selectedDateText.textContent = "📅 " + dateKey;
    };

    calendar.appendChild(dayDiv);
  }
}

prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

/* ---------------- SIDEBAR ---------------- */

navButtons.forEach(btn => {
  btn.onclick = () => {
    const target = btn.dataset.section;
    sections.forEach(sec => {
      sec.style.display = sec.id === target ? "block" : "none";
    });
  };
});

sections.forEach((sec, i) => {
  sec.style.display = i === 0 ? "block" : "none";
});

/* ---------------- THEME ---------------- */

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
};

/* ---------------- LOGOUT ---------------- */

logoutBtn.onclick = () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

renderCalendar();

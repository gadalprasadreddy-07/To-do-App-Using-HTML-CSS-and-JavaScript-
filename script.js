document.addEventListener("DOMContentLoaded", () => {
  // LOGIN LOGIC
  const loginForm = document.getElementById("login-form");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  const loginSection = document.getElementById("login-section");
  const todoSection = document.getElementById("todo-section");
  const usernameDisplay = document.getElementById("username-display");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const password = passwordField.value;

    let isValid = true;

    if (name === "") {
      nameError.textContent = "Name is required.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

    if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (isValid) {
      alert("Login Complete");
      loginSection.classList.add("hidden");
      todoSection.classList.remove("hidden");
      usernameDisplay.textContent = `Welcome, ${name.toUpperCase()}!`;
    }
  });

  // TO-DO LIST LOGIC
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (!task) return;

    const li = document.createElement("li");
    li.textContent = task;

    const icons = document.createElement("div");
    icons.classList.add("task-icons");

    const done = document.createElement("span");
    done.innerHTML = "✔️";
    done.addEventListener("click", () => {
      li.classList.toggle("done");

      const animation = document.getElementById("completion-animation");
      animation.classList.remove("hidden");

      // Reset animation for repeat triggering
      animation.style.animation = "none";
      void animation.offsetWidth; // Reflow trick
      animation.style.animation = "";

      setTimeout(() => {
        animation.classList.add("hidden");
      }, 3000);
    });

    const del = document.createElement("span");
    del.innerHTML = "❌";
    del.addEventListener("click", () => {
      li.remove();
    });

    icons.appendChild(done);
    icons.appendChild(del);

    li.appendChild(icons);
    todoList.appendChild(li);
    todoInput.value = "";
  });

  // LIVE DATE & TIME
  // LIVE DATE & TIME
  function updateClock() {
    const now = new Date();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    document.getElementById("current-date").textContent =
      now.toLocaleDateString(undefined, dateOptions);
    document.getElementById("current-time").textContent =
      now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  // INTERACTIVE CALENDAR
  const calendarGrid = document.getElementById("calendar-grid");
  const calendarMonthYear = document.getElementById("calendar-month-year");
  let currentDate = new Date();

  function renderCalendar(date) {
    calendarGrid.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const startDay = startDate.getDay();
    const totalDays = endDate.getDate();

    const monthName = date.toLocaleString("default", { month: "long" });
    calendarMonthYear.textContent = `${monthName} ${year}`;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach((day) => {
      const div = document.createElement("div");
      div.className = "header";
      div.textContent = day;
      calendarGrid.appendChild(div);
    });

    for (let i = 0; i < startDay; i++) {
      const div = document.createElement("div");
      calendarGrid.appendChild(div);
    }

    for (let day = 1; day <= totalDays; day++) {
      const div = document.createElement("div");
      div.textContent = day;

      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        div.classList.add("today");
      }

      calendarGrid.appendChild(div);
    }
  }

  document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
// 🌙 Theme Toggle Logic
const toggle = document.getElementById("theme-switch");
const themeLabel = document.getElementById("theme-label");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  themeLabel.textContent = toggle.checked ? "🌙 Dark Mode" : "☀️ Light Mode";
});
      

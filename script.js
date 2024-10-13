"use strict";

const todayDay = document.querySelector(".date-day");
const todayDate = document.querySelector(".date");
const presentDate = document.querySelector(".present-date");
const presentMonth = document.querySelector(".presnt-month");
const inviteBtn = document.querySelector(".invite-btn");
const intiteContent = document.querySelector(".section-addtask");
const addTaskContent = document.querySelector(".dashTask");
const dashTaskContent = document.querySelector(".dashTask");
const homeContainer = document.querySelector(".home-container");
const inviteBackBtn = document.querySelector(".addtask-btn");
const addTaskBackBtn = document.querySelector(".dashtask-btn");
const dashboardAddTaskBtn = document.querySelector(".add-task");
const createCategory = document.querySelector(".create-category-container");
const categoryMainDisplay = document.querySelector(".categories-container");
const addCategoryBtn = document.querySelector(".addcategory");
const backBtnCategory = document.querySelector(".create-category-backbtn");
const overlay = document.querySelector(".overlay");

//! SECTIONS
const dashboardCont = document.querySelector(".section-dashboard");
const VitalCont = document.querySelector(".section-vitals");

//! ASIDES BUTTONS
const dashboardBtn = document.querySelector(".dashboardbtn");
const buttons = document.querySelectorAll(".btn-container");
const contents = document.querySelectorAll(".content");

//? REGISTRATION
const registrationContainer = document.querySelector(".registration-container");

// Sign Up data
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("userName");
const usernameInput = document.getElementById("userName");
const useremailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confPasswordInput = document.getElementById("confPassword");
const signInCheck = document.getElementById("sign_in_check");
const signUpForm = document.getElementById("form_signup");

// sign in data
const signInUserNameInput = document.getElementById("userName");
const signInPasswordInput = document.getElementById("password");
const logInBtn = document.getElementById("login");

function saveUserInfo(name, username, email) {
  localStorage.setItem("name", name);
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("isLoggedIn", "true");
}

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = useremailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const confPassword = confPasswordInput.value;

  const fullName = `${firstName} ${lastName}`;

  if (password !== confPassword) {
    alert("Password do not match! Please try again");
    return;
  }

  if (!signInCheck.checked) {
    alert("Please accept our terms by clicking on the checkbox");
    return;
  }

  saveUserInfo(fullName, username, email);
  getUserInfo();

  registrationContainer.classList.add("hidden");
  document.querySelector(".home-container").classList.add("active");
});

function getUserInfo() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    registrationContainer.classList.add("hidden");
    document.querySelector(".home-container").classList.add("active");
  } else {
    registrationContainer.classList.remove("hidden");
    document.querySelector(".home-container").classList.remove("active");
  }

  const name = localStorage.getItem("name");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (name) {
    document.querySelector(".dashboard-name").textContent = name;
    document.querySelector(".dashboard-email").textContent = email;
    document.querySelector(".user-name").textContent = username;
  }
}

window.onload = getUserInfo;

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("username");
  localStorage.removeItem("email");

  firstNameInput.value = "";
  lastNameInput.value = "";
  useremailInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
  confPasswordInput.value = "";
  signInCheck.checked = false;

  registrationContainer.classList.remove("hidden");
  document.querySelector(".home-container").classList.remove("active");
}

//logout
document.getElementById("log_out_btn").addEventListener("click", logout);

const swapToSignin = document.querySelector(".sigin-text");
const swapToSignUp = document.querySelector(".signup-text");
const signupContainer = document.querySelector(".container-signup");
const siginContainer = document.querySelector(".container-signin");

swapToSignin.addEventListener("click", () => {
  signupContainer.classList.add("content");
  siginContainer.classList.add("category");
});

swapToSignUp.addEventListener("click", () => {
  siginContainer.classList.remove("category");
  signupContainer.classList.add("category");
});

//? DEFAULT DISPLAY
dashboardCont.classList.add("active");
dashboardBtn.classList.add("active");

//? Dashboard Date
const date = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayName = daysOfWeek[date.getDay()];
todayDay.textContent = dayName;

const day = date.getDate().toString();
const month = monthNames[date.getMonth()];
// const month = (date.getMonth() + 1).toString();
// const year = date.getFullYear();
// todayDate.textContent = `${day}/${month.padStart(2, "0")}/${year}`;

todayDate.textContent = date.toLocaleDateString();
presentDate.textContent = day.padStart(2, "0");
presentMonth.textContent = month;

/*
//? PROGRESS on TASK Container
document.querySelectorAll(".circle-progress").forEach((circle) => {
  const progress = circle.getAttribute("data-progress");
  const circumference = 2 * Math.PI * 40; // 2πr, where r is 40 (radius of circle)

  // Update the circle stroke based on progress
  const progressCircle = circle.querySelector(".progress");
  const offset = circumference - (progress / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
});

//? ASIDES CONTAINER
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    contents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");

    const targetData = button.getAttribute("data-target");

    document.getElementById(targetData).classList.add("active");
  });
});

//? INVITE BUTTON
inviteBtn.addEventListener("click", () => {
  inviteBtn.classList.add("inviteBtn");
  overlay.classList.remove("hidden");
  intiteContent.classList.add("active");
  homeContainer.classList.add("aside-index");
});

inviteBackBtn.addEventListener("click", () => {
  inviteBtn.classList.remove("inviteBtn");
  overlay.classList.add("hidden");
  intiteContent.classList.remove("active");
  homeContainer.classList.remove("aside-index");
});

//? DASHBOARD ADD TASK
function closeAddTask() {
  inviteBtn.classList.remove("inviteBtn");
  overlay.classList.add("hidden");
  addTaskContent.classList.remove("active");
  homeContainer.classList.remove("aside-index");
}

dashboardAddTaskBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  homeContainer.classList.add("aside-index");
  dashTaskContent.classList.add("active");
});

addTaskBackBtn.addEventListener("click", () => {
  // inviteBtn.classList.remove("inviteBtn");
  // overlay.classList.add("hidden");
  // addTaskContent.classList.remove("active");
  // homeContainer.classList.remove("aside-index");

  closeAddTask();
});

//? TASK CATEGORY
addCategoryBtn.addEventListener("click", () => {
  categoryMainDisplay.classList.add("content");
  createCategory.classList.add("category");
});

backBtnCategory.addEventListener("click", () => {
  categoryMainDisplay.classList.add("category");
  createCategory.classList.remove("category");
});

//! Adding a task in the card of the dashboard
function getCurrentDate(currentDate) {
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
}

function addTask(title, date, priority, textDescription, projectLink) {
  const todoList = document.getElementById("toda-list");
  const taskId = Date.now();

  const card = document.createElement("div");
  card.classList.add("card", "todo-card");
  card.dataset.id = taskId;

  card.innerHTML = `
    <header class="card-header flex">
      <ion-icon name="ellipse-outline" class="card-title-icon"></ion-icon>

      <button class="btn-option">
        <ion-icon name="ellipsis-horizontal-outline" class="option-icon"></ion-icon>
      </button>

      <div class="option-action hidden">
        <div class="inner-option-container">
          <button class="option-btn vital">Vital</button>
          <button class="option-btn edit">Edit</button>
          <button class="option-btn delete">Delete</button>
          <button class="option-btn finish">Finish</button>
        </div>
      </div>
    </header>

    <p class="card-title-text">${title}</p>

    <div class="card-body flex">
      <p>${textDescription}</p>
      
      <img src="./img/user2.jpg" alt="" class="card-image" />
    </div>

    <div class="card-status flex">
      <p class="card-level">
        Priority: <span class="level">${priority}</span>
      </p>
                        
      <p class="card-start">
        Status: <span class="start">Not Started</span>
      </p>
                        
      <p class="created-on">
        Created on: <span class="created">${date}</span>
      </p>
    </div>
  `;

  // option button in the card
  const optionBtn = card.querySelector(".btn-option");
  const actionOption = card.querySelector(".option-action");

  optionBtn.addEventListener("click", () => {
    actionOption.classList.toggle("hidden");
  });

  actionOption.querySelector(".vital").addEventListener("click", () => {
    // Code here will send the card to the vital section
    console.log("vital button click");
    actionOption.classList.add("hidden");
  });

  actionOption.querySelector(".edit").addEventListener("click", () => {
    // Code here will pop up the add task window and display the same information for editing
    console.log("edit button click");
    actionOption.classList.add("hidden");
  });

  actionOption.querySelector(".delete").addEventListener("click", () => {
    // Deleting that card
    const taskId = card.dataset.id;
    card.remove();
    actionOption.classList.add("hidden");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const upDatedTask = tasks.filter((task) => task.id !== Number(taskId));
    localStorage.setItem("tasks", JSON.stringify(upDatedTask));
  });

  actionOption.querySelector(".finish").addEventListener("click", () => {
    // will disply the card in the complete section and the format it in different form
    console.log("are you sure the task is completed");
    actionOption.classList.add("hidden");
  });

  todoList.appendChild(card);
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || []);
  tasks.forEach((task) => {
    addTask(
      task.title,
      task.date,
      task.priority,
      task.textDescription,
      task.projectLink
    );
  });
}

function saveTask(title, date, priority, textDescription, projectLink) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskId = Date.now();
  tasks.push({
    id: taskId,
    title,
    date,
    priority,
    textDescription,
    projectLink,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const priority =
    document.querySelector('input[name="priority"]:checked')?.value || "Low";
  const textDescription = document.getElementById("description").value.trim();
  const projectLink = document.getElementById("taskProjectLink");

  if (title && date && textDescription) {
    const userDate = new Date(date);
    const formatDate = getCurrentDate(userDate);

    addTask(title, formatDate, priority, textDescription, projectLink);
    saveTask(title, formatDate, priority, textDescription, projectLink);

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDate").value = "";
    document.querySelector('input[name="priority"]:checked').checked = false;
    document.getElementById("description").value = "";
    // document.getElementById("taskProjectLink");
    closeAddTask();
  } else {
    closeAddTask();
  }
});

window.onload = loadTask;
*/

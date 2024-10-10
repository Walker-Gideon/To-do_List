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

//! REGISTRATION
const swapToSignin = document.querySelector(".sigin-text");
const swapToSignUp = document.querySelector(".signup-text");
const signupContainer = document.querySelector(".container-signup");
const siginContainer = document.querySelector(".container-signin");

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
dashboardAddTaskBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  homeContainer.classList.add("aside-index");
  dashTaskContent.classList.add("active");
});

addTaskBackBtn.addEventListener("click", () => {
  inviteBtn.classList.remove("inviteBtn");
  overlay.classList.add("hidden");
  addTaskContent.classList.remove("active");
  homeContainer.classList.remove("aside-index");
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

//? REGISTRATION
swapToSignin.addEventListener("click", () => {
  siginContainer.classList.add("activereg");
  // siginContainer.classList.remove("contentreg");

  signupContainer.classList.add("contentreg");
  // signupContainer.classList.remove("activereg");
});

swapToSignUp.addEventListener("click", () => {
  siginContainer.classList.remove("activereg");
  // siginContainer.classList.add("contentreg");

  signupContainer.classList.add("activereg");
  // signupContainer.classList.remove("contentreg");
});

//! Adding a task in the card of the dashboard

function getCurrentDate() {
  const currentDate = new Date();
  return `${currentDate.getDate().toString().padStart(2, "0")}/${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;
}

function closeAddTask() {
  inviteBtn.classList.remove("inviteBtn");
  overlay.classList.add("hidden");
  addTaskContent.classList.remove("active");
  homeContainer.classList.remove("aside-index");
}

function addTask(title, date, priority, textDescription, projectLink) {
  const todoList = document.getElementById("toda-list");

  const card = document.createElement("div");
  card.classList.add("card", "todo-card");

  card.innerHTML = `
    <header class="card-header flex">
      <ion-icon name="ellipse-outline" class="card-title-icon"></ion-icon>

      <button class="btn-option">
        <ion-icon name="ellipsis-horizontal-outline" class="option-icon"></ion-icon>
      </button>
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
        Created on: <span class="created">${getCurrentDate(date)}</span>
      </p>
    </div>
  `;

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
  tasks.push({ title, date, priority, textDescription, projectLink });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const priority =
    document.querySelector('input[name="priority"]:checked')?.value || "Low";
  const textDescription = document.getElementById("description").value.trim();
  const projectLink = document.getElementById("taskProjectLink");

  if (title || date || textDescription || projectLink) {
    addTask(title, date, priority, textDescription, projectLink);
    saveTask(title, date, priority, textDescription, projectLink);

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDate").value = "";
    document.querySelector('input[name="priority"]:checked').checked = false;
    document.getElementById("description").value = "";
    document.getElementById("taskProjectLink");
    closeAddTask();
  } else {
    closeAddTask();
  }
});

// window.onload = loadTask;

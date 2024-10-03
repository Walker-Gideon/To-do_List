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
const overlay = document.querySelector(".overlay");

//! SECTIONS
const dashboardCont = document.querySelector(".section-dashboard");
const VitalCont = document.querySelector(".section-vitals");

//! ASIDES BUTTONS
const dashboardBtn = document.querySelector(".dashboardbtn");
const buttons = document.querySelectorAll(".btn-container");
const contents = document.querySelectorAll(".content");

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

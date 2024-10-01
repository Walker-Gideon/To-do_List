"use strict";

const todayDay = document.querySelector(".date-day");
const todayDate = document.querySelector(".date");
const presentDate = document.querySelector(".present-date");
const presentMonth = document.querySelector(".presnt-month");
const overlay = document.querySelector(".overlay");

//! SECTIONS
const dashboardCont = document.querySelector(".section-dashboard");
const VitalCont = document.querySelector(".section-vitals");

//! ASIDES BUTTONS
const buttons = document.querySelectorAll(".btn-container");
const contents = document.querySelectorAll(".content");

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

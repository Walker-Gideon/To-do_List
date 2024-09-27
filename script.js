"use strict";

const todayDay = document.querySelector(".date-day");
const todayDate = document.querySelector(".date");

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

const dayName = daysOfWeek[date.getDay()];
todayDay.textContent = dayName;

// const day = date.getDate();
// const month = (date.getMonth() + 1).toString();
// const year = date.getFullYear();
// todayDate.textContent = `${day}/${month.padStart(2, "0")}/${year}`;

todayDate.textContent = date.toLocaleDateString();

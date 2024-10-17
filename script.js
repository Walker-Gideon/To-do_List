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
const dashboardBtn = document.querySelector(".dashboardbtn");
const buttons = document.querySelectorAll(".btn-container");
const contents = document.querySelectorAll(".content");

//? REGISTRATION
const registrationContainer = document.querySelector(".registration-container");

//* For my coding purpose I  place it here
dashboardCont.classList.add("active");
dashboardBtn.classList.add("active");

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

  //? DEFAULT DISPLAY
  dashboardCont.classList.add("active");
  dashboardBtn.classList.add("active");
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

//? Re-Usiable
function showAddTask() {
  overlay.classList.remove("hidden");
  homeContainer.classList.add("aside-index");
  dashTaskContent.classList.add("active");
}

function addContentToTask(title, textDescription, date) {
  document.querySelector("#taskTitle").value = title;
  document.querySelector("#description").value = textDescription;
  document.querySelector("#taskDate").value = date;
}

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

//? ASIDES BUTTONS

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    contents.forEach((content) => content.classList.remove("active"));
    document.querySelector(".home-container").classList.add("active");

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

//? TASK CATEGORY
function showCategory() {
  categoryMainDisplay.classList.add("content");
  createCategory.classList.add("category");
}
function hideCategory() {
  categoryMainDisplay.classList.add("category");
  createCategory.classList.remove("category");
}
addCategoryBtn.addEventListener("click", showCategory);
backBtnCategory.addEventListener("click", hideCategory);

//! Adding a task in the card of the dashboard
const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    checkboxes.forEach((otherCheck) => {
      if (otherCheck !== checkbox) {
        otherCheck.checked = false;
      }
    });
  });
});

function getCurrentDate(currentDate) {
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
}

function addTask(title, date, priority, textDescription, taskImage) {
  const todoList = document.getElementById("toda-list");
  const taskId = Date.now();

  let priorityColor;
  let ellipseColor;
  if (priority === "Extreme") {
    priorityColor = "#f21e1e";
    ellipseColor = "#f21e1e";
  } else if (priority === "Moderate") {
    priorityColor = "#42ade2";
    ellipseColor = "#42ade2";
  } else if (priority === "Low") {
    priorityColor = "#04c400";
    ellipseColor = "#04c400";
  }

  const card = document.createElement("div");
  card.classList.add("card", "todo-card");
  card.dataset.id = taskId;

  card.innerHTML = `
    <header class="card-header flex">
      <ion-icon name="ellipse-outline" class="card-title-icon" style="color: ${ellipseColor};"></ion-icon>

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

    <div class="card-body grid">
      <p>${textDescription}</p>
      
      <img src="./img/user2.jpg" alt="" class="card-image" />
    </div>

    <div class="card-status flex">
      <p class="card-level">
        Priority: <span class="level" style="color: ${priorityColor};">${priority}</span>
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
    const vitalContent = {
      title: card.querySelector(".card-title-text").textContent,
      textDescription: card.querySelector(".card-body p").textContent,
      // image: card.querySelector(".card-image").src,
      priority: card.querySelector(".level").textContent,
      status: card.querySelector(".start").textContent,
      date: card.querySelector(".created").textContent,
    };

    const vitalCard = vitalTask(vitalContent);
    document.querySelector("#vital_card").appendChild(vitalCard);

    card.remove();
    actionOption.classList.add("hidden");
  });

  actionOption.querySelector(".edit").addEventListener("click", () => {
    alert(
      "Dear user your previous task will be remove from your dashboard, please click 'OK' to continue editing/create your card with your previous data"
    );

    const title = card.querySelector(".card-title-text").textContent;
    const textDescription = card.querySelector(".card-body").textContent;
    const date = card.querySelector(".created").textContent;

    addContentToTask(title, textDescription, date);

    showAddTask();
    card.remove();

    actionOption.classList.add("hidden");
  });

  actionOption.querySelector(".delete").addEventListener("click", () => {
    const taskId = card.dataset.id;
    card.remove();
    actionOption.classList.add("hidden");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const upDatedTask = tasks.filter((task) => task.id !== Number(taskId));
    localStorage.setItem("tasks", JSON.stringify(upDatedTask));
  });

  actionOption.querySelector(".finish").addEventListener("click", () => {
    const cardContent = {
      title: card.querySelector(".card-title-text").textContent,
      textDescription: card.querySelector(".card-body p").textContent,
      // image: card.querySelector(".card-image").src,
      // date: card.querySelector(".created").textContent,
    };

    const completeCard = completedTask(cardContent);
    document
      .querySelector("#completed-card-container")
      .appendChild(completeCard);

    card.remove();
    actionOption.classList.add("hidden");
  });

  todoList.appendChild(card);
}

// Completed Task function
function completedTask(cardContent) {
  const completedCard = document.createElement("div");
  completedCard.classList.add("card", "completion-card");
  completedCard.dataset.id = cardContent.id;

  const completedDate = new Date();
  const year = completedDate.getFullYear();
  const month = completedDate.getMonth() + 1;
  const day = completedDate.getDate();
  const formattedDate = `${day}/${month}/${year}`;

  completedCard.innerHTML = `
      <div class="card-header flex">
        <ion-icon name="ellipse-outline" class="card-title-icon comp-title-icon"></ion-icon>

        <button class="btn-option">
          <ion-icon name="ellipsis-horizontal-outline" class="option-icon"></ion-icon>
        </button>

        <div class="option-action hidden">
          <div class="inner-option-container">
            <button class="option-btn edit">Edit</button>
            <button class="option-btn delete">Delete</button>
          </div>
        </div>
      </div>

      <p class="card-title-text">${cardContent.title}</p>

      <div class="grid comp-body">
        <div class="completed-text-cont">
          <p class="completed-paragraph">${cardContent.textDescription}</p>

          <p class="card-start start-comp">Status: <span class="comp-start">Completed</span></p>
        </div>

        <img src="./img/user2.jpg" alt="" class="card-image" />
      </div>

      <div class="card-status">
        <p class="created-on comp-on">Completed on <span class="completed-date">${formattedDate}</span></p>
      </div>
  `;

  const optionBtn = completedCard.querySelector(".btn-option");
  const actionOption = completedCard.querySelector(".option-action");

  optionBtn.addEventListener("click", () => {
    actionOption.classList.toggle("hidden");
  });

  actionOption.querySelector(".edit").addEventListener("click", () => {
    alert(
      "Dear user your previous task will be remove from your dashboard, please click 'OK' to continue editing/create your card with your previous data"
    );

    const title = completedCard.querySelector(".card-title-text").textContent;
    const textDescription = completedCard.querySelector(
      ".completed-paragraph"
    ).textContent;
    const date = completedCard.querySelector(".completed-date").textContent;

    addContentToTask(title, textDescription, date);

    showAddTask();
    completedCard.remove();

    actionOption.classList.add("hidden");
  });

  actionOption.querySelector(".delete").addEventListener("click", () => {
    const taskId = completedCard.dataset.id;
    completedCard.remove();
    actionOption.classList.add("hidden");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const upDatedTask = tasks.filter((task) => task.id !== Number(taskId));
    localStorage.setItem("tasks", JSON.stringify(upDatedTask));
  });

  return completedCard;
}

// Vital Task function
function vitalTask(vitalContent) {
  let priorityColor;
  let ellipseColor;
  if (vitalContent.priority === "Extreme") {
    priorityColor = "#f21e1e";
    ellipseColor = "#f21e1e";
  } else if (vitalContent.priority === "Moderate") {
    priorityColor = "#42ade2";
    ellipseColor = "#42ade2";
  } else if (vitalContent.priority === "Low") {
    priorityColor = "#04c400";
    ellipseColor = "#04c400";
  }

  const vitalCard = document.createElement("div");
  // vitalCard.classList.add("cardVital", "vital-card");
  vitalCard.classList.add("cardVital");
  vitalCard.dataset.id = vitalContent.id;

  vitalCard.innerHTML = `
      <div class="vital-header flex">
        <ion-icon name="ellipse-outline" class="card-title-icon" style="color: ${ellipseColor};"></ion-icon>
         
        <button class="btn-option">
          <ion-icon name="ellipsis-horizontal-outline" class="option-icon"></ion-icon>
        </button>

        <div class="option-action hidden">
          <div class="inner-option-container">
            <button class="option-btn task">Task</button>
            <button class="option-btn delete">Delete</button>
            <button class="option-btn finish">Finish</button>
          </div>
        </div>
      </div>

      <p class="vital-title-text">${vitalContent.title}</p>

      <div class="grid vital-body">
          <p class="vital-paragraph">${vitalContent.textDescription}</p>

        <img src="./img/user2.jpg" alt="" class="card-image" />
      </div>

      <div class="vital-status flex">
        <p class="card-level">
          Priority: <span class="level" style="color: ${priorityColor};">${vitalContent.priority}</span>
        </p>
        <p class="card-start">
          Status: <span class="start">${vitalContent.status}</span>
        </p>
        <p class="created-on">
          Created on: <span class="created">${vitalContent.date}</span>
        </p>
      </div>
  `;

  const optionBtn = vitalCard.querySelector(".btn-option");
  const actionOption = vitalCard.querySelector(".option-action");

  optionBtn.addEventListener("click", () => {
    actionOption.classList.toggle("hidden");
  });

  actionOption.querySelector(".task").addEventListener("click", () => {
    const removePreviousDisplay = document.querySelector(".vital_display");
    if (removePreviousDisplay) {
      removePreviousDisplay.remove();
    }

    // vitalCard.classList.add("card-overlay");
    const vitalClone = document.querySelector(".cardVital");
    vitalDetails(vitalClone);

    actionOption.classList.add("hidden");
  });

  // actionOption.querySelector(".edit").addEventListener("click", () => {
  //   actionOption.classList.add("hidden");
  // });

  actionOption.querySelector(".delete").addEventListener("click", () => {
    const taskId = vitalCard.dataset.id;
    vitalCard.remove();
    actionOption.classList.add("hidden");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const upDatedTask = tasks.filter((task) => task.id !== Number(taskId));
    localStorage.setItem("tasks", JSON.stringify(upDatedTask));
  });

  actionOption.querySelector(".finish").addEventListener("click", () => {
    const cardContent = {
      title: vitalCard.querySelector(".vital-title-text").textContent,
      textDescription: vitalCard.querySelector(".vital-body p").textContent,
      // image: vitalCard.querySelector(".card-image").src,
      date: vitalCard.querySelector(".created").textContent,
    };

    const completeCard = completedTask(cardContent);
    document
      .querySelector("#completed-card-container")
      .appendChild(completeCard);

    vitalCard.remove();
    actionOption.classList.add("hidden");
  });

  return vitalCard;
}

// Function for vital details to be displayed
function vitalDetails(vitalCard) {
  const title = vitalCard.querySelector(".vital-title-text").textContent;
  const priority = vitalCard.querySelector(".level").textContent;
  const status = vitalCard.querySelector(".start").textContent;
  const description = vitalCard.querySelector(".vital-body").textContent;
  const date = vitalCard.querySelector(".created").textContent;

  let priorityColor;
  if (priority === "Extreme") {
    priorityColor = "#f21e1e";
  } else if (priority === "Moderate") {
    priorityColor = "#42ade2";
  } else if (priority === "Low") {
    priorityColor = "#04c400";
  }

  const vitalDisplay = document.createElement("div");
  vitalDisplay.classList.add("vital_display");
  vitalDisplay.dataset.id = vitalCard.id;

  // image: vitalCard.querySelector(".card-image").src

  vitalDisplay.innerHTML = `
    <div class="vital_details_header grid">
      <div class="img_vital">
        <img src="img/7.png" alt="image of my story" class="vital_img"/>
      </div>

      <div class="vital_text_header">
        <h1 class="vital-title">${title}</h1>

        <p class="card-level vital_level">
          Priority: <span class="level" style="color: ${priorityColor};">${priority}</span>
        </p>
        <p class="vital_start">
          Status: <span class="start">${status}</span>
        </p>
        <p class="created-on vital_created">
          Created on: <span class="created">${date}</span>
        </p>
      </div>
    </div>

    <div class="vital_details_body">
      <p class="vital_paragraph">${description}</p>
    </div>

    <div class="vital_details_footer flex">
      <button class="vital-btn-icon">
        <ion-icon name="trash" id="vital_delete"></ion-icon>
      </button>

      <button class="vital-btn-icon">
        <ion-icon name="create" id="vital_edit"></ion-icon>
      </button>
    </div>
  `;

  document.querySelector("#vital_display").appendChild(vitalDisplay);

  const deleteBtn = vitalDisplay.querySelector("#vital_delete");
  const editBtn = vitalDisplay.querySelector("#vital_edit");

  deleteBtn.addEventListener("click", () => {
    vitalDisplay.remove();
    document.querySelector(".cardVital").classList.remove("card-overlay");
  });

  editBtn.addEventListener("click", () => {
    // alert(
    //   "Dear user your previous task will be remove from your dashboard, please click 'OK' to continue editing/create your card with your previous data"
    // );

    const title = vitalDisplay.querySelector(".vital-title").textContent;
    const textDescription =
      vitalDisplay.querySelector(".vital_paragraph").textContent;
    const date = vitalDisplay.querySelector(".created").textContent;

    addContentToTask(title, textDescription, date);

    showAddTask();
    // vitalDisplay.remove();
  });

  return vitalDisplay;
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || []);
  tasks.forEach((task) => {
    addTask(
      task.title,
      task.date,
      task.priority,
      task.textDescription,
      task.taskImage
    );
  });
}

function saveTask(title, date, priority, textDescription, taskImage) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskId = Date.now();
  tasks.push({
    id: taskId,
    title,
    date,
    priority,
    textDescription,
    taskImage,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const priority =
    document.querySelector('input[name="priority"]:checked')?.value || "Low";
  const textDescription = document.getElementById("description").value.trim();
  const taskImage = document.getElementById("taskProjectLink");

  if (title && date && textDescription) {
    const userDate = new Date(date);
    let formatDate;

    if (isNaN(userDate)) {
      alert("Please enter a valid date.");
      return;
    } else {
      formatDate = getCurrentDate(userDate);
    }

    addTask(title, formatDate, priority, textDescription, taskImage);
    saveTask(title, formatDate, priority, textDescription, taskImage);

    setTimeout(() => {
      closeAddTask();
    }, 5000);

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("description").value = "";
    document.querySelector('input[name="priority"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    // document.getElementById("taskProjectLink");
  } else {
    alert("Please fill in all the fields correctly.");
  }
});

//? DASHBOARD ADD TASK
function closeAddTask() {
  inviteBtn.classList.remove("inviteBtn");
  overlay.classList.add("hidden");
  addTaskContent.classList.remove("active");
  homeContainer.classList.remove("aside-index");
}

dashboardAddTaskBtn.addEventListener("click", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("description").value = "";

  showAddTask();
});

addTaskBackBtn.addEventListener("click", closeAddTask);

window.onload = loadTask;

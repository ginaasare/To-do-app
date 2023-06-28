const moonImage = document.getElementById("moonImage");
const sunImage = document.getElementById("sunImage");

function setTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");
  moonImage.style.display = theme === "dark" ? "none" : "inline-block";
  sunImage.style.display = theme === "dark" ? "inline-block" : "none";
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  setTheme(newTheme);
}

moonImage.addEventListener("click", toggleTheme);
sunImage.addEventListener("click", toggleTheme);

document.addEventListener("DOMContentLoaded", function () {
  const currentTheme = localStorage.getItem("theme") || "light";
  setTheme(currentTheme);
});

const new_inputBox = document.getElementById("new-input-box");
const listContainer = document.getElementById("list-container");
const filterAll = document.getElementById("all");
const filterActive = document.getElementById("active");
const filterCompleted = document.getElementById("completed");
const clearCompleted = document.getElementById("clear");
const counterElement = document.getElementById("item-counter");

let tasks = [];

new_inputBox.addEventListener("keydown", (e) => {
  let userInput = new_inputBox.value.trim();
  if (e.key === "Enter" && userInput) {
    addTask();
  }
});

filterAll.addEventListener("click", () => {
  filterTasks("all");
});

filterActive.addEventListener("click", () => {
  filterTasks("active");
});

filterCompleted.addEventListener("click", () => {
  filterTasks("completed");
});

clearCompleted.addEventListener("click", () => {
  clearCompletedTasks();
});

function addTask() {
  if (new_inputBox.value === "") {
    alert("Please enter a task name");
  } else {
    let task = {
      id: Date.now(),
      name: new_inputBox.value,
      completed: false,
    };
      
    tasks.push(task);
    updateCounter();
    renderTasks();
    saveData();
  }
  new_inputBox.value = "";
}

function renderTasks() {
  listContainer.innerHTML = "";
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = task.name;
    let firstItem=listContainer.firstChild;
    listContainer.insertBefore(li, firstItem);
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }

    let span = document.createElement("span");
    let CloseImage = document.createElement("img");
    CloseImage.src = "images/icon-cross.svg";
    CloseImage.classList.add("cross-image");
    span.appendChild(CloseImage);
    li.appendChild(span);

    li.addEventListener("mouseover", function () {
      CloseImage.style.display = "inline-block";
    });
    li.addEventListener("mouseout", function () {
      CloseImage.style.display = "none";
    });
    li.addEventListener("click", function () {
      toggleTaskCompletion(task.id);
    });


    

    li.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
          e.target.classList.toggle("checked");
          saveData();
        } else if (e.target.tagName === "IMG") {
          var listItem = e.target.closest("li");
          if (listItem) {
            listItem.remove();
          }
          saveData();
        }
      }, false);
    

  });

  
}



function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
    return task;
  });
  updateCounter();
  renderTasks();
  saveData();
 
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  updateCounter();
  renderTasks();
  saveData();
}

function filterTasks(filter) {
  listContainer.querySelectorAll("li").forEach((li) => {
    switch (filter) {
      case "all":
        li.style.display = "block";
        break;
      case "active":
        if (li.classList.contains("completed")) {
          li.style.display = "none";
        } else {
          li.style.display = "block";
        }
        break;
      case "completed":
        if (li.classList.contains("completed")) {
          li.style.display = "block";
        } else {
          li.style.display = "none";
        }
        break;
    }
  });
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateCounter();
  renderTasks();
  saveData();
}

function updateCounter() {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  counterElement.textContent = remainingTasks + " items left";
}

function saveData() {
  localStorage.setItem("info", listContainer.innerHTML);
  localStorage.setItem("items-left", counterElement.textContent);
}

function loadTodo() {
  listContainer.innerHTML = localStorage.getItem("info");
  counterElement.textContent = localStorage.getItem("items-left");
}

loadTodo();





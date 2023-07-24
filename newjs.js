/*Changing Themes */
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


/*moonImage.addEventListener("click", function() {
  document.body.classList.add("dark-theme");
  moonImage.style.display = "none";
  sunImage.style.display = "inline-block";
});

sunImage.addEventListener("click", function() {
  document.body.classList.remove("dark-theme");
  sunImage.style.display = "none";
  moonImage.style.display = "inline-block";
});




/*Populating the listContainer */
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
    filterAll.style.color = "#3a7bfd";
 

  }
});

filterAll.addEventListener("click", () => {
  filterTasks("all");
  filterAll.style.color = "#3a7bfd";
  filterActive.style.color = "";
  filterCompleted.style.color = "";
  

});

filterActive.addEventListener("click", () => {
  filterTasks("active");
  filterAll.style.color = "";
  filterActive.style.color = "#3a7bfd";
  filterCompleted.style.color = "";
  

});

filterCompleted.addEventListener("click", () => {
  filterTasks("completed");
  filterAll.style.color = "";
  filterActive.style.color = "";
  filterCompleted.style.color = "#3a7bfd";
});

clearCompleted.addEventListener("click", () => {
  clearCompletedTasks();
  filterActive.style.color = "";
  filterCompleted.style.color = "";
  filterAll.style.color = "#3a7bfd";

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
    let firstItem= listContainer.firstChild;
    listContainer.insertBefore(li, firstItem);
    li.setAttribute("data-id", task.id);
    li.dataset.id =task.id;
    if (task.completed) {
      li.classList.add("checked");
    }
   

    let span = document.createElement("span");
    let CloseImage = document.createElement("img");
    CloseImage.src = "images/icon-cross.svg";
    CloseImage.classList.add("cross-image");
    span.appendChild(CloseImage);
    li.appendChild(span);/*adding the class cross-image to the cross icon*/



 /*an eventlistener for the hover effect on the cross*/
    li.addEventListener("mouseover", function () {
      CloseImage.style.display = "inline-block";
    });
    li.addEventListener("mouseout", function () {
      CloseImage.style.display = "none";
    });
    

    li.addEventListener("click", function (event) {
        const clickedElement = event.target;
            if(clickedElement === CloseImage){
                removeTask(task.id);
                li.remove();
            }
            else{
                toggleTaskCompletion(task.id);
            }

    }); 



     // Drag and drop functionality
     li.setAttribute("draggable", "true");
     li.addEventListener("dragstart", dragStart);
     li.addEventListener("dragover", dragOver);
     li.addEventListener("drop", drop);

     filterTasks(getFilterSelection());

   });
 }
 
 function getFilterSelection(){
  if (filterActive.style.color === "#3a7bfd" )
  {
    return "active";
  }
  if (filterCompleted.style.color === "#3a7bfd" )
  {
    return "completed";
  }
  else {
    return "all";
  }
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });

    const filterSelection = getFilterSelection();
    filterTasks(filterSelection);
    updateCounter();
    renderTasks();
    saveData();
  }



  
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  updateCounter();
  renderTasks();
  saveData();
  filterTasks(getFilterSelection());

}

function filterTasks(filter) {
  listContainer.querySelectorAll("li").forEach((li) => {
    switch (filter) {
      case "all":
        li.style.display = "block";
        break;
      case "active":
        if (li.classList.contains("checked")) {
          li.style.display = "none";
        } else {
          li.style.display = "block";
          
        }
        break;
      case "completed":
        if (li.classList.contains("checked")) {
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
  filterTasks(getFilterSelection());

}

function updateCounter() {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  counterElement.textContent = remainingTasks + " items left";
}
/*Using localStorage to store the data */
function saveData() {
  localStorage.setItem("info", listContainer.innerHTML);
  localStorage.setItem("items-left", counterElement.textContent);
}

function loadTodo() {
  listContainer.innerHTML = localStorage.getItem("info");
  counterElement.textContent = localStorage.getItem("items-left");
}

function dragStart(event) {
    event.target.classList.add("dragging");
    event.dataTransfer.setData("text/plain", event.target.dataset.id);
  }
  
  function dragOver(event) {
    event.preventDefault();
  }
  
  function drop(event) {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/plain");
    const targetId = event.target.dataset.id;
    if (sourceId && targetId && sourceId !== targetId) {
      const sourceIndex = tasks.findIndex((task) => task.id === +sourceId);
      const targetIndex = tasks.findIndex((task) => task.id === +targetId);
      if (sourceIndex !== -1 && targetIndex !== -1) {
        const [removed] = tasks.splice(sourceIndex, 1);
        tasks.splice(targetIndex, 0, removed);
        renderTasks();
        saveData();
      }
    }
  }
  

loadTodo();

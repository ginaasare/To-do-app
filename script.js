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


document.addEventListener("DOMContentLoaded", function() {
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

new_inputBox.addEventListener("keydown",e=>{
  let userInput = new_inputBox.value.trim();
  if(e.key === "Enter" && userInput){
    addTask();

  }
});


function addTask()
{
    if(new_inputBox.value ===''){
        alert("Please enter a task name");
    }
    else{
         let li=document.createElement("li");
        li.innerHTML = new_inputBox.value;
        let firstItem=listContainer.firstChild;
        listContainer.insertBefore(li,firstItem);
        

        let span = document.createElement("span");
        var CloseImage= document.createElement("img");
        CloseImage.src = 'images/icon-cross.svg';
        CloseImage.classList.add("cross-image"); /*adding the class cross-image to the cross icon*/
        span.appendChild(CloseImage);
        li.appendChild(span);

        /*an eventlistener for the hover */
        li.addEventListener('mouseover', function(){
          CloseImage.style.display = 'inline-block';
        });
        li.addEventListener('mouseout', function(){
          CloseImage.style.display = 'none';
        });
        saveData();

    }
    new_inputBox.value = "";
  }

/*listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
}
    else if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
    }
    },
false); */
/*checking an item as done or removing an item */
listContainer.addEventListener("click", function(e) {
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



  /*Using localStorage to store the data */

  function saveData(){
    localStorage.setItem("info", listContainer.innerHTML);

  }
  function loadTodo(){
    listContainer.innerHTML = localStorage.getItem("info");
  }
  loadTodo();
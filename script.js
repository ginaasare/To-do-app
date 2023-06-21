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
        listContainer.appendChild(li);
        let span = document.createElement("span");
        var CloseImage= document.createElement("img");
        CloseImage.src = 'images/icon-cross.svg';
        span.appendChild(CloseImage);
        li.appendChild(span);
    }
    new_inputBox.value = "";
    saveData();

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

  function saveData(){
    localStorage.setItem("info", listContainer.innerHTML);

  }
  function loadTodo(){
    listContainer.innerHTML = localStorage.getItem("info");
  }
  loadTodo();
let Input = document.querySelector(".input");
let Add = document.querySelector(".add");
let Tasks = document.querySelector(".tasks");

let arrayOfTasks = [];

if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage()


Add.onclick = function(){
    if(Input.value !== ""){
        addTasksToArray(Input.value);
        Input.value= "";
    }
}


Tasks.addEventListener("click", (e)=> {
    if(e.target.classList.contains("del")){

        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

        e.target.parentElement.remove();
    }

    if(e.target.classList.contains("task")){

        togglesStatus(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})

function addTasksToArray (yourTask){
    const task ={
        id:Date.now(),
        title: yourTask, 
        completed: false,
    }

    arrayOfTasks.push(task);

    addElementsTopageFrom(arrayOfTasks);

    addDataToLocalStorgaeFrom(arrayOfTasks)
}



function addElementsTopageFrom(arrayOfTasks){
    Tasks.innerHTML = "";
    arrayOfTasks.forEach((task)=> {
        let div = document.createElement("div");
        div.className = "task";

        if(task.completed){
        div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span);
        Tasks.appendChild(div);
    })
}

document.getElementsByClassName(".done").maxLength = "10";

function addDataToLocalStorgaeFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");

    if(data){
        let tasks = JSON.parse(data)
        addElementsTopageFrom(tasks);
    }
}


function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId)

    addDataToLocalStorgaeFrom(arrayOfTasks)
}


function togglesStatus(taskId){
    for (let i = 0 ; i< arrayOfTasks.length ; i++){
        if(arrayOfTasks[i].id == taskId ){
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false 
        }
    }
    addDataToLocalStorgaeFrom(arrayOfTasks)
 }
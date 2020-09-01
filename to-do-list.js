const form = document.querySelector("form");
const input = document.querySelector(".input");
input.placeholder = "Enter your task here: ";

const submitBtn = document.querySelector(".submit");
const list = document.querySelector(".to-do-list");
let newTask;
let toDoList = [];
let toDoListCurrTask = 0;
let liId = 0;

//when submiting a task -> prevent the default behavior of submit and run addTaskToList
form.addEventListener("submit", activateAddTaskToList);

function activateAddTaskToList(event) {
    event.preventDefault();
    createTask();
}

//create

function createTask() {
    const date = new Date();
    newTask = {};
    if (!input.value) {
        return;
    }
    newTask.value = input.value;
    newTask.complete = false;
    newTask.priority = "low";
    newTask.dateAdded = date;
    toDoList.push(newTask);

    renderTask(toDoList[toDoListCurrTask]);
}

//render/read
function renderTask() {
    
    //create new li with the input of the new task the user wrote.
    //for each li, create a new checkbox element and edit + trash elements
    const item = document.createElement("li");
    const itemText = document.createElement("span");
    
    item.setAttribute("id", `${liId}`);
    liId++;
    itemText.textContent = newTask.value;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const update = document.createElement("img");
    update.classList.add("icon");
    update.src = "./Update.png";
    update.style.width = "15px";

    const trash = document.createElement("img");
    trash.classList.add("icon");
    trash.src = "./trash.png";
    trash.style.width = "15px";
    item.appendChild(itemText);
    item.appendChild(checkbox);
    item.appendChild(update);
    item.appendChild(trash);
    list.appendChild(item);

    //creating the update-input field and submit-button for the li
    const updateForm = document.createElement("form");
    const updateInputField = document.createElement("input");
    updateInputField.style.display = "none";
    updateInputField.placeholder = "Edit your task: ";
    const updateSubmit = document.createElement("input");
    updateSubmit.type = "submit";
    updateSubmit.style.display = "none";
    updateForm.appendChild(updateInputField);
    updateForm.appendChild(updateSubmit)
    list.appendChild(updateForm);

    checkbox.addEventListener("click", function (event) {
        if (checkbox.checked) {
            newTask.complete = true;
            item.classList.add("complete");
        }
        else {
            newTask.complete = false;
            item.classList.remove("complete");
        }
    });

    toDoListCurrTask++;

    update.addEventListener("click", updateTask);
    // console.log(update.parentElement.textContent);
    trash.addEventListener("click", removeTask);

    input.value = "";
}

//update
function updateTask(event) {
    const taskToChange = event.currentTarget.parentElement.firstElementChild;
    const formEdit = event.currentTarget.parentElement.nextElementSibling;

    const inputEdit = event.currentTarget.parentElement.nextElementSibling.firstElementChild;
    inputEdit.style.display = "block";
    const submit = event.currentTarget.parentElement.nextElementSibling.firstElementChild.nextElementSibling;
    submit.style.display = "block";
    inputEdit.style.textAlign = "center";

    formEdit.addEventListener("submit", function (e) {
        e.preventDefault();
        taskToChange.innerText = inputEdit.value;
        // console.log(inputEdit.value);
        console.log(taskToChange.innerText);
        inputEdit.style.display = "none";
        submit.style.display = "none";
    });

}

//remove

function removeTask(event) {
    // event.currentTarget.parentElement.style.display = "none";
    let el = document.getElementById(event.currentTarget.parentElement.id);
    el.remove();
}
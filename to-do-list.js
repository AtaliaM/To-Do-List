
const form = document.querySelector("form");
const input = document.querySelector(".input");
input.placeholder = "Enter your task here: ";

const submitBtn = document.querySelector(".submit");
const list = document.querySelector(".to-do-list");
let newTask;
let toDoList = [];
let toDoListCurrTask = 0;
let liId = 0;
let i = 0;

renderExistingTasks();

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

    localStorage.setItem("to-do-list", JSON.stringify(toDoList));

    renderTask(toDoList[toDoListCurrTask]);
}

function renderExistingTasks() {
    const todos = localStorage.getItem("to-do-list");
    toDoParsed = JSON.parse(todos) || [];
    console.log(toDoParsed);

    for (i = 0; i < toDoParsed.length; i++) {

        if (toDoParsed[i]) {
            renderTask();
        }
    }
}

//render/read
function renderTask() {

    //create new li with the input of the new task the user wrote.
    //for each li, create a new checkbox element and edit + trash elements
    const item = document.createElement("li");
    const itemText = document.createElement("span");

    item.setAttribute("id", `${liId}`);
    if (toDoParsed[i]) {
        itemText.textContent = toDoParsed[i].value;
        console.log("in iff");
    }
    else {
        itemText.textContent = newTask.value;
    }
    // itemText.textContent = toDoParsed[liId].value; //enter the text value of the current task from the parsed list that's on local storage
    liId++;
    // itemText.textContent = newTask.value;
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
    //adding event listener to the checkbox
    checkbox.addEventListener("click", function (event) {
        if (checkbox.checked) {
            if (newTask) {
                newTask.complete = true;
            }
            else {
                toDoParsed[i-1].complete = true;
            }
            item.classList.add("complete");
        }
        else {
            if (newTask) {
                newTask.complete = false;
            }
            else {
                toDoParsed[i-1].complete = false;
            }
            item.classList.remove("complete");
        }
    });

    toDoListCurrTask++;

    update.addEventListener("click", updateTask);
    trash.addEventListener("click", () => removeTask(i-1, event));

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

    formEdit.addEventListener("submit", function (e) {
        e.preventDefault();
        if (inputEdit.value) {
            taskToChange.innerText = inputEdit.value;
        }
        inputEdit.style.display = "none";
        submit.style.display = "none";
    });

}

//remove

function removeTask(i, event) {
    // event.currentTarget.parentElement.style.display = "none";
    delete toDoList[event.currentTarget.parentElement.id]; //removing the task object from the to-do list
    let el = document.getElementById(event.currentTarget.parentElement.id);
    el.remove(); //removing the element from the dom
}
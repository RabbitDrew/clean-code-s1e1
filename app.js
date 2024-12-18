//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInputElement = document.getElementById("new-task__input"); //Add a new task.
var addButtonElement = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskList = document.getElementById("incomplet-tasks__list"); //ul of #incompleteTasks
var completedTaskList = document.getElementById("completed__tasks"); //completed-tasks


//New task list item
var createNewTaskElement = function(taskString) {

    var taskItem = document.createElement("li");

    // input (checkbox)
    var taskCheckbox = document.createElement("input"); // checkbox
    // label
    var taskLabel = document.createElement("label"); // label
    // input (text)
    var taskEditInput = document.createElement("input"); // text input
    // button.edit
    var taskEditButton = document.createElement("button"); // edit button
    // button.delete
    var taskDeleteButton = document.createElement("button"); // delete button
    var taskDeleteButtonImg = document.createElement("img"); // delete button image


    taskItem.className = 'complete-tasks__item'
    taskLabel.innerText = taskString;
    taskLabel.className = 'incomplete-task__lable'; // заменен класс для label

    // Присваиваем классы элементам
    taskCheckbox.type = "checkbox";
    taskCheckbox.className = 'incomplet-task__checkbox'; // заменен класс для checkbox

    taskEditInput.type = "text";
    taskEditInput.className = "incomplete-task__input"; // заменен класс для input

    taskEditButton.innerText = "Edit"; // текст для кнопки редактирования
    taskEditButton.className = "incomplete-task__button incomplete-task__button--edit"; // заменены классы для кнопки редактирования

    taskDeleteButton.className = "incomplete-task__button incomplete-task__button--delete"; // заменены классы для кнопки удаления
    taskDeleteButtonImg.src = './remove.svg';
    taskDeleteButton.appendChild(taskDeleteButtonImg);

    // Добавляем все элементы в taskItem
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(taskEditInput);
    taskItem.appendChild(taskEditButton);
    taskItem.appendChild(taskDeleteButton);

    return taskItem;
}


var addTask = function() {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInputElement.value) return;
    var taskItem = createNewTaskElement(taskInputElement.value);

    //Append taskItem to incompleteTaskList
    incompleteTaskList.appendChild(taskItem);
    bindTaskEvents(taskItem, markTaskAsCompleted);

    taskInputElement.value = "";
}

//Edit an existing task.
var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var taskItem = this.parentNode;

    var taskEditInput = taskItem.querySelector('input[type=text]');
    var taskLabel = taskItem.querySelector("label");
    var taskEditButton = taskItem.querySelector(".incomplete-task__button--edit");
    var containsClass = taskItem.classList.contains("incomplete-tasks__item--edit-mode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //taskLabel becomes the taskEditInput's value.
        taskLabel.innerText = taskEditInput.value;
        taskEditButton.innerText = "Edit";
    } else {
        taskEditInput.value = taskLabel.innerText;
        taskEditButton.innerText = "Save";
    }

    //toggle .editmode on the parent.
    taskItem.classList.toggle("incomplete-tasks__item--edit-mode");
};

//Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var taskItem = this.parentNode;
    var taskList = taskItem.parentNode;
    //Remove the parent taskItem from the taskList.
    taskList.removeChild(taskItem);
}


//Mark task completed
var markTaskAsCompleted = function() {
    console.log("Complete Task...");

    //Append the task item to the #completed__tasks
    var taskItem = this.parentNode;
    completedTaskList.appendChild(taskItem);
    bindTaskEvents(taskItem, markTaskAsIncomplete);
}

var markTaskAsIncomplete = function() {
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task item to the #incompleteTasks.
    var taskItem = this.parentNode;
    incompleteTaskList.appendChild(taskItem);
    bindTaskEvents(taskItem, markTaskAsCompleted);
}

var ajaxRequest = function() {
    console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButtonElement.onclick = addTask;
addButtonElement.addEventListener("click", addTask);
addButtonElement.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    // Выбор чекбокса с правильным классом
    var taskCheckbox = taskListItem.querySelector(".incomplet-task__checkbox");
    var taskEditButton = taskListItem.querySelector(".incomplete-task__button--edit");
    var taskDeleteButton = taskListItem.querySelector(".incomplete-task__button--delete");

    // Привязка событий
    taskEditButton.onclick = editTask;
    taskDeleteButton.onclick = deleteTask;
    taskCheckbox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskList ul list items
//for each list item
for (var i = 0; i < incompleteTaskList.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskList.children[i], markTaskAsCompleted);
}

//cycle over completedTaskList ul list items
for (var i = 0; i < completedTaskList.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTaskList.children[i], markTaskAsIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.

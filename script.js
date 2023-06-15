const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const pendingTasksList = document.getElementById("pendingTasks");
const completedTasksList = document.getElementById("completedTasks");

// Function to create a new task item
function createTaskItem(taskText, timestamp) {
  const li = document.createElement("li");
  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = taskText;
  li.appendChild(taskTextSpan);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    li.remove();
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    const updatedTaskText = prompt("Enter the updated task:", taskText);
    if (updatedTaskText && updatedTaskText.trim() !== "") {
      taskTextSpan.textContent = updatedTaskText;
    }
  });

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", function () {
    li.classList.toggle("completed");
    if (li.parentNode === pendingTasksList) {
      completedTasksList.appendChild(li);
    } else {
      pendingTasksList.appendChild(li);
    }
  });

  const taskInfo = document.createElement("span");
  taskInfo.textContent = timestamp.toLocaleString();

  li.appendChild(taskInfo);
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  li.appendChild(completeButton);

  return li;
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value;

  if (taskText.trim() !== "") {
    const timestamp = new Date();
    const taskItem = createTaskItem(taskText, timestamp);
    pendingTasksList.appendChild(taskItem);
    taskInput.value = "";
  }
}

// Add event listener for the add button
addButton.addEventListener("click", addTask);

// Add event listener for the Enter key
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

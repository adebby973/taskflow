const addbtn = document.querySelector(".addbtn");
const addingtask = document.querySelector(".addingtask");
const adding = document.querySelector(".adding");
const enter = document.querySelector(".enterbtn");
const about = document.querySelector(".abtbtn");
const aboutlist = document.querySelector(".aboutlist");
const task = document.querySelector(".tasks");
const countbtn = document.querySelector(".countbtn");
const taskcounttext = document.querySelector(".taskcounttext");
const historyBtn = document.querySelector(".hisbtn");
const historyContainer = document.querySelector(".history-container");
const historyList = document.querySelector(".history-list");
const closeHistoryBtn = document.querySelector(".close");

// Toggle add input
addbtn.addEventListener("click", () => {
  addingtask.style.display =
    addingtask.style.display === "none" ? "flex" : "none";
});

// Toggle about dropdown
about.addEventListener("click", () => {
  aboutlist.style.display =
    aboutlist.style.display === "none" ? "flex" : "none";
});

// Update task count
function updateTaskCount() {
  const totalTasks = document.querySelectorAll(".task-item").length;
  const completedTasks = document.querySelectorAll(
    ".task-item input[type='checkbox']:checked"
  ).length;
  taskcounttext.textContent = `Total Tasks: ${totalTasks} | Completed: ${completedTasks}`;
}

// Create a task in the main list
function createTask(taskText, completed = false) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const taskDone = document.createElement("input");
  taskDone.type = "checkbox";
  taskDone.classList.add("checkstyle");
  taskDone.checked = completed;

  const text = document.createElement("span");
  text.textContent = taskText;
  if (completed) {
    text.style.textDecoration = "line-through";
    text.style.opacity = "0.4";
  }

  const delbtn = document.createElement("input");
  delbtn.type = "button";
  delbtn.value = "🗑️";
  delbtn.classList.add("delbtn");

  taskItem.appendChild(taskDone);
  taskItem.appendChild(text);
  taskItem.appendChild(delbtn);
  task.appendChild(taskItem);

  // Checkbox toggle
  taskDone.addEventListener("change", () => {
    if (taskDone.checked) {
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.4";
    } else {
      text.style.textDecoration = "none";
      text.style.opacity = "1";
    }
    updateTaskCount();
  });

  // Delete task
  delbtn.addEventListener("click", () => {
    taskItem.remove();
    updateTaskCount();
  });

  updateTaskCount();
}

// Add new task
enter.addEventListener("click", () => {
  const taskText = adding.value.trim();
  if (taskText !== "") {
    createTask(taskText);
    adding.value = "";
  }
});

// Add new task via Enter key
adding.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    enter.click();
  }
});

// Show task count
countbtn.addEventListener("click", updateTaskCount);

// History button (no storage, just message)
historyBtn.addEventListener("click", () => {
  historyList.innerHTML = "<p>History tracking is turned off!</p>";
  historyContainer.style.display = "block";
  aboutlist.style.display = "none";
});

// Close history
closeHistoryBtn.addEventListener("click", () => {
  historyContainer.style.display = "none";
});

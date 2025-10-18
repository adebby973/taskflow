const addbtn = document.querySelector(".addbtn");
const addingtask = document.querySelector(".addingtask");
const adding = document.querySelector(".adding");
const enter = document.querySelector(".enterbtn");
const about = document.querySelector(".abtbtn");
const aboutlist = document.querySelector(".aboutlist");
const task = document.querySelector(".tasks");
const countbtn = document.querySelector(".countbtn");
const taskcounttext = document.querySelector(".taskcounttext");
const historyBtn = document.querySelector(".hisbtn"); // history button
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

// Save current tasks to localStorage
function saveTasks() {
  const tasksArray = Array.from(document.querySelectorAll(".task-item")).map(
    (item) => ({
      text: item.querySelector("span").textContent,
      completed: item.querySelector("input[type='checkbox']").checked,
    })
  );
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// Save task to history with date
function saveHistory(taskText) {
  const history = JSON.parse(localStorage.getItem("historyTasks")) || [];
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  history.push({ text: taskText, date: today });
  localStorage.setItem("historyTasks", JSON.stringify(history));
}

// Load current tasks
function loadTasks() {
  const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksArray.forEach((taskData) =>
    createTask(taskData.text, taskData.completed)
  );
  updateTaskCount();
}

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
    saveTasks();
    updateTaskCount();
  });

  // Delete task
  delbtn.addEventListener("click", () => {
    taskItem.remove();
    saveTasks();
    updateTaskCount();
  });

  updateTaskCount();
}

// Add new task
enter.addEventListener("click", () => {
  const taskText = adding.value.trim();
  if (taskText !== "") {
    createTask(taskText);
    saveTasks();
    saveHistory(taskText); // save in history
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

// Show history inside container
historyBtn.addEventListener("click", () => {
  const history = JSON.parse(localStorage.getItem("historyTasks")) || [];
  if (history.length === 0) {
    historyList.innerHTML = "<p>No history yet!</p>";
    historyContainer.style.display = "block";
    return;
  }

  // Group tasks by date
  const grouped = {};
  history.forEach((item) => {
    const taskText = item.text || item; // handle old entries
    const date = item.date || new Date().toISOString().split("T")[0]; // fallback
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(taskText);
  });

  // Build HTML
  let html = "";
  Object.keys(grouped)
    .sort((a, b) => new Date(b) - new Date(a)) // newest first
    .forEach((date) => {
      html += `<h4>${date}</h4><ul>`;
      grouped[date].forEach((task) => {
        html += `<li>${task}</li>`;
      });
      html += "</ul>";
    });

  historyList.innerHTML = html;
  historyContainer.style.display = "block"; // show container
  aboutlist.style.display = "none"; // hide dropdown
});

// Close history
closeHistoryBtn.addEventListener("click", () => {
  historyContainer.style.display = "none";
});

// Load tasks on page load
loadTasks();

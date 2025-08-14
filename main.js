const todoForm = document.querySelector(".todo-form");
const taskName = document.querySelector("#todo-input");
const tasksList = document.querySelector(".task-list");

const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
console.log(tasks);

todoForm.onsubmit = (e) => {
  e.preventDefault();

  const newTask = {
    name: taskName.value.trim(),
    isCompleted: false,
  };

  if (!newTask.name) {
    alert("Tên công việc không được để trống!");
    return;
  }

  const existTask = tasks.find((task) => task.name === newTask.name);
  if (existTask) {
    alert(`Tên công việc "${existTask.name}" đã có!`);
    return;
  }
  tasks.unshift(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  taskName.value = "";
};

function renderTasks() {
    const html = tasks.map(task => {
        if (task.name) {
            return `
                <li class="task-item${task.isCompleted ? ' completed' : ''}">
                    <span class="task-title">${task.name}</span>
                    <div class="task-action">
                        <button class="task-btn edit">Edit</button>
                        <button class="task-btn done">Mark as done</button>
                        <button class="task-btn delete">Delete</button>
                    </div>
                </li>
            `;
        }
    }).join("");

    tasksList.innerHTML = html;
  }

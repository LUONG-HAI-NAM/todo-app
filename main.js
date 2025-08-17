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
  taskName.focus();
};

function escapeHtml(str) {             // chong XSS
    const escape = document.createElement("div");
    escape.innerText = str;
    const result = escape.innerHTML;
    escape.innerHTML = "";
    return result;  
}

function renderTasks() {
      // kiem tra de hien thi danh sach trong
      if (tasks.length === 0) {
          tasksList.innerHTML = "<li>Không có công việc nào!</li>";
          return; // thoat ham
      }


      // co du lieu task thi render

      tasksList.innerHTML = "";
      tasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = `task-item${task.isCompleted ? ' completed' : ''}`;
        item.innerHTML = `
          <span class="task-title">${escapeHtml(task.name)}</span>
          <div class="task-action">
              <button class="task-btn edit">Edit</button>
              <button class="task-btn done">Mark as done</button>
              <button class="task-btn delete">Delete</button>
          </div>
      `;
        tasksList.appendChild(item);
      });
  }
renderTasks();
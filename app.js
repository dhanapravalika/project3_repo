let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateUI() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <li class="task">
                <div>
                    <strong>${task.text}</strong><br>
                    <span class="badge ${task.priority.toLowerCase()}">${task.priority}</span>
                    <span> • ${task.category}</span>
                </div>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </li>
        `;
    });

    document.getElementById("taskCount").innerText =
        `📌 Total Tasks: ${tasks.length}`;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;

    if (text.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({ text, priority, category });
    updateUI();
    document.getElementById("taskInput").value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateUI();
}

function searchTask() {
    const query = document.getElementById("search").value.toLowerCase();

    document.querySelectorAll(".task").forEach(task => {
        const txt = task.innerText.toLowerCase();
        task.style.display = txt.includes(query) ? "flex" : "none";
    });
}

updateUI();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if(input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index) {
    let newTask = prompt("Edit Task", tasks[index].text);

    if(newTask !== null && newTask.trim() !== ""){
        tasks[index].text = newTask;
        saveTasks();
        displayTasks();
    }
}

function filterTasks(filter){
    currentFilter = filter;
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if(currentFilter === "active") return !task.completed;
        if(currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task,index)=>{
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

displayTasks();
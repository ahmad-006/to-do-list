//? -------------Targetting html elements
let input = document.querySelector(".input");
let addBtn = document.querySelector(".addBtn");
let allTasksContainer = document.querySelector(".all-task-container");
let totaltasksElement = document.getElementById("total");
let donetasksElement = document.getElementById("done");
let deleteAllBtn = document.querySelector(".delete");
let completedtasksContainer = document.querySelector(".comp-task-container");
let remainingTaskContainer = document.querySelector(".remain-task-container");
let allTasksBtn = document.querySelector("#all-tasks");
let completedtasksBtn = document.querySelector("#comp-tasks");
let remainingTaskBtn = document.querySelector("#remain-tasks");

//?--------defining variable
let totalTasks = 0;
let doneTasks = 0;

//? -------------defining funcctions
const saveData = () => {
  // to save data to lacal storage
  localStorage.setItem("data", allTasksContainer.innerHTML);
  localStorage.setItem("Total tasks", totalTasks);
  localStorage.setItem("done Tasks", doneTasks);
};
const getdata = () => {
  allTasksContainer.innerHTML = localStorage.getItem("data");
  totalTasks = localStorage.getItem("Total tasks");
  doneTasks = localStorage.getItem("done Tasks");
};

const taskValidation = () => {
  if (input.value === "") {
    alert("enter valid task");
  } else {
    let li = document.createElement("li");
    li.textContent = input.value;
    let span = document.createElement("span");
    span.innerHTML = "&times;";
    li.append(span);
    li.classList.add("unchecked");
    allTasksContainer.append(li);
    totalTasks++;
  }
  input.value = ""; // emptying inpuut area
  saveData();
  totaltasksMessage();
  remainingTasksMessage();
};

function totaltasksMessage() {
  totaltasksElement.textContent = `total Tasks: ${totalTasks}`;
}

function remainingTasksMessage() {
  donetasksElement.textContent = `Tasks to be completed: ${
    totalTasks - doneTasks
  }`;
}

getdata(); // to retrieve data from local storage

//setting p elements in UI
totaltasksMessage();
remainingTasksMessage();
//? -------------Adding event listeners

//event listener to add taks
addBtn.addEventListener("click", taskValidation);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    //to add data using enter key
    taskValidation();
  }
});

// event listener on taks
allTasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    if (!e.target.classList.contains("checked")) {
      doneTasks++;
      e.target.classList.remove("unchecked");
    } else {
      doneTasks--;
      e.target.classList.add("unchecked");
    }
    e.target.classList.toggle("checked"); //checking the task

    remainingTasksMessage();
    totaltasksMessage();
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove(); //removing selected task
    if (e.target.parentElement.classList.contains("checked")) {
      doneTasks--;
    }
    totalTasks--;
    if (allTasksContainer.innerHTML === "") {
      doneTasks = totalTasks = 0;
    }

    totaltasksMessage();
    remainingTasksMessage();
    saveData();
  }
});

deleteAllBtn.addEventListener("click", () => {
  document.querySelectorAll("li").forEach((singleLi) => {
    singleLi.remove();
  });
  totalTasks = doneTasks = 0;
  totaltasksMessage();
  remainingTasksMessage();
  saveData();
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Delete") {
    document.querySelectorAll("li").forEach((singleLi) => {
      singleLi.remove();
    });
    totalTasks = doneTasks = 0;
    totaltasksMessage();
    remainingTasksMessage();
    saveData();
  }
});

allTasksBtn.addEventListener("click", () => {
  document.querySelectorAll("li").forEach((singleLi) => {
    singleLi.style.display = "flex";
  });
});

completedtasksBtn.addEventListener("click", () => {
  document.querySelectorAll("li").forEach((singleLi) => {
    singleLi.style.display = singleLi.classList.contains("checked")
      ? "flex"
      : "none";
  });
});

remainingTaskBtn.addEventListener("click", () => {
  document.querySelectorAll("li").forEach((singleLi) => {
    singleLi.style.display = singleLi.classList.contains("unchecked")
      ? "flex"
      : "none";
  });
});

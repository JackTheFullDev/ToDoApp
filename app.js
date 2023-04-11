const body = document.querySelector("body");
const inputTask = document.getElementById("add-task");
const counterTask = document.getElementById("counter");
const dynamicDiv = document.querySelector(".dynamic-div");
const toogleThemeButton = document.querySelector("#toogle-btn");
const headImg = document.querySelector(".pictures");
const clearTask = document.querySelector("#clear-task");

//light theme
const taskList = document.querySelector(".task-list");
const createTask = document.querySelector(".create-task");
const footerSection = document.querySelector(".footer-section");

let howManyLeft = 0;

new Sortable(dynamicDiv, {
  animation: 350,
});
inputTask.addEventListener("keydown", addTask);
function addTask(e) {
  if (e.code === "Enter") {
    let task = inputTask.value;
    let field = `
  <div class="display-task" >
          <div class="button-with-desc">
            <div class="button-cheeck">
              <button class="check-button" onclick="complateTask(this)"></button>
            </div>
            <div class="description-task">
              <p>${task}</p>
            </div>
          </div>
          <div class="button-remove" onclick="deleteTask(this)">
            <img src="/images/icon-cross.svg" alt="remove-button" >
            </div>
        </div>
  `;
    dynamicDiv.innerHTML += field; // dynamic fild- ALL
    inputTask.value = "";
    howManyLeft++;
    counterTask.textContent = howManyLeft;
  }
}
function deleteTask(e) {
  const test = e.parentNode.querySelectorAll(".check-button");
  for (let checked of test) {
    if (!checked.classList.contains("check-button-active")) {
      howManyLeft--;
      counterTask.textContent = howManyLeft;
    }
  }

  e.parentNode.remove();
}
function complateTask(e) {
  //1st idea is to make toggle for every component belov
  //2nd idea is to make if and change style dependly of state

  const divTask = e.parentNode.parentNode;
  e.classList.toggle("check-button-active");
  divTask.classList.toggle("description-task-checked");
  // incrementation logic
  if (e.classList.contains("check-button-active") && howManyLeft != 0) {
    howManyLeft--;
    counterTask.textContent = howManyLeft;
  } else {
    howManyLeft++;
    counterTask.textContent = howManyLeft;
  }
}
toogleThemeButton.addEventListener("click", lightTheme);

/* const currentTheme = localStorage.getItem("theme") || "dark";
document.querySelector("body").classList.add(currentTheme);
if (currentTheme === "light") {
  headImg.src = "images/bg-desktop-light.jpg";
} else {
  headImg.src = "images/bg-desktop-dark.jpg";
} */

function lightTheme() {
  // body.style.backgroundColor="white";
  body.classList.toggle("light");

  // localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark"); // localStorage

  taskList.classList.toggle("task-list-light");
  createTask.classList.toggle("create-task-light");
  footerSection.classList.toggle("footer-section-light");

  if (body.classList != "light") {
    headImg.src = "images/bg-desktop-dark.jpg";
    headImg.style.transition = "0.3s ease-in-out";
  } else {
    headImg.src = "images/bg-desktop-light.jpg";
    headImg.style.transition = "0.3s ease-in-out";
  }
}
clearTask.addEventListener("click", clearComplated);
function clearComplated() {
  const buttonCheck = document.querySelectorAll(".check-button");
  const description = document.querySelectorAll(".description-task");
  for (let cheecked of buttonCheck) {
    cheecked.classList.remove("check-button-active");
  }
  for (let cheecked of description) {
    cheecked.classList.remove("description-task-checked"); //idk why it doesn't work
  }
  howManyLeft = dynamicDiv.childElementCount;
  counterTask.textContent = dynamicDiv.childElementCount;
}
// dynamicdiv.child.className === active? dynamicDiv.style.display="block":"none"

function filter(filterType) {
  const tasks = dynamicDiv.children;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(task);
    const isChecked = task
      .querySelector(".check-button")
      .classList.contains("check-button-active");
    switch (filterType) {
      case "all":
        task.style.display = "flex";
        break;
      case "active":
        isChecked
          ? (task.style.display = "none")
          : (task.style.display = "flex");
        break;
      case "completed":
        isChecked
          ? (task.style.display = "flex")
          : (task.style.display = "none");
        break;
      default:
        console.log("Invalid filter type.");
    }
  }
}

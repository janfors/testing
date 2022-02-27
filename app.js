const inputTask = document.querySelector("input");
const formEl = document.querySelector("form");
const listEl = document.querySelector("ul");
const totalTasksSpan = document.querySelector("#totalTasks");

let tasks = ["task1", "task2", "task3"];

function deleteItem(e) {
	let task = e.target.parentElement.previousElementSibling.innerHTML;
	let index = tasks.indexOf(task);

	if (index != -1) {
		tasks.splice(index, 1);
	}

	updateList();
}

function updateList() {
	listEl.innerHTML = "";

	for (let i = 0; i < tasks.length; i++){
		let newItem = document.createElement("li");
		let span = document.createElement("span");
		let anchor = document.createElement("a");

		span.innerHTML = tasks[i];

		anchor.classList.add("delete");
		anchor.innerHTML = '<i class="fas fa-trash-alt"></i>';

		anchor.addEventListener("click", (e) => {
			deleteItem(e);
		})

		newItem.appendChild(span);
		newItem.appendChild(anchor);

		listEl.appendChild(newItem);	
	}

	totalTasksSpan.innerHTML = tasks.length;
}

updateList();

function notOnlyWhiteSpaces(string) {
	let strippedString = string.trim();
	return strippedString.length > 0;
}

async function addTask() {
	if (inputTask.value && notOnlyWhiteSpaces(inputTask.value) && !tasks.includes(inputTask.value)) {
		tasks.push(inputTask.value)
		updateList();
	}
	else {
		const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

		inputTask.value = "task's cannot repeat themselves or contain only whitespaces!";
		await sleep(2000);
		setTimeout(2);
	}

	inputTask.value = "";
}

formEl.addEventListener("submit", (e) => {
	e.preventDefault();
	addTask();
})
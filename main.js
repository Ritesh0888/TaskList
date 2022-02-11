// Define UI variables
const form = document.querySelector('.form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners
loadEventListner();

// Load all event Listners
function loadEventListner() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear Tasks
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks
	filter.addEventListener('keyup', filterTask);
}

// Get tasks form LS
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task) => {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// create new link element
		const link = document.createElement('a');
		// Add Class
		link.className = 'delete-item secondary-content';
		// Add icon HTML
		link.innerHTML = '<i class="fa fa-remove" style="cursor: pointer"></i>';
		// Append link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// create new link element
	const link = document.createElement('a');
	// Add Class
	link.className = 'delete-item secondary-content';
	// Add icon HTML
	link.innerHTML = '<i class="fa fa-remove" style="cursor: pointer"></i>';
	// Append link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	// Store in LS
	storeTaskInLocalStorage(taskInput.value);

	// clear input
	taskInput.value = '';

	e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you Sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove form LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task, index) => {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {
	// taskList.innerHTML = '';

	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// clear from LS
	clearTaskFromLocalStorage();
}

// clear Task From LocalStorage
function clearTaskFromLocalStorage() {
	localStorage.clear();
}

// Filter task
function filterTask(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach((task) => {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}

		filter.addEventListener('blur', () => {
			filter.value = '';
		});
	});
}

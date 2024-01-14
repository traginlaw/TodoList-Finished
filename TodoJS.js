const todoForm = document.querySelector('#add-todo');
const todoInput = document.querySelector('#task');
const todoList = document.querySelector('#Todo');
const clear = document.querySelector('#clear');

const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

for (let i = 0; i < savedTodos.length; i++) {
	const newTask = document.createElement('li');

	const todo = savedTodos[i];

	newTask.innerText = todo.task;
	newTask.id = todo.id;

	if (todo.isCompleted) {
		newTask.classList.add('completed');
	}

	const complete = document.createElement('button');
	complete.innerText = 'Delete';

	const newBox = document.createElement('input');
	newBox.type = 'checkbox';
	newBox.checked = todo.isCompleted;

	newTask.appendChild(complete);
	newTask.prepend(newBox);

	todoList.appendChild(newTask);
}

todoForm.addEventListener('submit', function (e) {
	e.preventDefault();

	const newTask = document.createElement('li');

	const id = `${Date.now()}`;

	newTask.id = id;

	const taskValue = document.getElementById('task').value;
	newTask.innerText = taskValue;

	const newBox = document.createElement('input');
	newBox.type = 'checkbox';

	const complete = document.createElement('button');
	complete.innerText = 'Delete';

	newTask.prepend(newBox);
	newTask.appendChild(complete);

	todoList.appendChild(newTask);
	todoForm.reset();

	const todo = {
		task: taskValue,
		isCompleted: false,
		id,
	};

	savedTodos.push(todo);

	localStorage.setItem('todos', JSON.stringify(savedTodos));

	todoForm.reset();
});

todoList.addEventListener('click', function (event) {
	if (event.target.tagName === 'BUTTON') {
		const id = event.target.parentElement.id;

		let updatedTodos = [];

		for (let i = 0; i < savedTodos.length; i++) {
			let todo = savedTodos[i];

			if (todo.id !== id) {
				updatedTodos.push(todo);
			}
		}

		event.target.parentElement.remove();

		localStorage.setItem('todos', JSON.stringify(updatedTodos));
	}

	if (event.target.tagName === 'INPUT') {
		const id = event.target.parentElement.id;

		event.target.parentElement.classList.toggle('completed');

		let updatedTodos = [];

		for (let i = 0; i < savedTodos.length; i++) {
			let todo = savedTodos[i];

			if (todo.id === id) {
				todo.isCompleted = !todo.isCompleted;
			}

			updatedTodos.push(todo);
		}

		localStorage.setItem('todos', JSON.stringify(updatedTodos));
	}
});

clear.addEventListener('click', function (e) {
	console.log(e);
	localStorage.removeItem('todos');
	todoList.remove();
});

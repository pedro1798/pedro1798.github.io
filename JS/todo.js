//name every todo "todo" or "Todo"

const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = todoForm.querySelector("input");
const TODOS_KEY = "todos";

let todos = [];

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos)); //parse array into string to save in localStorage
}

function handleTodoSubmit(event) {
  event.preventDefault(); //prevent refresh
  const newTodo = todoInput.value;
  todoInput.value = ""; // initiate value to ""
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  li.remove();
  saveTodo();
}

function paintTodo(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  const span = document.createElement("span");
  span.innerText = newTodoObj.text;

  const button = document.createElement("button");
  button.addEventListener("click", deleteTodo);
  button.innerText = "❌";
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY); //string

if (savedTodos) {
  //savedTodos !== null이면
  const parsedTodos = JSON.parse(savedTodos); //array
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo); //parsedTodos의 text를 paintTodo로 전달
}

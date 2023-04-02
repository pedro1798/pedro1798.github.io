const h1 = document.querySelector("div.hello h1");
const loginInput = document.querySelector("#login-form input");
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  paintGreetings(username);
}

function handleTitleClick() {
  const className = "clicked";
  h1.classList.toggle(className);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  //기본 null으로 설정해놓고 form 뜨게
  //show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  //show the greetings
  paintGreetings(savedUserName);
}

h1.addEventListener("click", handleTitleClick);

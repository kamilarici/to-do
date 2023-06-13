//*************************SELECTORS
const addBtn = document.getElementById("addBtn");
const inputText = document.getElementById("inputText");
const addForm = document.getElementById("addForm");
const todos = document.getElementById("todos");
const removeAll = document.getElementById("removeAll");
//*========== VARIABLES
let todoArr = [];
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(e);
  //   console.log(e.target);
  //   console.log(inputText.value);
  addTodo();
});
const addTodo = () => {
  let text = inputText.value.trim().toUpperCase();
  //   console.log(text);
  createLi(text);
  addLocalStorage(text);
};
const createLi = (text) => {
  //   console.log(newTodo);
  //******************create element */
  const todoLi = document.createElement("li");
  const todoInput = document.createElement("input");
  const todoLabel = document.createElement("label");
  const todoIcon = document.createElement("i");
  //******************append element */
  todoLabel.textContent = text;
  todoLi.appendChild(todoInput);
  todoLi.appendChild(todoLabel);
  todoLi.appendChild(todoIcon);
  //   todos.appendChild(todoLi);
  //* her element eklediğimizde başa eklemer
  todos.insertAdjacentElement("afterbegin", todoLi);
  //**********add Class element*/
  todoLi.classList.add("list-group-item");
  todoInput.classList.add("form-check-input", "me-2");
  todoInput.type = "checkbox";
  todoLabel.classList.add("form-check-label");
  todoIcon.classList.add("fa-solid", "fa-trash-can");
  inputText.value = "";
};
const addLocalStorage = (text) => {
  checkLocalStorage();
  todoArr.unshift(text);
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
};
window.addEventListener("load", () => {
  checkLocalStorage();
  todoArr.forEach((todo) => {
    createLi(todo);
  });
});

const checkLocalStorage = () => {
  if (localStorage.getItem("todoArr") === null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorage.getItem("todoArr"));
  }
};

todos.addEventListener("click", (e) => {
  //   console.log(e.target);
  if (e.target.classList.contains("fa-trash-can")) {
    const todo = e.target.parentElement;
    todo.remove();
    removeTodoStorage(todo.textContent);
  } else if (e.target.classList.contains("form-check-input")) {
    if (e.target.checked === true) {
      console.log(e.target);
      e.target.nextSibling.style.textDecoration = "line-through";
      e.target.parentElement.style.backgroundColor = "LightGrey";
      e.target.parentElement.style.color = "FireBrick";
    } else {
      e.target.nextSibling.style.textDecoration = "none";
      e.target.parentElement.style.backgroundColor = "white";
      e.target.parentElement.style.color = "black";
    }
  }
});

const removeTodoStorage = (removeTodo) => {
  checkLocalStorage();

  todoArr.forEach((yavuz, index) => {
    if (removeTodo === yavuz) {
      todoArr.splice(index, 1);
    }
  });
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
};

removeAll.addEventListener("click", (e) => {
  //   // const todoList = document.querySelectorAll(".list-group-item");
  //   // if (todoList.length > 0) {
  //   //   todoList.forEach((todo) => {
  //   //     todo.remove();
  //   //   });
  //   // }
  localStorage.clear();
  location.reload();
  //   // checkLocalStorage();
  // todoArr = [];

  //   // localStorage.setItem("todoArr", JSON.stringify(todoArr));
});
// const armut = () => {

//   alert("hadi yine iyisin");

// };

// removeAll.addEventListener("click", (e) => {
//   localStorage.clear();
//   location.reload();
//   // Mesajı oluştur
//   const message = "İşlem tamamlandı! Hala iyi misiniz?";
//   // Mesajı ekrana yazdır
//   console.log(message);
//   // veya
//   alert(message);
//   // veya mesajı HTML içine yerleştirerek göster
//   const messageElement = document.createElement("p");
//   messageElement.textContent = message;
//   document.body.appendChild(messageElement);
// });

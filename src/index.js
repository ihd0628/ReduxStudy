import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
  return { type: ADD_TODO, text }
}

const deleteToDo = id => {
  return {type:DELETE_TODO, id}
}

const reducer = (state=[], action) => {
  console.log(state);
  switch(action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
}

const store = createStore(reducer);

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = event => {
  const id = parseInt(event.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintTodos = () => {
  ul.innerHTML = "";
  const toDos = store.getState();
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.innerText = toDo.text;
    li.id = toDo.id;
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const onSubmit = event => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

store.subscribe(paintTodos);

form.addEventListener('submit', onSubmit);
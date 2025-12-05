import edit from "../assets/edit.svg";
import calendar from "../assets/calendar.svg";
import chat from "../assets/chat.svg";
import ellipsis from "../assets/ellipsis.svg";
import trash from "../assets/delete.svg";

export class TodoListCell {
  constructor(todo) {
    this.todo = todo;
    this.element = document.createElement("li");
    this.element.classList.add("todo-item");
    this.element.dataset.id = todo.id;

    this.render();
  }

  render() {
    // --- Checkbox ---
    const checkboxBtn = document.createElement("button");
    checkboxBtn.classList.add("checkbox");

    // --- Content wrapper ---
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("todo-text-content");

    const contentBtn = document.createElement("button");

    const nameH2 = document.createElement("h2");
    nameH2.classList.add("todo-name");
    nameH2.textContent = this.todo.title;

    const dueTagDiv = document.createElement("div");
    dueTagDiv.classList.add("due-tag");

    const dueIcon = document.createElement("img");
    dueIcon.src = calendar;

    const dueP = document.createElement("p");
    dueP.classList.add("todo-due");
    dueP.textContent = this.todo.dueDate || "No Date";

    // Build due-tag
    dueTagDiv.appendChild(dueIcon);
    dueTagDiv.appendChild(dueP);

    // Build content button
    contentBtn.appendChild(nameH2);
    contentBtn.appendChild(dueTagDiv);

    // Add to content wrapper
    contentDiv.appendChild(contentBtn);

    // --- Buttons section ---
    const buttonsList = document.createElement("ul");
    buttonsList.classList.add("todo-buttons");

    const editBtn = this.createIconButton(edit);
    const dateBtn = this.createIconButton(calendar);
    const chatBtn = this.createIconButton(chat);
    const deleteBtn = this.createIconButton(trash);
    deleteBtn.classList.add("delete-todo-button");

    buttonsList.appendChild(editBtn);
    buttonsList.appendChild(dateBtn);
    buttonsList.appendChild(chatBtn);
    buttonsList.appendChild(deleteBtn);

    // --- Assemble final cell ---
    this.element.appendChild(checkboxBtn);
    this.element.appendChild(contentDiv);
    this.element.appendChild(buttonsList);
  }

  createIconButton(src) {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    const img = document.createElement("img");
    img.src = src;

    btn.appendChild(img);
    li.appendChild(btn);
    return li;
  }

  getElement() {
    return this.element;
  }
}

// <li class="todo-item">
//   <button class="checkbox checked"></button>
//   <div class="todo-text-content">
//     <button>
//       <h2 class="todo-name crossed-out">
//         Finish Project: Todo List
//       </h2>
//       <div class="due-tag">
//         <img src="assets/calendar.svg" />
//         <p class="todo-due">Today</p>
//       </div>
//     </button>
//   </div>
//   <ul class="todo-buttons">
//     <li>
//       <button><img src="assets/edit.svg" /></button>
//     </li>
//     <li>
//       <button><img src="assets/calendar.svg" /></button>
//     </li>
//     <li>
//       <button><img src="assets/chat.svg" /></button>
//     </li>
//     <li>
//       <button><img src="assets/ellipsis.svg" /></button>
//     </li>
//   </ul>
// </li>

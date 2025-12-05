import add from "../assets/add.svg";
import { TodoListCell } from "./TodoListCell";

// "root" view contains smaller views (title view, todo list, add button)
export class TodoView {
  constructor(listView) {
    this.listView = listView;
    this.bindEvents();

    this.element = document.createElement("div");
    this.element.classList.add("todo-content");

    // Title
    this.titleView = document.createElement("h1");
    this.titleView.classList.add("todo-title");

    // List view
    this.listView = listView;

    // Add Button
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-task-button");

    const addTaskIcon = document.createElement("img");
    addTaskIcon.src = add;

    const addTaskPara = document.createElement("p");
    addTaskPara.textContent = "Add task";

    addTaskButton.append(addTaskIcon, addTaskPara);

    this.element.appendChild(this.titleView);
    this.element.appendChild(this.listView.getElement());
    this.element.appendChild(addTaskButton);
  }

  bindEvents() {
    // this.container.addEventListener("click", (e) => {
    //   const deleteBtn = e.target.closest(".project-delete-btn");
    //   if (!deleteBtn) return;
    //   const cell = deleteBtn.closest(".project-cell");
    //   const id = cell.dataset.id;
    //   cell.remove();
    //   this.onDelete?.(id);
    // });
  }

  updateUI(title, todos) {
    this.titleView.textContent = title;
    this.listView.getElement().replaceChildren();
    console.log(todos);
    todos.forEach((todo) => {
      const cell = new TodoListCell(todo);
      this.listView.getElement().appendChild(cell.getElement());
    });
  }

  getElement() {
    return this.element;
  }
}

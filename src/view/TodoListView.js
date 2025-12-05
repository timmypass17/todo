export class TodoListView {
  constructor(container) {
    this.container = container;
    this.bindEvents();
  }

  bindEvents() {
    this.container.addEventListener("click", (e) => {
      console.log(e.target);
      const deleteBtn = e.target.closest(".delete-todo-button");
      if (!deleteBtn) return;
      const cell = deleteBtn.closest(".todo-item");
      const id = cell.dataset.id;
      cell.remove();
      this.onDelete?.(id);
    });
  }

  render(todos) {
    this.container.replaceChildren();

    todos.forEach((todo) => {
      const cell = new TodoListCell(todo);
      this.container.appendChild(cell.getElement());
    });
  }

  getElement() {
    return this.container;
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

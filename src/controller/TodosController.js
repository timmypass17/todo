import { Todo } from "../models/Todo";
export class TodosController {
  // set up class
  constructor(projectService, todoService, view) {
    this.todos = [];
    this.view = view;
    this.projectService = projectService;
    this.todoService = todoService;
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
  }

  cacheDOM() {
    this.addTodoBtn = this.getView().querySelector(".add-task-button");
    this.dialog = document.querySelector("#add-todo-dialog");
    this.form = document.querySelector("#add-todo-dialog form");
    this.dialogCancelBtn = document.querySelector("#add-todo-dialog #cancel");
    this.dialogConfirmBtn = document.querySelector("#add-todo-dialog #add");

    // this.dialog = document.querySelector("#add-todo-dialog");
    // this.input = document.querySelector("#dialog #project-name");
  }

  bindEvents() {
    this.addTodoBtn.addEventListener("click", (e) => {
      this.dialog.showModal();
    });

    this.dialogCancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.dialog.close();
    });

    this.dialog.addEventListener("submit", (e) => {
      var formData = Object.fromEntries(new FormData(this.form));

      const todo = new Todo(
        crypto.randomUUID(),
        formData.title,
        formData.description,
        formData["due-date"],
        formData.priority
      );

      this.todoService.addTodo(this.projectId, todo);
      this.todos.push(todo);
      this.updateUI(this.title, this.todos); // better to append single item instead of reload all
    });

    this.view.listView.onDelete = (todoId) => {
      this.todoService.deleteTodo(todoId);
      this.todos = this.todos.filter((t) => {
        return t.id !== todoId;
      });
      this.updateUI(this.title, this.todos);
    };
  }

  handleAddTodo() {
    // const name = this.input.value.trim();
    // if (name === "") {
    //   return;
    // }
    // const project = new Project(name);
    // this.projectService.addProject(project);
    // this.input.value = "";
    // this.updateUI();
    // this.dialog.close();
  }

  updateUI(title, todos) {
    this.title = title;
    this.todos = todos;
    this.view.updateUI(title, todos);
  }

  getView() {
    return this.view.getElement();
  }
}

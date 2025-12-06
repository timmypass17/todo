// Service: Contains business logic (the rules of how your app should behave)
// e.g. only 100 limit todo per project, setting completedAt timestamp when a todo becomes done
// - provides a set of services that represent the application's core functionalities.
// - service handles business logic, repositories abstract the data storage mechanism

const { isToday, isAfter } = require("date-fns");

export class TodoService {
  constructor(projectRepository, todoRepository) {
    this.projectRepository = projectRepository;
    this.todoRepository = todoRepository;
  }

  getTodos(projectId) {}

  addTodo(projectId, todo) {
    this.projectRepository.addTodo(projectId, todo);
  }

  deleteTodo(todoId) {
    this.todoRepository.deleteTodo(todoId);
  }

  toggleTodo(todoId) {
    const todo = this.todoRepository.getTodo(todoId);
    todo.toggleCheck();
    this.todoRepository.saveTodo(todo);
    return;
  }

  getCompletedTodos() {
    const todos = this.todoRepository.getAllTodos();
    return todos.filter((todo) => todo.isComplete);
  }

  getAllTodos() {
    return this.todoRepository.getAllTodos().filter((todo) => !todo.isComplete);
  }

  getTodayTodos() {
    const todos = this.todoRepository.getAllTodos();
    return todos.filter((todo) => !todo.isComplete && isToday(todo.dueDate));
  }

  getUpcomingTodos() {
    const todos = this.todoRepository.getAllTodos();
    return todos.filter(
      (todo) => !todo.isComplete && isAfter(todo.dueDate, new Date())
    );
  }
}

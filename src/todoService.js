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
  toggleTodo(projectId, todoId) {}
}

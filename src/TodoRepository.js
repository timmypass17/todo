// Repository: another layer to abstract data storage
// - data access like crud operations
// - map data between the storage format (e.g. JSON, plain obj) and the application's domain objects (e.g. Todo)?
// - may coordinate with multiple DAOs (maybe we need a TweetsDao and a UserDao to represent a UserSocialMedia profile)
export class TodoRepository {
  constructor(projectDAO) {
    this.projectDAO = projectDAO;
  }

  getAllTodos() {
    return this.projectDAO
      .getProjects()
      .flatMap((project) => project.todos)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  getTodos(projectId) {
    const project = this.projectDAO.getProject(projectId);
    return project.todos;
  }

  getTodo(todoId) {
    const projects = this.projectDAO.getProjects();

    for (const project of projects) {
      const todo = project.todos.find((t) => t.id === todoId);
      if (todo) {
        return todo;
      }
    }
  }

  saveTodo(todo) {
    const projects = this.projectDAO.getProjects();

    for (const project of projects) {
      const index = project.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        project.todos[index] = todo;
        this.projectDAO.saveProjects(projects);
        break;
      }
    }
  }

  deleteTodo(todoId) {
    const projects = this.projectDAO.getProjects();

    for (const project of projects) {
      const index = project.todos.findIndex((t) => t.id === todoId);
      if (index !== -1) {
        project.todos.splice(index, 1);
        this.projectDAO.saveProjects(projects);
        break;
      }
    }
  }
}

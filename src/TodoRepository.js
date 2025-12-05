export class TodoRepository {
  constructor(projectDAO) {
    this.projectDAO = projectDAO;
  }

  getTodos(projectId) {
    const project = this.projectDAO.getProject(projectId);
    return project.todos;
  }

  deleteTodo(todoId) {
    const projects = this.projectDAO.getProjects();

    for (const project of projects) {
      const index = project.todos.findIndex((t) => t.id === todoId);
      if (index) {
        project.todos.splice(index, 1);
        this.projectDAO.saveProjects(projects);
        break;
      }
    }
  }
}

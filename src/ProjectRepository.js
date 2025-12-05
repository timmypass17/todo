// Repository: Another layer that also deals with data and hides queries similar to DAO. However, it sits at a higher level, closer to the business logic of an app.
// Provides a clean API for higher layers. Can combine data from multiple DAOs, convert raw data → domain models.
// - repositories coordinates with multiple DAOs (if needed)
// - converts raw data to domain objects (e.g. Project, Todo)
// - wrapper for DAO
// - not really necessary to have repo + dao in small projects
// - Accepts and returns class instances
import { Project } from "./models/Project";
import { Todo } from "./models/Todo";

class ProjectRepository {
  constructor(projectDAO) {
    this.projectDAO = projectDAO;
  }

  addProject(project) {
    const projects = this.projectDAO.getProjects();
    const todos = project.todos.map((t) => {
      return { id: t.id, title: t.title };
    });
    projects.push({ id: project.id, name: project.name, todos: todos }); // safer to extract values we want since objects could change during runtime
    this.projectDAO.saveProjects(projects);
  }

  getProjects() {
    return this.projectDAO.getProjects();
  }

  getProject(id) {
    const data = this.projectDAO.getProject(id);
    const todos = data.todos.map(
      (t) => new Todo(t.id, t.title, t.description, t.dueDate, t.priority)
    );
    return new Project(data.name, todos, data.id);
  }

  addTodo(projectId, todo) {
    const projects = this.getProjects();
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      console.log("Project did not exist");
      return;
    }

    project.todos.push(todo);

    this.projectDAO.saveProjects(projects);
  }

  deleteProject(id) {
    this.projectDAO.deleteProject(id);
  }
}

export { ProjectRepository };

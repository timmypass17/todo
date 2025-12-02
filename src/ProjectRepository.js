// Repository: Another layer that also deals with data and hides queries similar to DAO. However, it sits at a higher level, closer to the business logic of an app.
// - repositories relies on multiple DAOs
// - map data to objects here
// - not really necessary to have repo + dao.
import { Project } from "./models/Project";

class ProjectRepository {
  constructor(projectDAO) {
    this.projectDAO = projectDAO;
  }

  addProject(project) {
    const projects = this.projectDAO.getProjects();
    projects.push({ id: project.id, name: project.name }); // safer to extract values we want since objects could change during runtime
    this.projectDAO.saveProjects(projects);
  }

  getProjects() {
    return this.projectDAO
      .getProjects()
      .map((item) => new Project(item.name, item.id));
  }

  deleteProject(id) {
    this.projectDAO.deleteProject(id);
  }
}

export { ProjectRepository };

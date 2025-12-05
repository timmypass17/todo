// Service: Contains business logic, rules, validation. Uses repository.
// - deals with purely class instances
// https://www.baeldung.com/java-dao-vs-repository
class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  addProject(project) {
    if (project.name === "") {
      // throw new Error("Project must have a name");
      return;
    }
    this.projectRepository.addProject(project);
  }

  getProjects() {
    return this.projectRepository.getProjects();
  }

  getProject(id) {
    return this.projectRepository.getProject(id);
  }

  deleteProject(id) {
    this.projectRepository.deleteProject(id);
  }
}

export { ProjectService };

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

  deleteProject(id) {
    this.projectRepository.deleteProject(id);
  }
}

export { ProjectService };

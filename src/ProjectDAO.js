// DAO: an abstraction of data persistence and is considered closer to the underlying storage
// - hides database operations/queries
class ProjectDAO {
  saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  getProjects() {
    return JSON.parse(localStorage.getItem("projects") || "[]");
  }

  deleteProject(id) {
    let projects = this.getProjects();
    projects = projects.filter((p) => {
      return p.id !== id;
    });
    this.saveProjects(projects);
  }
}

export { ProjectDAO };

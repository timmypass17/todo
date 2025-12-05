// DAO: Hides low level database operations/queries. Directly interacts with database
// - DAO shouldn’t know about project structure or “get todos for a project” queries.
//   Repository is exactly the layer designed to expose higher-level queries like this.
import { Project } from "./models/Project.js";

class ProjectDAO {
  saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  getProjects() {
    const data = JSON.parse(localStorage.getItem("projects") || "[]");
    return data.map((obj) => Project.fromJSON(obj)); // hydrate object (to have methods since we can't store methods)
  }

  getProject(id) {
    return this.getProjects().find((p) => p.id === id);
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

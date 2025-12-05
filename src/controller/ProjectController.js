import { Project } from "../models/Project";

export class ProjectController {
  constructor(projectService, listView) {
    this.projectService = projectService;
    this.listView = listView;
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.updateUI();
  }

  cacheDOM() {
    this.addBtn = document.querySelector("#add-project-dialog #add");
    this.input = document.querySelector("#add-project-dialog #project-name");
    this.dialog = document.querySelector("#add-project-dialog");
  }

  bindEvents() {
    this.addBtn.addEventListener("click", () => {
      this.handleAddTask();
    });

    this.listView.onDelete = (id) => {
      this.projectService.deleteProject(id);
    };
  }

  handleAddTask() {
    const name = this.input.value.trim();
    if (name === "") {
      return;
    }

    const project = new Project(name);
    this.projectService.addProject(project);
    this.input.value = "";
    this.updateUI();
    this.dialog.close();
  }

  updateUI() {
    const projects = this.projectService.getProjects();
    this.listView.updateUI(projects);
  }
}

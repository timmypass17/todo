import "./styles.css";
import { ProjectDAO } from "./ProjectDAO";
import { ProjectRepository } from "./ProjectRepository";
import { ProjectService } from "./ProjectService";
import { ProjectController } from "./controller/ProjectController";
import { ProjectListView } from "./view/ProjectListView";

const dialog = document.querySelector("dialog");
const addProjectButton = document.querySelector(".add-project-button");
const jsCloseBtn = dialog.querySelector("#cancel");

addProjectButton.addEventListener("click", () => {
  dialog.showModal();
});

jsCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

const projectDAO = new ProjectDAO();
const projectRepository = new ProjectRepository(projectDAO);
const projectService = new ProjectService(projectRepository);

const projects = projectService.getProjects();
console.table(projects);

const projectList = document.querySelector(".projects");
const projectListView = new ProjectListView(projectList);
const projectController = new ProjectController(
  projectService,
  projectListView
);

projectController.init();

import "./styles.css";
import { ProjectDAO } from "./ProjectDAO";
import { ProjectRepository } from "./ProjectRepository";
import { ProjectService } from "./ProjectService";
import { ProjectController } from "./controller/ProjectController";
import { ProjectListView } from "./view/ProjectListView";
import { TodoService } from "./TodoService";
import { Todo } from "./models/Todo";
import { TodosController } from "./controller/TodosController";
import { TodoView } from "./view/TodosView";
import { TodoListView } from "./view/TodoListView";
import { Project } from "./models/Project";
import { TodoDAO } from "./TodoDAO";
import { TodoRepository } from "./TodoRepository";

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

// const todoDAO = new TodoDAO();
const todoRepository = new TodoRepository(projectDAO);
const todoService = new TodoService(projectRepository, todoRepository);
const projects = projectService.getProjects();

let firstProject;
if (projects.length === 0) {
  projectService.addProject(new Project("Default"));
}
firstProject = projectService.getProjects()[0];

console.table(projects);

const projectList = document.querySelector(".projects");
const projectListView = new ProjectListView(projectList);
const projectController = new ProjectController(
  projectService,
  projectListView
);

projectController.init();

// todoService.addTodo(
//   "514c9379-387f-4c44-afac-c49c5157bd3d",
//   new Todo("123", "First Todo!", "Hello", new Date(), "1")
// );

const todoListEle = document.createElement("ul");
todoListEle.classList.add("todos");
const todoListView = new TodoListView(todoListEle);
const todoView = new TodoView(todoListView);

const todosController = new TodosController(
  projectService,
  todoService,
  todoView
);
todosController.init();
todosController.projectId = firstProject.id;
todosController.updateUI(firstProject.name, firstProject.todos);

const contentDiv = document.querySelector("#content");
function showTab(tabContent) {
  contentDiv.replaceChildren(tabContent);
}

showTab(todosController.getView());

// Make tabs clickable
// todosController.updateUI("Test", firstProject.todos);
const sidebar = document.querySelector(".sidebar");
sidebar.addEventListener("click", (e) => {
  const tabEle = e.target.closest("[data-tab]");
  if (!tabEle) {
    return;
  }

  const tab = tabEle.dataset.tab;
  switch (tab) {
    case "all":
      const allTodos = todoService.getAllTodos();
      todosController.updateUI("All", allTodos);
      break;
    case "today":
      const todayTodos = todoService.getTodayTodos();
      todosController.updateUI("Today", todayTodos);
      break;
    case "upcoming":
      const upcomingTodos = todoService.getUpcomingTodos();
      todosController.updateUI("Upcoming", upcomingTodos);
      break;
    case "completed":
      const completedTodos = todoService.getCompletedTodos();
      todosController.updateUI("Completed", completedTodos);
      break;
    default:
      const projectId = tab;
      const project = projectService.getProject(projectId);
      todosController.projectId = projectId;
      todosController.updateUI(project.name, project.todos);
      break;
  }
});

// Repetitive code (list of if's )
// violates open/closed
// should create class for each tab type and call it's own function

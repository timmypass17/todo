import tag from "../assets/tag.svg";
import trash from "../assets/delete.svg";

// <li>
//   <button>
//     <div>
//       <img src="assets/tag.svg" alt="Pound icon" class="hashtag" />
//       <p class="project-name">Default Project</p>
//     </div>
//   </button>
//   <p class="project-todo-count">2</p>
//   <button class="project-options-btn">
//     <img src="assets/ellipsis.svg" />
//   </button>
// </li>

export class ProjectListCell {
  constructor(project) {
    this.project = project;
    this.element = document.createElement("li");

    const btn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    const nameContainer = document.createElement("div");
    this.todoCountPara = document.createElement("p");
    const icon = document.createElement("img");
    const todoNamePara = document.createElement("p");
    this.deleteIcon = document.createElement("img");

    this.element.classList.add("project-cell");
    this.todoCountPara.classList.add("project-todo-count");
    deleteBtn.classList.add("project-delete-btn");
    todoNamePara.classList.add("project-name");

    this.element.appendChild(btn);
    this.element.appendChild(this.todoCountPara);
    this.element.appendChild(deleteBtn);
    deleteBtn.appendChild(this.deleteIcon);
    btn.appendChild(nameContainer);
    nameContainer.appendChild(icon);
    nameContainer.appendChild(todoNamePara);

    this.element.dataset.id = project.id;
    icon.src = tag;
    todoNamePara.textContent = project.name;
    this.todoCountPara.textContent = 0;
    this.deleteIcon.src = trash;
  }
}

import { ProjectListCell } from "./ProjectListCell";

export class ProjectListView {
  constructor(container) {
    this.container = container;
    this.bindEvents();
  }

  bindEvents() {
    this.container.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".project-delete-btn");
      if (!deleteBtn) return;

      const cell = deleteBtn.closest(".project-cell");
      const id = cell.dataset.id;
      cell.remove();
      this.onDelete?.(id);
    });
  }

  updateUI(projects) {
    this.container.replaceChildren();

    projects.forEach((project) => {
      const cell = new ProjectListCell(project);
      this.container.appendChild(cell.element);
    });
  }
}

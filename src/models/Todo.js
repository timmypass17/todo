import { parse } from "date-fns";

export class Todo {
  constructor(id, title, description, dueDate, priority, isComplete) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
  }

  toggleCheck() {
    this.isComplete = !this.isComplete;
  }

  static fromJSON(obj) {
    return new Todo(
      obj.id,
      obj.title,
      obj.description,
      obj.dueDate,
      obj.priority,
      obj.isComplete
    );
  }
}

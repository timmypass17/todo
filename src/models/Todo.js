export class Todo {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  static fromJSON(obj) {
    return new Todo(
      obj.id,
      obj.title,
      obj.description,
      obj.dueDate,
      obj.priority
    );
  }
}

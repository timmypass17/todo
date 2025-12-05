import { Todo } from "./Todo";

export class Project {
  constructor(name, todos = [], id = crypto.randomUUID()) {
    this.id = id;
    this.name = name;
    this.todos = todos;
  }

  static fromJSON(obj) {
    return new Project(
      obj.name,
      obj.todos.map((todoObj) => Todo.fromJSON(todoObj)),
      obj.id
    );
  }
}

class Project {
  constructor(name, id = crypto.randomUUID()) {
    this.id = id;
    this.name = name;
  }
}

export { Project };

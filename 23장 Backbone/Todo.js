import { Backbone } from "backbone";

export default class Todo extends Backbone.Model {
  constructor() {
    this.title = "empty todo...";
    this.order = Todos.nextOrder();
    this.done = false;
  }

  toggle() {
    this.save({ done: !this.get("done") });
  }
}

import { Backbone } from "backbone";
import _ from "underscore";

export default class TodoView extends Backbone.View {
  constructor() {
    this.tagName = "li";
    this.template = _.template($("#item-template").html());
    this.events = {
      "click .toggle": "toggleDone",
      "dblclick .view": "edit",
      "click a.destroy": "clear",
      "keypress .edit": "updateOnEnter",
      "blur .edit": "close",
    };

    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass("done", this.model.get("done"));
    this.input = this.$("edit");
    return this;
  }

  toggleDone() {
    this.model.toggle();
  }

  edit() {
    this.$el.addClass("editing");
    this.input.focus();
  }

  close() {
    let value = this.input.val();
    if (!value) {
      this.clear();
    } else {
      this.model.save({ title: value });
      this.$el.removeClass("editing");
    }
  }

  updateOnEnter(e) {
    if (e.keyCode === 13) {
      this.close();
    }
  }

  clear() {
    this.model.destroy();
  }
}

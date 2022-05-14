import { Backbone } from "backbone";
import Todo from './Todo';

export default class TodoList extends Backbone.Collection {
    constructor() {
        this.model = Todo;
        this.localStorage = new Backbone.LocalStorage('todos-backbone');
        this.comparator = 'order';
    }

    done() {
        return this.where({done: true});
    }

    remaining() {
        return this.where(done:false);
    }

    nextOrder() {
        if(!this.length) return 1;
        return this.last().get('order') + 1;
    }
};

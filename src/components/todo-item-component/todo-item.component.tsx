import { Component, Prop, h } from '@stencil/core';
import { Task } from '../../constants/definitions';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item-component.css',
  shadow: true,
})
export class TodoItemComponent {
  @Prop() task: Task;

  @Prop() deleteAction: (task: Task) => void;

  @Prop() toggleAction: (taskId: string) => void;

  render() {
    return (
      <div class="todo-container">
        <button class="todo-remove" onClick={() => this.deleteAction(this.task)}>
          X
        </button>
        <div class={`todo-text ${this.task.completed ? ' completed' : ''}`}>{this.task.text}</div>
        <input type="checkbox" class="todo-check" checked={this.task.completed} onClick={() => this.toggleAction(this.task.id)} />
      </div>
    );
  }
}

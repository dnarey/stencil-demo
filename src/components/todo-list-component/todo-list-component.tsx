import { Component, Element, State, h } from '@stencil/core';
import { Task } from '../../constants/definitions';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list-component.css',
  shadow: true,
})
export class TodoListComponent {
  @Element() el: HTMLElement;

  @State() todos: Task[] = [{ id: Math.random().toString(36).substring(2), text: 'Learn Stencil.JS', completed: true }];

  private addTask(event: Event) {
    event.preventDefault();
    const taskInput = this.el.shadowRoot.querySelector('#newitem') as HTMLInputElement;

    const newTask = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value,
      completed: false,
    };

    this.todos = [...this.todos, newTask];
    taskInput.value = '';
  }

  private deleteTask(task: Task) {
    this.todos = this.todos.filter((t: Task) => t.id !== task.id);
  }

  private toggleStatus(taskId: string) {
    this.todos = this.todos.map((task: Task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
  }

  render() {
    return (
      <div class="container">
        <h1>Task Tracker</h1>
        <div class="form-container">
          <input id="newitem" aria-label="New item" />
          <button class="todo-button" onClick={this.addTask.bind(this)}>
            Add Task
          </button>
        </div>
        <h3>Tasks</h3>
        {this.todos.map(task => (
          <todo-item task={task} deleteAction={this.deleteTask.bind(this)} toggleAction={this.toggleStatus.bind(this)}></todo-item>
        ))}
      </div>
    );
  }
}

import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

export interface Task {
  title: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-todo');

  form: FormGroup;
  tasks: Task[] = [];

  get f() {
    return this.form.controls;
  }

  constructor() {
    this.form = new FormGroup({
      task: new FormControl('', Validators.required),
      description: new FormControl(''),
    });

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  submit() {
    this.tasks.push({
      title: this.f.task.value,
      description: this.f.description.value,
      done: false
    });
    this.updateLocalStorage();
    this.form.reset();
  }

  delete(index: number) {
    this.tasks.splice(index, 1);
    this.updateLocalStorage();
  }

  markDone(index: number) {
    let task = this.tasks[index];
    task.done = !task.done;
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}

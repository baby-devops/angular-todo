import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

export interface Task {
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
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
  searchControl = new FormControl('');
  filterControl = new FormControl('all');

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
      done: false,
      createdAt: new Date().toLocaleString()
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

  get filteredTasks(): Task[] {
    let filtered = this.tasks;

    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
      );
    }

    const filter = this.filterControl.value;
    if (filter === 'done') {
      filtered = filtered.filter(task => task.done);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.done);
    }

    return filtered;
  }

  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}

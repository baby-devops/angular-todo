import {App, Task} from './app';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('AppComponent (Todo List)', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, App]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    // Clear localStorage
    localStorage.clear();

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when task is empty', () => {
    component.form.controls.task.setValue('');
    expect(component.form.invalid).toBeTrue();
  });

  it('should add a task to the list', () => {
    component.form.controls.task.setValue('Test Task');
    component.form.controls.description.setValue('Test Description');
    component.submit();

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Test Task');
    expect(component.tasks[0].description).toBe('Test Description');
    expect(component.tasks[0].done).toBe(false);

    localStorage.clear();
  });

  it('should delete a task from the list', () => {
    component.form.controls.task.setValue('Delete Task');
    component.submit();

    expect(component.tasks.length).toBe(1);

    component.delete(0);
    expect(component.tasks.length).toBe(0);
  });

  it('should mark task as done', () => {
    component.form.controls.task.setValue('Pending Task');
    component.submit();

    expect(component.tasks[0].done).toBe(false);

    component.markDone(0);
    expect(component.tasks[0].done).toBe(true);

    localStorage.clear();
  });

  it('should save tasks to localStorage', () => {
    component.form.controls.task.setValue('Local Storage Task');
    component.submit();

    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    expect(storedTasks.length).toBe(1);
    expect(storedTasks[0].title).toBe('Local Storage Task');

    localStorage.clear();
  });

  it('should load tasks from localStorage', () => {
    component.form.controls.task.setValue('Loaded Task');
    component.form.controls.description.setValue('Test Description');
    component.submit();

    const newFixture = TestBed.createComponent(App);
    const newComponent = fixture.componentInstance;

    expect(newComponent.tasks.length).toBe(1);
    expect(newComponent.tasks[0].title).toBe('Loaded Task');

    localStorage.clear();
  });
})

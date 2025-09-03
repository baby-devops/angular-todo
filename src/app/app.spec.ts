import {App} from './app';
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
    const newComponent = newFixture.componentInstance;

    expect(newComponent.tasks.length).toBe(1);
    expect(newComponent.tasks[0].title).toBe('Loaded Task');

    localStorage.clear();
  });

  it('should filter tasks by search term', () => {
    component.form.controls.task.setValue('First Task');
    component.form.controls.description.setValue('Some description');
    component.submit();

    component.form.controls.task.setValue('Second Task');
    component.form.controls.description.setValue('Another one');
    component.submit();

    // Initially 2 tasks
    expect(component.filteredTasks.length).toBe(2);

    // Search for "First"
    component.searchControl.setValue('First');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('First Task');

    // Search for "second"
    component.searchControl.setValue('second');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Second Task');

    // Search for something that doesn't exist
    component.searchControl.setValue('xyz');
    expect(component.filteredTasks.length).toBe(0);

    localStorage.clear();
  });

  it('should filter tasks by status', () => {
    component.form.controls.task.setValue('Done Task');
    component.submit();

    component.form.controls.task.setValue('Pending Task');
    component.submit();

    // Mark the first one as done
    component.markDone(0);

    // All tasks
    component.filterControl.setValue('all');
    expect(component.filteredTasks.length).toBe(2);

    // Done tasks only
    component.filterControl.setValue('done');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].done).toBe(true);

    // Pending tasks only
    component.filterControl.setValue('pending');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].done).toBe(false);

    localStorage.clear();
  });

  it('should combine search and filter correctly', () => {
    component.form.controls.task.setValue('Finish homework');
    component.submit();

    component.form.controls.task.setValue('Finish project');
    component.submit();

    // Mark first task as done
    component.markDone(0);

    // Apply filter = done + search "homework"
    component.filterControl.setValue('done');
    component.searchControl.setValue('homework');

    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Finish homework');

    // Apply filter = pending + search "project"
    component.filterControl.setValue('pending');
    component.searchControl.setValue('project');

    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Finish project');

    localStorage.clear();
  });

})

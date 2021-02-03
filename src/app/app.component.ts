import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/Models/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public todos: Todo[] = [];
  public mode = 'list';
  public title = "Minhas tarefas";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required])]
    });

    this.load();
    // this.todos.push(new Todo('Passear com o cachorro', false, 1));
    // this.todos.push(new Todo('ir ao supermercado', false, 2));
    // this.todos.push(new Todo('cortar o cabelo', true, 3));
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUnDone(todo: Todo) {
    todo.done = false;
    this.save();
  }
  clear() {
    this.form.reset();
  }

  add() {
    const id = this.todos.length + 1
    const title = this.form.controls['title'].value;
    let novoTodo = new Todo(title, false, id)
    this.mode = 'list';
    this.todos.push(novoTodo);
    this.save();
    this.clear();

  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data.toString());
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data !== null)
      this.todos = JSON.parse(data);
  }

  changeMode(tipo: string) {
    this.mode = tipo;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { List } from './interface.components';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoListComponent implements OnInit {
  todoList: Array<List> = [{id: 1, text: 'task', isDone: true}];
  importData: object;
  config: List;
  configUrl = 'https://jsonplaceholder.typicode.com/posts';
  inputNumber: number;
  inputIsDone: boolean;
  isDisplayAddTask = false;
  isDisplayChangeTask = false;
  addTaskGroup: FormGroup;
  changeTaskGroup: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getData();
    setTimeout(
      () =>
        this.importData.forEach((value, i) =>
          this.todoList.push({
            id: i,
            text: value.title,
            isDone: value.completed,
          })
        ),
      100
    );
    setTimeout(() => this.todoList.splice(10, 190), 100);
  }

  ngOnInit(): void {
    this.addTaskGroup = this.fb.group({
      inputText: ['', Validators.required],
    });

    this.changeTaskGroup = this.fb.group({
      inputText: ['', Validators.required],
    });
  }

  getData(): void {
    this.http
      .get<List>(this.configUrl)
      .subscribe((data: List) => this.importData = data);
  }

  displayAddTask(): void {
    console.log(this.todoList);
    this.isDisplayAddTask = !this.isDisplayAddTask;
    this.isDisplayChangeTask = false;
  }

  displayChangeTask(inputNumber): void {
    this.isDisplayChangeTask = true;
    this.inputNumber = inputNumber;
    this.isDisplayAddTask = false;
    this.changeTaskGroup.setValue({
      inputText: this.todoList[inputNumber].text,
    });
  }

  addTask(): void {
    const inputText = this.addTaskGroup.value.inputText;
    const inputIsDone = false;
    let inputId: number;
    if (this.todoList.length) {
      const lastId = this.todoList[this.todoList.length - 1].id;
      inputId = lastId + 1;
    } else {
      inputId = 0;
    }
    this.todoList.push({ id: inputId, text: inputText, isDone: inputIsDone });
    this.addTaskGroup.setValue({ inputText: '' });
    this.isDisplayAddTask = false;
  }

  changeTextTask(): void {
    const i = this.inputNumber;
    this.todoList[i].text = this.changeTaskGroup.value.inputText;
    this.changeTaskGroup.setValue({ inputText: '' });
    this.isDisplayChangeTask = false;
  }

  changeIsDoneTask(inputNumber): void {
    const currentValue = this.todoList[inputNumber].isDone;
    this.todoList[inputNumber].isDone = !currentValue;
  }

  deleteTask(inputNumber): void {
    this.todoList.splice(inputNumber, 1);
    this.isDisplayAddTask = false;
    this.isDisplayChangeTask = false;
  }
}

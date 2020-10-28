import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListRoutingModule } from './todo.routing.module';
import { TodoListComponent } from './todo.component';
@NgModule({
  declarations: [TodoListComponent],
  imports: [
    TodoListRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodoListModule {}

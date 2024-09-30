import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTaskList } from 'src/app/store/task.selectors';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterLink } from '@angular/router';
import { addTask, updateTaskStatus } from 'src/app/store/task.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, PipesModule, RouterLink, MatButtonModule, MatCardModule, TaskCardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  store = inject(Store);

  tasksList$ = this.store.select(selectTaskList);
  typeFilter: 'ALL' | 'PENDING' | 'DONE' = 'ALL';

  ngOnInit(): void {
    const task = {
      "id": crypto.randomUUID(),
      "name": "nueva tarea",
      "date": "2024-09-19",
      "status": "PENDING",
      "person": [
          {
              "name": "Medina",
              "age": 25,
              "skills": [
                  "Angular",
                  "Typescript"
              ]
          }
      ]
    }
    this.store.dispatch(
      addTask({
        task: task
      })
    )
  }
}

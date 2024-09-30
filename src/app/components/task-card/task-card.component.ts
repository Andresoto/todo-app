import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/interface/task.interface';
import { updateTaskStatus } from 'src/app/store/task.actions';

@Component({
  selector: 'app-task-card',  
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task!: Task;

  store = inject(Store);

  showContent = false;

  updateState(id: string) {
    this.store.dispatch(updateTaskStatus({ id }));
  }
}
